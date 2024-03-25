const userController = require('../controllers/user.controller.cjs')
const multer = require('multer');
const upload = multer();
module.exports = (app) => {
	app.get('/verify-old-user', userController.verifyOldUser)
	app.post('/send-otp', userController.sendOtp)
	app.post('/verify-otp-fp', userController.verifyOtp)
	app.post('/forgot-password', userController.forgetpass)
	app.post('/reset-password', userController.resetpass)
	app.post('/verify-otp', upload.single('image'), userController.registerUser)
	app.post('/get-image', userController.getUser)
	app.post('/login', userController.login)
}
