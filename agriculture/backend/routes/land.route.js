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

app.addLand('/add-land',uploadFiles.array('files'),userController,addLand)
app.getland('/get-land',userController,getland)
app.getAllLands('/get-land-all',userController,getAllLands)
app.sellland('/sell-land',userController,sellland)
app.buyland('/buy-land',userController,buyland)
app.logout('/logout',userController.logout)
app.buyReq('/buy-req',userController.buyReq)
app.registerreq('/register-req',userController,registerreq)
app.registeraccept('/register-accept',userController.registeraccept)
app.buyaccept('/buyer-accept',userController.buyaccept)
app.reject('/register-reject',userController.reject)
app.buyerrej('/buyer-reject',userController.buyerrej)