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
 * components:
 *   schemas:
 *     RecentAnalyticsData:
 *       type: object
 *       properties:
 *         productName:
 *           type: string
 *           description: The name of the product.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the product.
 *         totalAddedCost:
 *           type: number
 *           description: The total added cost of all sales for the product.
 *       required:
 *         - productName
 *         - createdAt
 *         - totalAddedCost
 *
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 description: The error message.
 *             required:
 *               - msg
 *
 *     InternalServerError:
 *       description: Internal server error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 description: The error message.
 *             required:
 *               - msg
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AnalyticsData:
 *       type: object
 *       properties:
 *         productName:
 *           type: string
 *           description: The name of the product.
 *         totalAddedCost:
 *           type: number
 *           description: The total added cost of all sales for the product.
 *         totalUsers:
 *           type: number
 *           description: The total number of users who purchased the product.
 *         productType:
 *           type: string
 *           description: The type of the product.
 *       required:
 *         - productName
 *         - totalAddedCost
 *         - totalUsers
 *         - productType
 *
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized access error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 description: The error message.
 *             required:
 *               - msg
 *
 *     InternalServerError:
 *       description: Internal server error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 description: The error message.
 *             required:
 *               - msg
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

/**
 * @swagger
 * /analytics/search:
 *   get:
 *     summary: Search for analytics data by product name.
 *     description: Returns a list of analytics data for products matching the specified search term.
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search term to filter products by name.
 *     responses:
 *       200:
 *         description: A list of analytics data for products matching the search term.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AnalyticsData'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/search', analyticsController.searchAnalytics);

/**
 * @swagger
 * /analytics/searchrecent:
 *   get:
 *     summary: Search for recent analytics data by product name and date range.
 *     description: Returns a list of recent analytics data for products matching the specified search term and within the specified date range.
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search term to filter products by name.
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date of the date range to filter products by creation date.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date of the date range to filter products by creation date.
 *     responses:
 *       200:
 *         description: A list of recent analytics data for products matching the search term and within the date range.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: A flag indicating whether the operation was successful.
 *                 recentProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RecentAnalyticsData'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/searchrecent', analyticsController.searchRecent)

module.exports = router