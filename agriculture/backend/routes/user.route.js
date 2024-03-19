const userController = require('../controllers/user.controller')

app.get('/verify-old-user', userController.verifyOldUser)
