const userController = require('../controllers/user.controller.cjs')
const { auth } = require('../middlewares/auth.middleware.cjs')
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../src/assets/images/profile");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage: storage });
const app = require('express').Router()
app.post('/verify-old-user', userController.verifyOldUser)
app.post('/send-otp', userController.sendOtp)
app.post('/verify-otp-fp', userController.verifyOtp)
app.post('/forgot-password', userController.forgetpass)
app.post('/reset-password', userController.resetpass)
app.post('/verify-otp', upload.single('image'), userController.registerUser)
app.post('/get-image', auth, userController.getUserDetails)
app.post('/logout', auth, userController.logout)
app.post('/login', userController.login)
app.get('/get-notification', auth, userController.getNotification);
app.put('/read-notification', auth, userController.readNotification);
app.put('/read-all-notification', auth, userController.readAllNotification);


module.exports = app;