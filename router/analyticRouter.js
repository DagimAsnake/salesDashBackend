const router = require("express").Router()
const analyticsController = require("../control/analyticsController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isSales, isMarketing } = require("../util/Authorization")

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: API endpoints for Analytics
 */

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get product analytics
 *     description: Get the total number of users and added cost for each product
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Returns the total number of users and added cost for each product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   description: An array of objects containing the product name, total users, total added cost, and product type
 *                   items:
 *                     type: object
 *                     properties:
 *                       productName:
 *                         type: string
 *                         description: The name of the product
 *                       totalUsers:
 *                         type: number
 *                         description: The total number of users who have purchased the product
 *                       totalAddedCost:
 *                         type: number
 *                         description: The total added cost of the product
 *                       productType:
 *                         type: string
 *                         description: The type of the product
 */
router.get('/', isUserAuth, analyticsController.getAnalytics)

/**
 * @swagger
 * /analytics/recent:
 *   get:
 *     summary: Get recent products
 *     description: Get the most recently sold products
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Returns the most recently sold products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   description: An array of objects containing the product information for the most recently sold products
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/recent', isUserAuth, analyticsController.getRecentProduct)

/**
 * @swagger
 * /analytics/location:
 *   get:
 *     summary: Get product location
 *     description: Get the number of products in each location
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Returns the number of products in each location
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   description: An array of objects containing the location and the number of products in each location
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The location of the product
 *                       count:
 *                         type: number
 *                         description: The number of products in the location
 */
router.get('/location', isUserAuth, analyticsController.getLocation)

router.get('/search', analyticsController.searchAnalytics);

router.get('/searchrecent', analyticsController.searchRecent)

module.exports = router