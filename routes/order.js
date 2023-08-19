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
