const express = require('express')
const ProductController = require('../controllers/ProductController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const router = express.Router()

router.get('/', ProductController.getAllProduct)
router.post('/', AuthMiddleware.authorize, ProductController.addProduct)
router.put('/:id', AuthMiddleware.authorize, ProductController.updateProduct)
router.delete('/:id', AuthMiddleware.authorize, ProductController.deleteProduct)

module.exports = router