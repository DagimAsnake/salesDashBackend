const router = require('express').Router()
const authController = require('../control/authController')

router.post('/login', authController.Login)

module.exports = router;