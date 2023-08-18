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
