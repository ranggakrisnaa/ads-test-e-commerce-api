const express = require('express')
const AuthController = require('../controllers/AuthController')
const OrderController = require('../controllers/OrderController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const router = express.Router()

router.post('/', OrderController.addOrder)
router.get('/', AuthMiddleware.authorize, OrderController.getAllOrder)
router.put('/:id', AuthMiddleware.authorize, OrderController.updateStatusOrder)
router.delete('/:id', AuthMiddleware.authorize, OrderController.deleteOrder)

module.exports = router