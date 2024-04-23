const { contract, assignAdmin, getAdmin } = require('../utils/contract.cjs')
const notify = require('../models/Notification.model.cjs');

exports.registeraccept = async (req, resp) => {
    const { id, _addr } = req.body;
    try {
        const tx = await contract.methods.acceptReg(_addr, parseInt(id, 10)).send({ from: getAdmin() })
        console.log(tx)
        if (tx) {
            const result = await notify.findOneAndUpdate({ id: _addr }, { $push: { notifications: { messageType: 'my-land-verify', message: `Your Land at ${id} id has been verified`, isRead: false } } });
            resp.status(201).send({ success: true })
        }
    }
    catch (e) {
        console.log(e)
        resp.status(500).send({ success: false, message: 'server not responding' })
    }
}

exports.reject = async (req, resp) => {
    const { id } = req.body;
    try {
        const tx = await contract.methods.rejectReg(parseInt(id, 10)).call()
        if (tx) {
            const result = await notify.findOneAndUpdate({ id: _addr }, { $push: { notifications: { messageType: 'my-land-reject', message: `Your Land at ${id} id has been Rejected`, isRead: false } } });
            resp.status(201).send({ success: true })
        }
    }
    catch (e) {
        resp.status(500).send({ success: false, message: 'server not responding' })
    }
}

exports.dashBoard = async (req, resp) => {
    try {
        const tx = await contract.methods.dashBoardStats().call();
        for (let key in tx) {
            tx[key] = Number(tx[key]);
        }
        console.log(tx)
        resp.status(200).send({ success: true, data: tx });
    }
    catch (e) {
        console.log(e)
        resp.status(500).send({ success: false, message: 'server not responding' });
    }
}

exports.assignAddress = async (req, resp) => {
    try {
        const tx = await contract.methods.isContractOwner(req.body.addr).call();
        if (tx) {
            console.log(tx)
            if (!tx) {
                resp.status(400).send({ success: false })
            }
            else {
                await assignAdmin(req.body.addr)
                resp.status(200).send({ success: true })
            }
        }
    }
    catch (e) {
        console.log(e)
        resp.status(500).send({ success: false, message: 'server not responding' });
    }
}

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