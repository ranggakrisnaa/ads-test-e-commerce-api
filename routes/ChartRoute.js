const express = require('express')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const ChartController = require('../controllers/ChartController')
const router = express.Router()

router.post('/', ChartController.addChart)
router.get('/', ChartController.getAllChart)
router.put('/:id', ChartController.updateQuantity)
router.delete('/:id', ChartController.deleteChart)

module.exports = router