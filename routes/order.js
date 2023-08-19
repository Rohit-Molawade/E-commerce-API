/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API route for order management
 * /order:
 *   post:
 *     summary: Creates a order
 *     tags: [Order]
 *     parameters:
 *       - in: body
 *         name: address
 *         required: true
 *         description: Address of the user
 *         schema:
 *           type: string
 *       - in: body
 *         name: deliveryNotes
 *         required: true
 *         description: Delivery notes with the order
 *         schema:
 *           type: string
 *       - in: header
 *         name: Bearer Token
 *         required: true
 *         description: JWT token returned after login
 *     responses:
 *       200:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some error Occured
 */

/**
 * @swagger
 * /order-history:
 *   get:
 *     summary: Gets users order history
 *     tags: [Order]
 *     parameters:
 *       - in: header
 *         name: Bearer Token
 *         required: true
 *         description: JWT token returned after login
 *     responses:
 *       200:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some error Occured
 */

/**
 * @swagger
 * /order/{order_id}:
 *   get:
 *     summary: Gets details of a specific Order
 *     tags: [Order]
  *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: ObjectID
 *       - in: header
 *         name: Bearer Token
 *         required: true
 *         description: JWT token returned after login
 *     responses:
 *       200:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some error Occured
 */

const express = require('express');
const router = express.Router();
const Controller = require('../controllers/order');
const Authentication = require('../middleware/authentication');

//POST request to place order
router.post('/order', Authentication.authenticate_jwt, Controller.order_place);

//GET request for order history
router.get(
    '/order-history',
    Authentication.authenticate_jwt,
    Controller.order_history
);

//GET request to get order using order ID
router.get(
    '/order/:order_id',
    Authentication.authenticate_jwt,
    Controller.get_order
);

module.exports = router;
