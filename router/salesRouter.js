const router = require("express").Router()
const salesController = require("../control/salesController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isSales, isMarketing } = require("../util/Authorization")

router.get('/', isUserAuth, isAdmin, isSales, salesController.productSales)
router.get('/popular', isUserAuth, salesController.popularProducts)

module.exports = router