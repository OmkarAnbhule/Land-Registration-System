const landController = require('../controllers/land.controller.cjs')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../src/assets/images/lands");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploadFiles = multer({ storage: storage })
const app = require('express').Router()


app.post('/add-land', uploadFiles.array('files'), landController.addLand)
app.post('/get-land', landController.getland)
app.post('/get-land-all', landController.getAllLands)
app.post('/sell-land', landController.sellland)
app.post('/place-bid', landController.placeBid)

module.exports = app;