const express = require('express');
const router = express.Router();

// GET request for Index
router.get('/', (req, res) => {
    res.send('API available')
});

//GET request for categories
router.get('/categories', () => {
    //Controller to display list of all categories
});

//GET request for products
router.get('/products/:category_id', () => {
    //Controller to display product info of all products using category Id
});

//GET request for products
router.get('/products/:product_id', () => {
    //Controller to display product info of all products using category Id
});

module.exports = router;
