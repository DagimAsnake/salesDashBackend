const router = require("express").Router()
const analyticsController = require("../control/analyticsController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isEmployee } = require("../util/Authorization")

router.get('/', isUserAuth, analyticsController.getAnalytics)

module.exports = router