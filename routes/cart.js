/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API route to perform CRUD operation on cart
 * /cart/:
 *   get:
 *     summary: Returns a users cart if exists or creates one
 *     tags: [Cart]
 *     parameters:
 *       - in: header
 *         name: Bearer Token
 *         required: true
 *         description: JWT token returned after login
 *     responses:
 *       200:
 *         description: Cart found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some error Occured
 */

/**
 * @swagger
 * /cart/:
 *   post:
 *     summary: Adds a product to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: body
 *         name: productId
 *         required: true
 *         description: Product id of the product
 *         schema:
 *           type: ObjectID
 *       - in: body
 *         name: quantity
 *         required: true
 *         description: Quantity of product
 *         schema:
 *           type: number
 *       - in: header
 *         name: Bearer Token
 *         required: true
 *         description: JWT token returned after login
 *     responses:
 *       200:
 *         description: Product added
 *       500:
 *         description: Some error Occured
 */

/**
 * @swagger
 * /cart/:
 *   put:
 *     summary: Update product quantites in cart
 *     tags: [Cart]
 *     parameters:
 *       - in: body
 *         name: productId
 *         required: true
 *         description: Product id of the product
 *         schema:
 *           type: ObjectID
 *       - in: body
 *         name: quantity
 *         required: true
 *         description: Quantity of product
 *         schema:
 *           type: number
 *       - in: header
 *         name: Bearer Token
 *         required: true
 *         description: JWT token returned after login
 *     responses:
 *       200:
 *         description: Product quantity updated
 *       500:
 *         description: Some error Occured
 */

/**
 * @swagger
 * /cart/{product_id}:
 *   delete:
 *     summary: Delete a product from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: Product id of the product
 *         schema:
 *           type: ObjectID
 *       - in: header
 *         name: Bearer Token
 *         required: true
 *         description: JWT token returned after login
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       500:
 *         description: Some error Occured
 */

const express = require('express');
const router = express.Router();
const Controller = require('../controllers/cart');
const authentication = require('../middleware/authentication');

//GET request for cart
router.get('/', authentication.authenticate_jwt, Controller.cart_get);

//POST request to add product in cart
router.post('/', authentication.authenticate_jwt, Controller.cart_add);

//PUT request to update product quantities in cart
router.put('/', authentication.authenticate_jwt, Controller.cart_update);

//DELETE request to delete product from cart
router.delete(
    '/:product_id',
    authentication.authenticate_jwt,
    Controller.cart_remove
);

module.exports = router;
