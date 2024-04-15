require('dotenv').config()
const axios = require('axios')
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')
const fs = require('fs')
const FormData = require('form-data');
const OTP = require('../models/OtpModel.cjs')
const { getaddress, contract } = require('../utils/contract.cjs')

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
					const tx = await contract.methods.finalizeBid(parseInt(ids[i], 10), Math.floor(Date.now() / 1000)).send({ from: getaddress() });
					if (tx) {
						ids.splice(i, 1);
						clearInterval(timeout)
						console.log('transferred')
					}
				}
				catch (e) {
					console.log(e)
					console.log('time_catch')
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
			resp.status(500).send({ success: true })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
}


//admin queries

exports.registerreq = async (req, resp) => {
	try {
		const tx = await contract.methods.getSellRequest().call();
		console.log(tx)
		if (tx) {
			for (var i in tx) {
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
			resp.status(201).send({ success: true, data: tx })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
}
exports.registeraccept = async (req, resp) => {
	const { id, _addr } = req.body;
	try {
		const tx = await contract.methods.acceptReg(_addr, parseInt(id, 10)).send({ from: getaddress() })
		console.log(tx)
		if (tx)
			resp.status(201).send({ success: true })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
}

exports.reject = async (req, resp) => {
	const { id } = req.body;
	try {
		const tx = await contract.methods.rejectReg(parseInt(id, 10)).call()
		if (tx)
			resp.status(201).send({ success: true })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
}
