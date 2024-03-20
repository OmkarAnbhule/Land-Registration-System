const User = require('./models/UserModel.cjs')

exports.sendadd('/send-address', async (req, resp) => {
	const { addr } = req.body;
	console.log(addr)
	updateWalletAddress(await addr)
})

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
const OTP = require('./models/OtpModel.cjs')


exports.sendOtp('/send-otp', async (req, resp) => {
	const { email } = req.body;
	let otp = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	});
	try {
		let result = await OTP.findOne({ otp: otp });
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
			result = await OTP.findOne({ otp: otp });
		}
		const otpBody = await OTP.create({ email, otp });
		resp.status(201).send({ success: true, message: 'Otp sent' })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})

exports.verifyOtp('/verify-otp-fp', async (req, resp) => {
	const { email, otp } = req.body;
	try {
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		if (response.length === 0 || response[0].otp !== otp) {
			resp.status(500).send({ success: false, message: 'Invalid Otp' })
		}
		else {
			resp.status(201).send({ success: true, message: 'otp successful' })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})

exports.forgetpass('/forgot-password', async (req, resp) => {
	const { email } = req.body;
	const existingUser = await User.find({ email })
	if (existingUser) {
		let otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		try {
			let result = await OTP.findOne({ otp: otp });
			while (result) {
				otp = otpGenerator.generate(6, {
					upperCaseAlphabets: false,
				});
				result = await OTP.findOne({ otp: otp });
			}
			const otpBody = await OTP.create({ email, otp });
			resp.status(201).send({ success: true, message: 'Otp sent' })
		}
		catch (e) {
			resp.status(500).send({ success: false, message: 'Server Not Responding' })
			console.log(e)
		}
	}
})

exports.resetpass('/reset-password', async (req, resp) => {
	const { email, password } = req.body;
	try {
		let hashedPassword = await bcrypt.hash(password, 10);
		const response = await User.findOneAndUpdate({ email }, { password: hashedPassword })
		if (response) {
			resp.status(201).send({ success: true, message: 'password reset successful' })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})
exports.vOtp('/verify-otp', upload.single('image'), async (req, resp) => {
	const { email, otp, name, aadhar, pan, dob, gender, password } = JSON.parse(req.body.data);
	try {
		const heliaFs = await createNode()
		const response = await User.findOneAndUpdate({ email }, { password: hashedPassword })
		if (response) {
			resp.status(201).send({ success: true, message: 'password reset successful' })
		}
		else {
			const cid = await heliaFs.addFile(req.file)
			let hashedPassword = await bcrypt.hash(password, 10);
			const tx = await contract.methods.registerUser(name, dob, gender, aadhar, pan, email).send({ from: walletaddr })
			const user = await User.create({ email, name, password: hashedPassword, image: cid, dateOfBirth: dob, aadharNo: aadhar, panNo: pan, gender, isLoggedin: true })
			if (user) {
				resp.status(201).send({ success: true, message: 'registration successful' })
			}
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})

exports.getImage('/get-image', async (req, resp) => {
	try {
		const tx = await contract.methods.getImage(walletaddr).call()
		if (tx) {
			console.log(tx)
			resp.status(201).send({ success: true, image: tx })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})
exports.login('/login', async (req, resp) => {
	const { email, password } = req.body
	try {
		const tx = await contract.methods.isUserRegistered(walletaddr).call()
		if (tx) {
			const user = await contract.methods.getUser(walletaddr).call()
			if (user) {
				let result = await bcrypt.compare(password, user.password)
				if (result)
					resp.status(200).send({ success: true, message: 'login success' })
			}
			else {
				resp.status(500).send({ success: false, message: 'Wrong Password' })
			}
		}
		else {
			resp.status(500).send({ success: false, message: 'User not found' })
		}

	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})
exports.addLand('/add-land', uploadFiles.array('files'), async (req, resp) => {
	const { area, state, district, email, propertyid, survey, price } = JSON.parse(req.body.data)
	const files = req.files.map((item, index) => (
		item.filename
	))
	console.log(files, req.files)
	try {
		const address = state + ' , ' + district
		const tx = await contract.methods.addLand(parseInt(area, 10), address, propertyid, survey, parseInt(price, 10), files, Date.now().toString()).send({ from: walletaddr })
		if (tx) {
			resp.status(200).send({ success: true, message: 'land registered' })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
	}


})
exports.getland('/get-land', async (req, resp) => {
	const tx = await contract.methods.getMyLands(walletaddr).call()
	if (tx) {
		console.log(tx)
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
		}
		resp.status(200).send({ success: true, data: tx })
	}
})
exports.getAllLands('/get-land-all', async (req, resp) => {
	const tx = await contract.methods.getAllLands(walletaddr).call()
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
})
exports.sellland('/sell-land', async (req, resp) => {
	const { objId } = req.body;
	try {
		const tx = await contract.methods.sellReq(walletaddr, parseInt(objId, 10)).send({ from: walletaddr })
		if (tx) {
			resp.status(201).send({ success: true, message: 'land selled' })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})
exports.buyland('/buy-land', async (req, resp) => {
	const { owner } = req.body;
	try {
		const tx = await contract.methods.buyReq(walletaddr, owner).send({ from: walletaddr })
		if (tx) {
			resp.status(201).send({ success: true, message: 'land purchased' })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})
exports.logout('/logout', async (req, resp) => {
	try {
		const tx = await contract.methods.logout(walletaddr).call();
		resp.status(201).send({ success: true, message: 'logged out successfully' })
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})

//admin queries
exports.buyReq('/buy-req', async (req, resp) => {
	try {
		const tx = await contract.methods.getBuyRequest().call()
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
})
exports.registerreq('/register-req', async (req, resp) => {
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
})
exports.registeraccept('/register-accept', async (req, resp) => {
	const { id } = req.body;
	try {
		const tx = await contract.methods.acceptReg(walletaddr, parseInt(id, 10)).send({ from: walletaddr })
		if (tx)
			resp.status(201).send({ success: true })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})
exports.buyaccept('/buyer-accept', async (req, resp) => {
	const { objId, owner } = req.body;
	try {
		const tx = await contract.methods.acceptBuy(walletaddr, owner, parseInt(objId, 10)).call()
		if (response) {
			resp.status(201).send({ success: true })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}

})

exports.reject('/register-reject', async (req, resp) => {
	const { id } = req.body;
	try {
		const tx = await contract.methods.rejectReg(parseInt(id, 10)).call()
		if (tx)
			resp.status(201).send({ success: true })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})
exports.buyerrej('/buyer-reject', async (req, resp) => {
	const { id } = req.body;
	try {
		const tx = await contract.methods.rejectBuy(parseInt(id, 10)).call()
		if (tx)
			resp.status(201).send({ success: true })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})