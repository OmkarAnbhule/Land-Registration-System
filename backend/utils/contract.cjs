require('dotenv').config()
const { Web3 } = require('web3')
const fs = require('fs');


let contractABI = null;
try {
    const abiFilePath = '../artifacts/contracts/Land.sol/Land.json'
    const abiData = fs.readFileSync(abiFilePath, 'utf8');
    contractABI = JSON.parse(abiData).abi;
} catch (error) {
    console.error('Error reading ABI:', error);
}
var web3Provider = new Web3.providers.HttpProvider(process.env.INFURA_RPC_URL)

const web3 = new Web3(web3Provider)
let contract = new web3.eth.Contract(contractABI, process.env.contractAddr)

module.exports = { contract }