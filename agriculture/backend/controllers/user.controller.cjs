require('dotenv').config()
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')
const axios = require('axios')
const OTP = require('../models/OtpModel.cjs')
const { getaddress , contract } = require('../utils/contract.cjs')
const { getIPFSInstance } = require('../utils/ipfsNode.cjs')
const fs = require('fs')
const FormData = require('form-data');

exports.verifyOldUser = async (req, resp) => {
	try {
		const existingUser = await contract.methods.getUser(getaddress()).call();
		if (existingUser && existingUser.email == req.body.email) {
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

exports.sendOtp = async (req, resp) => {
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
}

exports.verifyOtp = async (req, resp) => {
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
}

exports.logout = async (req, resp) => {
	try {
		const tx = await contract.methods.logout(getaddress()).call();
		if (tx) {
			resp.status(201).send({ success: true, message: 'logout successfull' })
		}
		else {
			resp.status(201).send({ success: false, message: 'logout fail' })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
}

exports.forgetpass = async (req, resp) => {
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
}

exports.resetpass = async (req, resp) => {
	const { email, password } = req.body;
	try {
		let hashedPassword = await bcrypt.hash(password, 10);
		const response = await contract.methods.resetPass(hashedPassword);
		if (response) {
			resp.status(201).send({ success: true, message: 'password reset successful' })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
}
exports.registerUser = async (req, resp) => {
	const { email, otp, name, aadhar, pan, dob, gender, password } = JSON.parse(req.body.data);
	try {
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		if (response.length === 0 || response[0].otp !== otp) {
			resp.status(500).send({ success: false, message: 'Invalid Otp' })
		}
		else {
			const formData = new FormData()
			const file = fs.createReadStream(req.file.path);
			formData.append('file', file)
			const res = await axios.post(
				"https://api.pinata.cloud/pinning/pinFileToIPFS",
				formData,
				{
					headers: {
						Authorization: `Bearer ${process.env.JWT}`,
					},
				}
			);
			console.log(res.data.IpfsHash)
			let hashedPassword = await bcrypt.hash(password, 10);
			const tx = await contract.methods.registerUser(name, dob, gender, aadhar, pan, email, hashedPassword, res.data.IpfsHash).send({ from: getaddress() })
			if (tx) {
				resp.status(201).send({ success: true, message: 'registration successful' })
			}
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
	}
}

exports.getUserDetails = async (req, resp) => {
	try {
		const tx = await contract.methods.getUser(getaddress()).call()
		if (tx) {
			console.log(tx)
			resp.status(201).send({ success: true, image: tx.image })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
	}
}
exports.login = async (req, resp) => {
	const { email, password } = req.body
	try {

		const user = await contract.methods.getUser(getaddress()).call()
		if (user) {
			let result = await bcrypt.compare(password, user.password)
			if (result)
				resp.status(200).send({ success: true, message: 'login success' })
			else
				resp.status(400).send({ success: false, message: 'Wrong Password' })
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

exports.logout = async (req, resp) => {
	try {
		const tx = await contract.methods.logout(getaddress()).call();
		if (tx) {
			resp.status(200).send({ success: true, message: 'logout success' })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
	}
}
