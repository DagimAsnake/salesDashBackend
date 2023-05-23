const router = require("express").Router()
const userController = require("../control/userController")
const isUserAuth = require("../util/isUserAuth");

router.get("/profile", isUserAuth, userController.viewProfile)
router.put("/edit", isUserAuth, userController.EditUserProfile);

module.exports = router;