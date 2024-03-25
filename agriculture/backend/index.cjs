require('dotenv').config()
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL).then(() => {
	console.log('Database connected')
});
const { walletAddress, contract } = require('./utils/contract.cjs')
const express = require('express');
const cors = require('cors')
const app = express();
const fs = require('fs')
app.use(express.json());
app.use(cors());


app.listen(5000, () => {
	console.log('app is listening at http://localhost:5000');
})

function updateWalletAddress(newAddress) {
	const configFilePath = '../backend/config.json'
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
app.post('/sendaddress', async (req, resp) => {
	try {
		const { addr } = req.body;
		if(walletAddress == undefined)
		updateWalletAddress(await addr)
	}
	catch (e) {
		console.log(e);
	}
});

app.get('/', (req, res) => {
	res.send('Hello World!')
})
app.use('/', require('./routes/user.route.cjs'))
app.use('/', require('./routes/land.route.cjs'))

