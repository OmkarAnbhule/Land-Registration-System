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














//admin queries 




app.listen(5000)

