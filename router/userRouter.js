const router = require("express").Router()
const userController = require("../control/userController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isEmployee } = require("../util/Authorization")

router.get("/profile", isUserAuth, userController.viewProfile)
router.put("/edit", isUserAuth, userController.EditUserProfile);

router.post("/post", isUserAuth, isAdmin, userController.CreateUser);
router.get("/", isUserAuth, isAdmin, userController.getAllUsers);

module.exports = router;