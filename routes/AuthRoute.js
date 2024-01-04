const express = require('express')
const AuthController = require('../controllers/AuthController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const router = express.Router()

router.post('/login', AuthController.login)
router.use(AuthMiddleware.auth)
router.post('/register', AuthController.register)

module.exports = router