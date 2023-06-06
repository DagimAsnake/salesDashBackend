const router = require('express').Router()
const authController = require('../control/authController')
const isUserAuth = require("../util/isUserAuth");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for authentication and authorization
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and generate an access token
 *     tags: [Authentication]
 *     requestBody:
 *       description: User's email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message and an access token if the user is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: The success message
 *                 token:
 *                   type: string
 *                   description: The access token generated for the user
 */

router.post('/login', authController.Login)

/**
 * @swagger
 * /auth/forgetpassword:
 *   post:
 *     summary: Request password reset link
 *     description: Send a password reset link to the user's email
 *     tags: [Authentication]
 *     requestBody:
 *       description: User's email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message if the password reset link was sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: The success message
 */
router.post("/forgetpassword", authController.resetPassword);

/**
 * @swagger
 * /auth/passwordreset/{userId}/{token}:
 *   post:
 *     summary: Change forgotten password
 *     description: Reset the user's forgotten password
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to reset the password for
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The reset token sent to the user's email
 *     requestBody:
 *       description: New password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirm_Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message if the password was changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: The success message
 */
router.post("/passwordreset/:userId/:token", authController.changeForgetPassword);

/**
 * @swagger
 * /auth/changepassword:
 *   post:
 *     summary: Change user password
 *     description: Update the password of the authenticated user
 *     tags: [Authentication]
 *     requestBody:
 *       description: Old and new passwords
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldpassword:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message if the password was changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: The success message
 */
router.post("/changepassword", isUserAuth, authController.ChangePassword)

/**
 * @swagger
 * /auth/verifyusertoken:
 *   get:
 *     summary: Verify user token
 *     description: Verify the validity of the user's access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Returns the verification status of the token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: boolean
 *                   description: Indicates whether the token is valid or not
 *                 payload:
 *                   type: object
 *                   description: Payload containing the user ID and role if the token is valid
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: The ID of the user associated with the token
 *                     role:
 *                       type: string
 *                       description: The role of the user associated with the token
 */
router.get("/verifyusertoken", authController.VerifyUserToken);

module.exports = router;