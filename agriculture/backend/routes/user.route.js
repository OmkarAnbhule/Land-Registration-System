const userController = require('../controllers/user.controller')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../src/assets/images/profile");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = guid();
		cb(null, uniqueSuffix + file.originalname)
	}
})

const upload = multer({ storage: storage });

const storageFiles = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../src/assets/lands/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = guid();
		cb(null, uniqueSuffix + file.originalname)
	}
})

const uploadFiles = multer({ storage: storageFiles })


























app.get('/verify-old-user', userController.verifyOldUser)
app.sendadd('/send-address',userController.sendadd)
app.sendOtp('/send-otp',userController.sendOtp)
app.verifyOtp('/verify-otp-fp',userController.verifyOtp)
app.forgetpass('/forgot-password',userController.forgetpass)
app.resetpass('/reset-password',userController.resetpass)
app.vOtp('/verify-otp',upload.single('image'),userController.vOtp)
app.getImage('/get-image',userController.getImage)
app.login('/login',userController.login)
