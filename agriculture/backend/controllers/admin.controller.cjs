const { getaddress, contract } = require('../utils/contract.cjs')


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