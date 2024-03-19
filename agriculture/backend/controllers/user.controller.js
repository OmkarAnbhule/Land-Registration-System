const User = require('./models/UserModel.cjs')

exports.verifyOldUser = async(req, resp) => {
	const { email } = req.body;
	try {
		const existingUser = await User.find({ email: email })
		if (existingUser) {
			resp.status(201).send({ success: true, message: 'User Found' })
		}
		else {
			resp.status(400).send({ success: false, message: 'User not found' })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
}
