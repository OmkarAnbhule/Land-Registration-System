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
const fs = require('fs')
const app = express();
console.log('app is listening at http://localhost:5000');

function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(32).substring(1);
}

function readContractAddress() {
	const configFilePath = 'C:/Users/ASUS/OneDrive/Desktop/Land-Registration-System-1/agriculture/backend/config.json'
	try {
		const configData = fs.readFileSync(configFilePath);
		const { contractAddress } = JSON.parse(configData);
		return contractAddress;
	} catch (error) {
		console.error('Error reading contract address:', error);
		return null;
	}
}
function readWalletAddress() {
	const configFilePath = 'C:/Users/ASUS/OneDrive/Desktop/Land-Registration-System-1/agriculture/backend/config.json'
	try {
		const configData = fs.readFileSync(configFilePath);
		const { walletAddress } = JSON.parse(configData);
		return walletAddress;
	} catch (error) {
		console.error('Error reading contract address:', error);
		return null;
	}
}
function updateWalletAddress(newAddress) {
	const configFilePath = 'C:/Users/ASUS/OneDrive/Desktop/Land-Registration-System-1/agriculture/backend/config.json'
	try {
		const configData = fs.readFileSync(configFilePath);
		const config = JSON.parse(configData);
		config.walletAddress = newAddress;
		fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
		console.log('Wallet address updated successfully.');
	} catch (error) {
		console.error('Error updating contract address:', error);
	}
}

const createNode = async () => {
	const { createHelia } = await import('helia')
	const { unixfs } = await import('@helia/unixfs')
	const helia = await createHelia();
	const fs = unixfs(helia)
	return fs;
}

const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4());
let contractABI = null

try {
	const abiFilePath = 'C:/Users/ASUS/OneDrive/Desktop/Land-Registration-System-1/agriculture/artifacts/contracts/Land.sol/Land.json'
	const abiData = fs.readFileSync(abiFilePath, 'utf8');
	contractABI = JSON.parse(abiData).abi;
} catch (error) {
	console.error('Error reading ABI:', error);
}
app.use(express.json());
app.use(cors());

// blockchain credentials
var web3Provider = new Web3.providers.HttpProvider(process.env.HARDHAT_RPC_URL)
const web3 = new Web3(web3Provider)
// const contractAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
let contractAddr = readContractAddress()
let walletaddr = readWalletAddress()
let contract = new web3.eth.Contract(contractABI, contractAddr)
// const walletaddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

const User = require('./models/UserModel.cjs')
const OTP = require('./models/OtpModel.cjs')
const land = require('./models/LandModel.cjs');



app.get("/", (req, resp) => {
	resp.send("App is Working");
});

app.post('/send-address', async (req, resp) => {
	const { addr } = req.body;
	console.log(addr)
	updateWalletAddress(await addr)
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

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../src/assets/images/profile");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = guid();
		cb(null, uniqueSuffix + file.originalname)
	}
})

const upload = multer({ storage: storage });

app.post('/verify-otp', upload.single('image'), async (req, resp) => {
	const { email, otp, name, aadhar, pan, dob, gender, password } = JSON.parse(req.body.data);
	try {
		const image = req.file;
		const heliaFs = await createNode()
		const cid = await heliaFs.addFile(req.file)
		let hashedPassword = await bcrypt.hash(password, 10);
		const tx = await contract.methods.registerUser(name, dob, gender, aadhar, pan, email , hashedPassword , image).send({ from: walletaddr })
		if (tx) {
			resp.status(201).send({ success: true, message: 'registration successful' })
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'Server Not Responding' })
		console.log(e)
	}
})

app.post('/get-image', async (req, resp) => {
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

app.post('/login', async (req, resp) => {
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

app.post('/get-land', async (req, resp) => {
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

app.post('/get-land-all', async (req, resp) => {
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

app.post('/sell-land', async (req, resp) => {
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

app.post('/buy-land', async (req, resp) => {
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

app.post('/logout', async (req, resp) => {
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

app.post('/buy-req', async (req, resp) => {
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


app.post('/register-req', async (req, resp) => {
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

app.post('/register-accept', async (req, resp) => {
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

app.post('/buyer-accept', async (req, resp) => {
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

app.post('/register-reject', async (req, resp) => {
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

app.post('/buyer-reject', async (req, resp) => {
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

app.listen(5000)

