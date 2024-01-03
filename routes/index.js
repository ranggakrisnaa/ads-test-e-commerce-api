const express = require('express')
const router = express.Router()
const authRoute = require("./AuthRoute")

router.use('/auth', authRoute)

module.exports = router