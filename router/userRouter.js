const router = require("express").Router()
const userController = require("../control/userController")
const isUserAuth = require("../util/isUserAuth");
const { isAdmin, isSales, isMarketing } = require("../util/Authorization")

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for Users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivationStatus:
 *       type: object
 *       properties:
 *         isactive:
 *           type: boolean
 *           description: The new activation status for the user
 *       required:
 *         - isactive
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetail:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the user
 *         lastname:
 *           type: string
 *           description: The last name of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *           enum: ["Admin", "Sales", "Marketing"]
 *         isactive:
 *           type: boolean
 *           description: Whether the user is active or not
 *       required:
 *         - firstname
 *         - lastname
 *         - username
 *         - email
 *         - role
 *         - isactive
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserGet:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user
 *         username:
 *           type: string
 *           description: The username for the user
 *         firstname:
 *           type: string
 *           description: The first name for the user
 *         lastname:
 *           type: string
 *           description: The last name for the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address for the user
 *         role:
 *           type: string
 *           description: The role for the user
 *           enum: ["Admin", "Sales", "Marketing"]
 *       required:
 *         - _id
 *         - username
 *         - firstname
 *         - lastname
 *         - email
 *         - role
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username for the new user
 *         firstname:
 *           type: string
 *           description: The first name for the new user
 *         lastname:
 *           type: string
 *           description: The last name for the new user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address for the new user
 *         password:
 *           type: string
 *           description: The password for the new user
 *         role:
 *           type: string
 *           description: The role for the new user
 *           enum: ["Admin", "Sales", "Marketing"]
 *       required:
 *         - username
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - role
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The new username for the user
 *         firstname:
 *           type: string
 *           description: The new first name for the user
 *         lastname:
 *           type: string
 *           description: The new last name for the user
 *         email:
 *           type: string
 *           format: email
 *           description: The new email address for the user
 *       required:
 *         - username
 *         - firstname
 *         - lastname
 *         - email
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *           unique: true
 *         firstname:
 *           type: string
 *           description: The first name of the user
 *         lastname:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *           enum: ["Admin", "Sales", "Marketing"]
 *         isactive:
 *           type: boolean
 *           description: Whether the user is active or not
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated
 *       required:
 *         - username
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - role
 *         - isactive
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Returns the profile information of the authenticated user.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/profile", isUserAuth, userController.viewProfile)

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user profile
 *     description: Updates the profile information of the authenticated user.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User profile information to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.put("/edit", isUserAuth, userController.EditUserProfile);

/**
 * @swagger
 * /user/post:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided user details.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User details for the new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.post("/post", isUserAuth, isAdmin, userController.CreateUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users in the system.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserGet'
 */
router.get("/", isUserAuth, isAdmin, userController.getAllUsers);

/**
 * @swagger
 * /user/detail/{userid}:
 *   get:
 *     summary: Get user details
 *     description: Returns the details of a specific user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user to retrieve.
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetail'
 */
router.get("/detail/:userid", isUserAuth, userController.getOneUser);

/**
 * @swagger
 * /user/{id}/deactivate:
 *   post:
 *     summary: Activate or deactivate a user
 *     description: Activates or deactivates a user based on the value of the `isactive` field in the request body.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user to activate or deactivate.
 *     requestBody:
 *       description: The new activation status for the user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivationStatus'
 *     responses:
 *       200:
 *         description: Activation status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.post("/:id/deactivate", isUserAuth, isAdmin, userController.SetActive);

module.exports = router;