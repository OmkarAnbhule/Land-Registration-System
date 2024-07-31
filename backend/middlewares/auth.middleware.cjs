const { contract } = require('../utils/contract.cjs')

exports.auth = async (req, resp, next) => {
    try {
        if (req.headers["authorization"].replace('Bearer ', '')) {
            const address = req.headers["Authorization"].replace('Bearer ', '');
            const user = await contract.methods.getUser(address).call();
            if (user && user.isloggedin) {
                req.user = user;
                next();
            }
            else {
                return resp.status(400).send({ success: false, message: "Middleware error: User not found or not logged in" });
            }
        }
        else {
            return resp.status(400).send({ success: false, message: 'Middleware error: Address not found' });
        }
    }
    catch (e) {
        return resp.status(500).send({ success: false, message: 'Middleware error:' + e });
    }
}