/**
 * @swagger
 * tags:
 *   name: Listing
 *   description: API route to display inventory info
 * /categories:
 *   get:
 *     summary: Get list of all categories
 *     tags: [Listing]
 *     responses:
 *       200:
 *         description: All categories fetched.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some error Occured
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Get list of all product under the specified category
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: Numeric ID of the category to retrieve products from.
 *         schema:
 *           type: objectID
 *     responses:
 *       200:
 *         description: All products fetched.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some error Occured
 */

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get info about a specific product
 *     tags: [Listing]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Numeric ID of the product
 *         schema:
 *           type: objectID
 *     responses:
 *       200:
 *         description: Product details fetched.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some error Occured
 *             
 */

const express = require('express');
const router = express.Router();
const Contoller = require('../controllers/listing');

// GET request for Index
router.get('/', (req, res) => {
    res.send('API available');
});

//GET request for categories
router.get('/categories', Contoller.category_listing);

//GET request for products
router.get('/categories/:category_id', Contoller.products_listing);

//GET request for products
router.get('/products/:product_id', Contoller.products_details);

module.exports = router;
