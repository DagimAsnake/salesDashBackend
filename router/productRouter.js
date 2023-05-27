const router = require("express").Router()
const productController = require("../control/productController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isEmployee } = require("../util/Authorization")

router.get("/", isUserAuth, productController.getAllProducts);
router.get("/detail/:proid", isUserAuth, productController.getOneProduct);

module.exports = router;