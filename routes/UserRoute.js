const express = require('express')
const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const router = express.Router()

router.get('/', UserController.getUserLogin)
router.get('/all-users', AuthMiddleware.authorize, UserController.getAllUser)
router.put('/', UserController.updateUser)
router.delete('/:id', AuthMiddleware.authorize, UserController.deleteUser)

module.exports = router