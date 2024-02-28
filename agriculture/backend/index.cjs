var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/LandLedger');
const express = require('express');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')
const EthereumTx = require('ethereumjs-tx').Transaction
require('dotenv').config()
const { Web3 } = require('web3')
const cors = require("cors");
const multer = require('multer')
const app = express();
console.log('app is listening at http://localhost:5000');
const privateKey = Buffer.from(
    '3b9d89272ff2eccf71dcb6e910657d7a195e6b0f0e7d100d8143ef4e7b37dd37',
    'hex',
)
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
                "internalType": "uint256",
                "name": "landprice",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_allLatiLongi",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_propertyPID",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_surveyNum",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_document",
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
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "landPrice",
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
                "internalType": "uint256",
                "name": "landPrice",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "allLatitudeLongitude",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "propertyPID",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "physicalSurveyNumber",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "document",
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
                "name": "",
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

var web3Provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/bc2d37d8466848fba53ebf038cfcaf70")
const web3 = new Web3(web3Provider)
const contract = new web3.eth.Contract(contractABI, '0x767c82F8C041b89476D8c698df39e17C85650cf2')


const User = require('./models/UserModel.cjs')
const OTP = require('./models/OtpModel.cjs')

app.get("/", (req, resp) => {
    resp.send("App is Working");
});

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

app.post('/verify-otp', async (req, resp) => {
    const { email, otp, name, aadhar, pan, dob, gender } = req.body;
    try {
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || response[0].otp !== otp) {
            resp.status(500).send({ success: false, message: 'Invalid Otp' })
        }
        else {
            const tx = await contract.methods.registerUser(name, dob, gender, aadhar, pan, email).send({ from: '0xe7dcD31B2f910fCb689cDac3Fa990666C7B8455E' })
            web3.eth.accounts.signTransaction(tx,'3b9d89272ff2eccf71dcb6e910657d7a195e6b0f0e7d100d8143ef4e7b37dd37')
            resp.status(201).send({ success: true, message: 'registration successful' })
        }
    }
    catch (e) {
        resp.status(500).send({ success: false, message: 'Server Not Responding' })
        console.log(e)
    }
})



app.listen(5000)