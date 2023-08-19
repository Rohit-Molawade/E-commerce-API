/**
 * @swagger
 * tags:
 *   name: User
 *   description: API route to login and register user
 * /register:
 *   post:
 *     summary: Registers a user
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: name
 *         required: true
 *         description: Name of the user
 *         schema:
 *           type: string
 *       - in: body
 *         name: email
 *         required: true
 *         description: email of the user
 *         schema:
 *           type: string
 *       - in: body
 *         name: password
 *         required: true
 *         description: password of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some error Occured
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login and return jwt token
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *         description: email of the user
 *         schema:
 *           type: string
 *       - in: body
 *         name: password
 *         required: true
 *         description: password of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User Logged In
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some error Occured
 */

const express = require('express');
const router = express.Router();

const validator = require('../middleware/validation');
const Contoller = require('../controllers/user');
const authentication = require('../middleware/authentication');

//POST request to authenticate user
router.post(
    '/login',
    validator.login_validation,
    authentication.authenticate_local
);

//POST request to register user
router.post('/register', validator.register_validation, Contoller.register);

module.exports = router;
