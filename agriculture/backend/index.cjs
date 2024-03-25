require('dotenv').config()
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL).then(() => {
	console.log('Database connected')
});
const express = require('express');
const cors = require('cors')
const app = express();
const fs = require('fs')

app.use(express.json());
app.use(cors());

const userRoute = require('./routes/user.route.cjs')(app)
const landRoute = require('./routes/land.route.cjs')(app)
console.log('app is listening at http://localhost:5000');

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
app.post('/send-address', async (req, resp) => {
	try {
		const { addr } = req.body;
		updateWalletAddress(await addr)
	}
	catch (e) {
		console.log(e);
	}
});

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(5000)