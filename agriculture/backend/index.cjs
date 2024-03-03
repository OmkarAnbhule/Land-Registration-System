require('dotenv').config()
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL).then(() => {
	console.log('Database connected')
});
const express = require('express');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')
const { Web3 } = require('web3')
const cors = require("cors");
const multer = require('multer')
const app = express();
console.log('app is listening at http://localhost:5000');

function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(32).substring(1);
}
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4());

const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "InspectorMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "designation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "LandRequestMapping",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reqId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "sellerId",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "buyerId",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "landId",
				"type": "uint256"
			},
			{
				"internalType": "enum landledger.reqStatus",
				"name": "requestStatus",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isPaymentDone",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ReturnAllLandIncpectorList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ReturnAllLandList",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ReturnAllUserList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "UserMapping",
		"outputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "aadharNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "panNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isUserVerified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requestId",
				"type": "uint256"
			}
		],
		"name": "acceptRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_area",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_address",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_propertyPID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_surveyNum",
				"type": "string"
			}
		],
		"name": "addLand",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_designation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			}
		],
		"name": "addLandInspector",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "changeContractOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "documentId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "isContractOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "isLandInspector",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "isLandVerified",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "isUserRegistered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			}
		],
		"name": "isUserVerified",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lands",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "area",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "landAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "propertyPID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "surveyNum",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isforSell",
				"type": "bool"
			},
			{
				"internalType": "address payable",
				"name": "ownerAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isLandVerified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "landsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "makeItforSell",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requestId",
				"type": "uint256"
			}
		],
		"name": "makePayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_reveiver",
				"type": "address"
			}
		],
		"name": "makePaymentTestFun",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "id",
				"type": "address"
			}
		],
		"name": "myAllLands",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myReceivedLandRequests",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mySentLandRequests",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_aadharNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_panNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requestId",
				"type": "uint256"
			}
		],
		"name": "rejectRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "removeLandInspector",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "requesteStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_landId",
				"type": "uint256"
			}
		],
		"name": "requestforBuy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnPaymentDoneList",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_requestId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "documentUrl",
				"type": "string"
			}
		],
		"name": "transferOwnership",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "verifyLand",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userId",
				"type": "address"
			}
		],
		"name": "verifyUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

app.use(express.json());
app.use(cors());

// blockchain credentials
var web3Provider = new Web3.providers.HttpProvider(process.env.HARDHAT_RPC_URL)
const web3 = new Web3(web3Provider)
// const contractAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
let contractAddr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
const contract = new web3.eth.Contract(contractABI, contractAddr)
// const walletaddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
let walletaddr = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"

const User = require('./models/UserModel.cjs')
const OTP = require('./models/OtpModel.cjs')
const land = require('./models/LandModel.cjs')

app.get("/", (req, resp) => {
	resp.send("App is Working");
});

app.post('/send-address', async (req, resp) => {
	const { addr } = req.body;
	//walletaddr = await addr;
	//contractAddr = await addr;
})

app.get('/verify-old-user', async (req, resp) => {
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
})

app.post('/send-otp', async (req, resp) => {
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

app.post('/forgot-password', async (req, resp) => {
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

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../src/assets/images/profile");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = guid();
		cb(null, uniqueSuffix + file.originalname)
	}
})

app.post('/verify-otp-fp', async (req, resp) => {
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

app.post('/reset-password', async (req, resp) => {
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

const upload = multer({ storage: storage })

app.post('/verify-otp', upload.single('image'), async (req, resp) => {
	const { email, otp, name, aadhar, pan, dob, gender, password } = JSON.parse(req.body.data);
	const imageName = req.file.filename
	try {
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		if (response.length === 0 || response[0].otp !== otp) {
			resp.status(500).send({ success: false, message: 'Invalid Otp' })
		}
		else {
			let hashedPassword = await bcrypt.hash(password, 10);
			const tx = await contract.methods.registerUser(name, dob, gender, aadhar, pan, email).send({ from: walletaddr })
			const user = await User.create({ email, name, password: hashedPassword, image: imageName, dateOfBirth: dob, aadharNo: aadhar, panNo: pan, gender, isLoggedin: true })

			resp.status(201).send({ success: true, message: 'registration successful' })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})

app.post('/get-image', async (req, resp) => {
	const { email } = req.body;
	try {
		const res = await User.find({ email })
		console.log(res)
		if (res)
			resp.status(200).send({ success: true, name: res[0].name, image: res[0].image })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})

app.post('/login', async (req, resp) => {
	const { email, password } = req.body
	try {
		const existingUser = await User.find({ email: email })
		const tx = await contract.methods.isUserRegistered(walletaddr).send({ from: walletaddr })
		if (existingUser && tx) {
			let result = await bcrypt.compare(password, existingUser[0].password);
			if (result) {
				const response = await User.findOneAndUpdate({ email }, { isLoggedin: true })
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

const storageFiles = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../src/assets/lands/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = guid();
		cb(null, uniqueSuffix + file.originalname)
	}
})

const uploadFiles = multer({ storage: storageFiles })

app.post('/add-land', uploadFiles.array('files'), async (req, resp) => {
	const { area, state, district, email, propertyid, survey, price } = JSON.parse(req.body.data)
	const files = req.files.map((item, index) => ({
		filename: item.filename,
		filetype: item.filetype,
		mimetype: item.mimetype,
		size: item.size,
	}))
	console.log(files, req.files)
	try {
		const address = state + ' , ' + district
		const tx = await contract.methods.addLand(parseInt(area, 10), address, propertyid, survey, parseInt(price, 10)).send({ from: walletaddr })
		if (tx) {
			const response = await land.create({ owner: email, state, price, district, propertyid, survey, area, files, isSell: false, isVerified: false })
			if (response) { resp.status(200).send({ success: true, message: 'land registered' }) }
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
	}


})

app.post('/get-land', async (req, resp) => {
	const { email } = req.body;
	let response = await land.find({ owner: email })
	console.log(response)
	if (response.length != 0) {
		resp.status(200).send({ success: true, data: response })
	}
})

app.post('/get-land-all', async (req, resp) => {
	const { email } = req.body;
	try {
		let response = await land.find({ owner: { $ne: email }, isSell: true, isVerified: true })
		console.log(response)
		if (response.length != 0) {
			resp.status(200).send({ success: true, data: response })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})

app.post('/sell-land', async (req, resp) => {
	const { objId } = req.body;
	try {
		const response = await land.findByIdAndUpdate(objId, { isSell: true })
		if (response) {
			resp.status(201).send({ success: true, message: 'land selled' })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})

app.post('/buy-land', async (req, resp) => {
	const { objId, owner } = req.body;
	try {
		const response = await land.findByIdAndUpdate(objId, { $push: { buyers: owner } })
		console.log(response)
		if (response) {
			resp.status(201).send({ success: true, message: 'land purchased' })
		}
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})

app.post('/logout', async (req, resp) => {
	const { email } = req.body;
	try {
		const response = await User.findOneAndUpdate({ email }, { isLoggedin: false })
		resp.status(201).send({ success: true, message: 'logged out successfully' })
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})

//admin queries 

app.post('/buy-req', async (req, resp) => {
	try {
		const response = await land.find({ isSell: true, isVerified: true, buyers: { $exists: true } })
		resp.status(201).send({ success: true, data: response })
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})


app.post('/register-req', async (req, resp) => {
	try {
		const response = await land.find({ isVerified: false })
		resp.status(201).send({ success: true, data: response })
	}
	catch (e) {
		console.log(e)
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})

app.post('/register-accept', async (req, resp) => {
	const { id } = req.body;
	try {
		const response = await land.findByIdAndUpdate(id, { isVerified: true });
		resp.status(201).send({ success: true })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}

})

app.post('/buyer-accept', async (req, resp) => {
	const { objId, owner } = req.body;
	try {
		const Land = await land.findById(objId);
		const response = await land.findByIdAndUpdate(objId, { owner, isSell: false, $push: { pastOwners: Land.owner } })
		if (response) {
			resp.status(201).send({ success: true })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}

})

app.post('/register-reject', async (req, resp) => {
	const { id } = req.body;
	try {
		const response = await land.findByIdAndUpdate(id, { isRejected: false });
		resp.status(201).send({ success: true })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})

app.post('/buyer-reject', async (req, resp) => {
	const { id } = req.body;
	try {
		const response = await land.findByIdAndUpdate(id, { isRejected: false });
		resp.status(201).send({ success: true })
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'server not responding' })
	}
})


app.listen(5000)