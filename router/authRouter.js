const router = require('express').Router()
const authController = require('../control/authController')
const isUserAuth = require("../util/isUserAuth");

router.post('/login', authController.Login)
router.post("/forgetpassword", authController.resetPassword);
router.post("/passwordreset/:userId/:token", authController.changeForgetPassword);
router.post("/changepassword", isUserAuth, authController.ChangePassword)

module.exports = router;