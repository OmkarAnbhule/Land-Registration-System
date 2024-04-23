require('dotenv').config()
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data');
const { getaddress, contract, getAdmin } = require('../utils/contract.cjs')
const notify = require('../models/Notification.model.cjs');

const uploadFile = async (val) => {
	const formData = new FormData()
	const file = fs.createReadStream(val)
	formData.append('file', file);
	const res = await axios.post(
		"https://api.pinata.cloud/pinning/pinFileToIPFS",
		formData,
		{
			headers: {
				Authorization: `Bearer ${process.env.JWT}`,
			},
		}
	);
	return res.data.IpfsHash;
}
const ids = [];
exports.addLand = async (req, resp) => {
	const { area, state, district, propertyid, survey, price, address } = JSON.parse(req.body.data)
	try {
		const files = [];
		for (const item of req.files) {
			files.push(await uploadFile(item.path))
		}
		const tx = await contract.methods.addLand(parseInt(area, 10), state, district, address, propertyid, survey, parseInt(price, 10), files).send({ from: await getaddress() })
		if (tx) {
			resp.status(200).send({ success: true, message: 'land registered' })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
	}
}
exports.getland = async (req, resp) => {
	try {
		const tx = await contract.methods.getMyLands(await getaddress()).call()
		if (tx) {
			for (let i of tx) {
				for (key in i) {
					try {
						if (BigInt(i[key]) === i[key]) {
							i[key] = Number(i[key])
						}
					}
					catch (e) {
					}
				}
				if (i.isforSell) {
					const tx2 = await contract.methods.getTime(i.id).call();
					if (tx2) {
						Object.assign(i, { 'maxTime': Number(tx2) });
					}
				}
			}
			resp.status(200).send({ success: true, data: tx })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
}
exports.getAllLands = async (req, resp) => {
	const tx = await contract.methods.getAllLands(await getaddress()).call()
	if (tx) {
		for (var i in tx) {
			const tx1 = await contract.methods.isBid(parseInt(tx[i].id, 10)).call();
			console.log(tx1, tx1[0], tx1[1])
			if (tx1[0]) {
				tx[i].isBid = true;
				tx[i].amount = Number(tx1[1])
			}
			else {
				tx[i].isBid = false;
			}
			const tx2 = await contract.methods.getTime(tx[i].id).call();
			if (tx2) {
				Object.assign(tx[i], { 'maxTime': Number(tx2) });
			}
			for (let key in tx[i]) {
				try {
					if (BigInt(tx[i][key]) === tx[i][key]) {
						tx[i][key] = Number(tx[i][key])
					}
				}
				catch (e) {
				}
			}
		}
		resp.status(200).send({ success: true, data: tx })
	}
}

exports.getTime = async (req, resp) => {
	try {
		const { id } = req.body;
		const tx = await contract.methods.getTIme(id).call();
		if (tx) {
			resp.status(201).send({ success: true, time: tx });
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
}

const timer = () => {
	const timeout = setInterval(async () => {
		if (ids.length > 0) {
			for (let i = 0; i < ids.length; i++) {
				try {
					let flag = false;
					let bidder = null;
					let amount = 0;
					let owner = null;
					const tx = await contract.methods.finalizeBid(parseInt(ids[i], 10), Math.floor(Date.now() / 1000)).send({ from: getAdmin() })
						.on('receipt', function (receipt) {
							console.log('Transaction Receipt:', receipt);
							contract.events.ownerShipTranfer()
								.on('data', function (event) {
									console.log('Returned Value:', event.returnValues.bidder);
									console.log('Returned Value:', event.returnValues.owner);
									bidder = event.returnValues.bidder;
									owner = event.returnValues.owner;
									amount = Number(event.returnValues.amount);
								})
								.on('error', console.error);
							contract.events.changeLandSell()
								.on('data', function (event) {
									flag = true;
									console.log('Returned Value:', event.returnValues.owner);
									owner = event.returnValues.owner;
								})
								.on('error', console.error);
						})
					if (tx) {
						if (flag) {
							const result = await notify.findOneAndUpdate({ id: owner }, { $push: { notifications: { messageType: 'my-land-no-bid', message: `Your Land at ${ids[i]} has returned to you. As no bid was placed`, isRead: false } } })
						}
						else {
							const result = await notify.findOneAndUpdate({ id: owner }, { $push: { notifications: { messageType: 'my-land-transfer', message: `Your Land at ${ids[i]} has been buyed at ${amount} `, isRead: false } } })
							const result1 = await notify.findOneAndUpdate({ id: bidder }, { $push: { notifications: { messageType: 'my-land-transfer', message: `Your have won bid at ${amount} for land at ${ids[i]} id`, isRead: false } } })
						}
						ids.splice(i, 1);
						if (ids.length <= 0) {
							clearInterval(timeout);
						}
					}
				}
				catch (e) {
				}
			}
		}
	}, 2000);
}
timer()
exports.sellland = async (req, resp) => {
	const { objId, amt, addr, closingTime } = req.body;
	try {
		const tx = await contract.methods.createLandBid(parseInt(objId, 10), parseInt(closingTime, 10), parseInt(amt, 10), addr).send({ from: getaddress() })
		if (tx) {
			const result = await notify.findOneAndUpdate({ id: { $ne: addr } }, { $push: { notifications: { messageType: 'buy-land', message: `A new Land has been on Sell. Click to be the first Bidder`, isRead: false } } })
			resp.status(201).send({ success: true, message: 'land selled' })
			ids.push(objId)
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
}

exports.placeBid = async (req, resp) => {
	const { id, bid } = req.body;
	try {
		const tx = await contract.methods.placeBid(parseInt(id, 10)).send({ from: getaddress(), value: bid })
		if (tx) {
			resp.status(201).send({ success: true })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
}