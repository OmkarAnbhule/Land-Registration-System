require('dotenv').config()
const { Web3 } = require('web3')
const fs = require('fs');


let contractABI = null;
try {
    const abiFilePath = '../artifacts/contracts/Land.sol/Land.json'
    const abiData = fs.readFileSync(abiFilePath, 'utf8');
    contractABI = JSON.parse(abiData).abi;
} catch (error) {
    contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "changeLandSell",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "bidder",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "ownerShipTranfer",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "RegisteredLandCount",
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
            "inputs": [],
            "name": "Registerreqcount",
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
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "Registerrequests",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "landId",
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
                    "internalType": "string",
                    "name": "password",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "image",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "isloggedin",
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
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "acceptReg",
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
                    "name": "_state",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_district",
                    "type": "string"
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
                },
                {
                    "internalType": "uint256",
                    "name": "_landPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "string[]",
                    "name": "_files",
                    "type": "string[]"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "x",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "y",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Land.Coordinates[]",
                    "name": "coordinates",
                    "type": "tuple[]"
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
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                }
            ],
            "name": "changeLandForSell",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "landId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "closingTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                }
            ],
            "name": "createLandBid",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "landId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "finalizeBid",
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
            "name": "getAllLands",
            "outputs": [
                {
                    "components": [
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
                            "name": "state",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "district",
                            "type": "string"
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
                            "internalType": "uint256",
                            "name": "landPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string[]",
                            "name": "files",
                            "type": "string[]"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "x",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "y",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Land.Coordinates[]",
                            "name": "coordinates",
                            "type": "tuple[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
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
                    "internalType": "struct Land.Landreg[]",
                    "name": "",
                    "type": "tuple[]"
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
            "name": "getMyLands",
            "outputs": [
                {
                    "components": [
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
                            "name": "state",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "district",
                            "type": "string"
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
                            "internalType": "uint256",
                            "name": "landPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string[]",
                            "name": "files",
                            "type": "string[]"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "x",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "y",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Land.Coordinates[]",
                            "name": "coordinates",
                            "type": "tuple[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
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
                    "internalType": "struct Land.Landreg[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getSellRequest",
            "outputs": [
                {
                    "components": [
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
                            "name": "state",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "district",
                            "type": "string"
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
                            "internalType": "uint256",
                            "name": "landPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string[]",
                            "name": "files",
                            "type": "string[]"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "x",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "y",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Land.Coordinates[]",
                            "name": "coordinates",
                            "type": "tuple[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
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
                    "internalType": "struct Land.Landreg[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "landId",
                    "type": "uint256"
                }
            ],
            "name": "getTime",
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
            "name": "getUser",
            "outputs": [
                {
                    "components": [
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
                            "internalType": "string",
                            "name": "password",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "image",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "isloggedin",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct Land.User",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "landId",
                    "type": "uint256"
                }
            ],
            "name": "isBid",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
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
                    "name": "_element",
                    "type": "address"
                }
            ],
            "name": "isElementPresent",
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
            "inputs": [],
            "name": "landOnSaleCount",
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
                    "name": "",
                    "type": "address"
                },
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
                    "name": "state",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "district",
                    "type": "string"
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
                    "internalType": "uint256",
                    "name": "landPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
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
                    "internalType": "address",
                    "name": "_addr",
                    "type": "address"
                }
            ],
            "name": "login",
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
            "name": "logout",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "ownerMapping",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "landId",
                    "type": "uint256"
                }
            ],
            "name": "placeBid",
            "outputs": [],
            "stateMutability": "payable",
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
                },
                {
                    "internalType": "string",
                    "name": "_password",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_image",
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
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "rejectReg",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "password",
                    "type": "string"
                }
            ],
            "name": "resetPass",
            "outputs": [],
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
        }
    ]
}

var web3Provider = new Web3.providers.HttpProvider(process.env.INFURA_RPC_URL)

const web3 = new Web3(web3Provider)
let contract = new web3.eth.Contract(contractABI, process.env.contractAddr)

module.exports = { contract }