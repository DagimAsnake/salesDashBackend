const router = require("express").Router()
const productController = require("../control/productController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isSales, isMarketing } = require("../util/Authorization")

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for Products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewProduct:
 *       type: object
 *       properties:
 *         productName:
 *           type: string
 *           description: The name of the product
 *         productSpecification:
 *           type: string
 *           description: The specifications of the product
 *         productType:
 *           type: string
 *           description: The type of the product
 *         warehouseNumber:
 *           type: string
 *           description: The warehouse number where the product is stored
 *         productQuantity:
 *           type: integer
 *           description: The quantity of the product
 *         shelfNumber:
 *           type: string
 *           description: The shelf number where the product is stored
 *         safetyType:
 *           type: string
 *           description: The safety type of the product
 *         measuringInput:
 *           type: string
 *           description: The measuring input of the product
 *         expireDate:
 *           type: string
 *           format: date
 *           description: The expiry date of the product
 *         productUsability:
 *           type: string
 *           description: The usability of the product
 *       required:
 *         - productName
 *         - productSpecification
 *         - productType
 *         - warehouseNumber
 *         - productQuantity
 *         - shelfNumber
 *         - safetyType
 *         - measuringInput
 *         - expireDate
 *         - productUsability
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PieChartData:
 *       type: object
 *       properties:
 *         products:
 *           type: number
 *           description: The total number of products
 *         sold:
 *           type: number
 *           description: The number of sold products
 *         unsold:
 *           type: number
 *           description: The number of unsold products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DashboardData:
 *       type: object
 *       properties:
 *         customers:
 *           type: number
 *           description: The number of customers who have made a purchase
 *         totalSum:
 *           type: number
 *           description: The total revenue from all purchases
 *         totalCost:
 *           type: number
 *           description: The total cost of all products
 *         totalOrders:
 *           type: number
 *           description: The total number of orders
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetail:
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
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     description: Get all the products in the database
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns all the products in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   description: An array of objects containing the product information for all the products in the database
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/", isUserAuth, productController.getAllProducts);

/**
 * @swagger
 * /products/detail/{proid}:
 *   get:
 *     summary: Get product details
 *     description: Get the details of a specific product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: proid
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the details of the specified product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   $ref: '#/components/schemas/ProductDetail'
 */
router.get("/detail/:proid", isUserAuth, productController.getOneProduct);

/**
 * @swagger
 * /product/dashboard:
 *   get:
 *     summary: Get dashboard data
 *     description: Get data for the dashboard
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns data for the dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   $ref: '#/components/schemas/DashboardData'
 */
router.get("/dashboard", isUserAuth, productController.getDashboardData);

/**
 * @swagger
 * /product/piechart:
 *   get:
 *     summary: Get pie chart data
 *     description: Get data for a pie chart showing the number of sold and unsold products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns data for a pie chart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   $ref: '#/components/schemas/PieChartData'
 */
router.get("/piechart", isUserAuth, productController.getPieChart);

/**
 * @swagger
 * /product/addproduct:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product and save it to the database
 *     tags: [Products]
 *     requestBody:
 *       description: Object containing information about the new product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       200:
 *         description: Returns a success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 */
router.post('/addprodcut', isUserAuth, productController.CreateProduct)

/**
 * @swagger
 * /product/invproduct:
 *   get:
 *     summary: Get all inventory products
 *     description: Returns a list of all inventory products stored in the database.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of inventory products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NewProduct'
 */
router.get('/invproduct', isUserAuth, productController.getInventoryProducts)

module.exports = router;