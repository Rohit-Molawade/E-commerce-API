const express = require('express');
const router = express.Router();

//POST request to place order
router.post('/order', () => {
    //Controller to place order
});

//GET request for order history
router.get('/order-history', () => {
    //Contoller to get order history
});

//GET request to get order using order ID
router.get('/order/:order_id', () => {
    //Controller to get order using order ID
});

module.exports = router;
