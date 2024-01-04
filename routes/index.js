const express = require('express')
const router = express.Router()
const authRoute = require("./AuthRoute")
const userRoute = require("./UserRoute")
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.use('/auth', authRoute)
router.use(AuthMiddleware.authenticate)
router.use('/user', userRoute)

module.exports = router