const adminController = require('../controllers/admin.controller.cjs')
const app = require('express').Router();

app.post('/register-accept', adminController.registeraccept)
app.post('/register-reject', adminController.reject)
app.post('/dashboard-stats', adminController.dashBoard);
app.post('/assignAddress', adminController.assignAddress);


module.exports = app;