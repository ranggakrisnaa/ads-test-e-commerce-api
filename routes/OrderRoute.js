const express = require('express')
const AuthController = require('../controllers/AuthController')
const OrderController = require('../controllers/OrderController')
const router = express.Router()

router.post('/', OrderController.addOrder)
router.get('/', OrderController.getAllOrder)
router.put('/:id', OrderController.updateStatusOrder)
router.delete('/:id', OrderController.deleteOrder)

module.exports = router