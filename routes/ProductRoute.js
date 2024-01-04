const express = require('express')
const ProductController = require('../controllers/ProductController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const UploadMiddleware = require('../middlewares/UploadMiddleware')
const router = express.Router()

router.get('/', ProductController.getAllProduct)
router.post('/', AuthMiddleware.authorize, UploadMiddleware.initializeUpload().single("image_file"), ProductController.addProduct)
router.put('/:id', AuthMiddleware.authorize, UploadMiddleware.initializeUpload().single("image_file"), ProductController.updateProduct)
router.delete('/:id', AuthMiddleware.authorize, ProductController.deleteProduct)

module.exports = router