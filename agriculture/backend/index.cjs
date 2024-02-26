var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/LandLedger');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require("cors");
const multer = require('multer')
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("App is Working");
});




app.listen(5000)