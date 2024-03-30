const landController = require('../controllers/land.controller.cjs')
const multer = require('multer');
const uploadFiles = multer()
const app = require('express').Router()


app.post('/add-land', uploadFiles.array('files'), landController.addLand)
app.post('/get-land', landController.getland)
app.post('/get-land-all', landController.getAllLands)
app.post('/sell-land', landController.sellland)
app.post('/buy-land', landController.buyland)
app.post('/buy-req', landController.buyReq)
app.post('/register-req', landController.registerreq)
app.post('/register-accept', landController.registeraccept)
app.post('/buyer-accept', landController.buyaccept)
app.post('/register-reject', landController.reject)
app.post('/buyer-reject', landController.buyerrej)

module.exports = app;