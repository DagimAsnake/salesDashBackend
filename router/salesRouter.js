const router = require("express").Router()
const salesController = require("../control/salesController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isSales, isMarketing } = require("../util/Authorization")

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: API endpoints for Sales
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the product
 *         productType:
 *           type: string
 *           description: The type of the product
 *         cost:
 *           type: number
 *           description: The cost of the product
 *         productName:
 *           type: string
 *           description: The name of the product
 *         sold:
 *           type: boolean
 *           description: Whether the product has been sold or not
 *         soldBy:
 *           type: string
 *           description: The user ID of the seller
 *         price:
 *           type: number
 *           description: The price of the product
 *         location:
 *           type: string
 *           description: The location of the product
 *         users:
 *           type: number
 *           description: The number of users who have purchased the product
 *         soldDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was sold
 */


/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get product sales
 *     description: Get the total sales for each product
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Returns the total sales for each product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   description: An array of objects containing the product name and total sales
 *                   items:
 *                     type: object
 *                     properties:
 *                       productName:
 *                         type: string
 *                         description: The name of the product
 *                       totalAddedCost:
 *                         type: number
 *                         description: The total sales of the product
 */
router.get('/', isUserAuth, salesController.productSales)

/**
 * @swagger
 * /sales/popular:
 *   get:
 *     summary: Get popular products
 *     description: Get the most popular products based on the number of users who have purchased them
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Returns the most popular products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   description: An array of objects containing the product information for the most popular products
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/popular', isUserAuth, salesController.popularProducts)

module.exports = router