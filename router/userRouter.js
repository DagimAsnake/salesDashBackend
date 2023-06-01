const router = require("express").Router()
const userController = require("../control/userController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isSales, isMarketing } = require("../util/Authorization")

router.get("/profile", isUserAuth, userController.viewProfile)
router.put("/edit", isUserAuth, userController.EditUserProfile);

router.post("/post", isUserAuth, isAdmin, userController.CreateUser);
router.get("/", isUserAuth, isAdmin, userController.getAllUsers);

router.get("/detail/:userid", isUserAuth, userController.getOneUser);
router.post("/:id/deactivate", isUserAuth, isAdmin, userController.SetActive);

module.exports = router;