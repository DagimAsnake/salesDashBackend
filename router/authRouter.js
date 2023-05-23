const router = require('express').Router()
const authController = require('../control/authController')

router.post('/login', authController.Login)
router.post("/forgetpassword", authController.resetPassword);
router.post("/passwordreset/:userId/:token", authController.changeForgetPassword);

module.exports = router;