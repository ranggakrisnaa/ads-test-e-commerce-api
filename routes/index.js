const express = require('express')
const router = express.Router()
const authRoute = require("./AuthRoute")
const userRoute = require("./UserRoute")
const productRoute = require("./ProductRoute")
const chartRoute = require("./ChartRoute")
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.use('/auth', authRoute)
router.use(AuthMiddleware.authenticate)
router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/charts', chartRoute)

module.exports = router