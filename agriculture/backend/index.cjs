var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/LandLedger');
const express = require('express');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator')
const cors = require("cors");
const multer = require('multer')
const app = express();
console.log('app is listening at http://localhost:5000');

app.use(express.json());
app.use(cors());

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




app.listen(5000)