require('dotenv').config()
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL).then(() => {
	console.log('Database connected')
});
const { contract, getaddress, assignWallet } = require('./utils/contract.cjs')
const express = require('express');
const cors = require('cors')
const app = express();
const fs = require('fs')
app.use(express.json());
app.use(cors());


app.listen(5000, () => {
	console.log('app is listening at http://localhost:5000');
})

app.post('/send-address', async (req, resp) => {
	try {
		const { addr } = req.body;
		if (await assignWallet(addr)) {
			const tx = await contract.methods.getUser(addr).call();
			if (tx && tx.id != addr) {
				resp.status(201).send({ success: true, message: 'address set successfully' });
			}
			else {
				resp.status(400).send({ success: false, message: 'address already used' });
			}
		}
	}
	catch (e) {
		resp.status(500).send({ success: false, message: 'internal server error' });
	}
});

app.post('/check-login', async (req, resp) => {
	if (getaddress() != '') {
		try {
			const tx = await contract.methods.getUser(getaddress()).call();
			console.log(tx)
			if (tx && tx.isloggedin) {
				resp.status(200).send({ success: true, messsage: "successful" })
			}
			else {
				resp.status(400).send({ success: false, message: 'not logged in' })
			}
		}
		catch (e) {
			resp.status(500).send({ success: false, message: "internal server error" })
		}
	}
})

app.get('/', (req, res) => {
	res.send('Hello World!')
})
app.use('/', require('./routes/user.route.cjs'))
app.use('/', require('./routes/land.route.cjs'))
app.use('/', require('./routes/admin.route.cjs'))

