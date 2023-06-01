const router = require("express").Router()
const analyticsController = require("../control/analyticsController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isSales, isMarketing } = require("../util/Authorization")

router.get('/', isUserAuth, isAdmin, isMarketing, analyticsController.getAnalytics)
router.get('/recent', isUserAuth, analyticsController.getRecentProduct)
router.get('/location', isUserAuth, analyticsController.getLocation)


module.exports = router