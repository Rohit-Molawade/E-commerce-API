const express = require('express');
const router = express.Router();
const Controller = require('../controllers/cart');
const authentication = require('../middleware/authentication');

//GET request for cart
router.get('/', authentication.authenticate_jwt, Controller.cart_get);

//POST request to add product in cart
router.post('/', authentication.authenticate_jwt, Controller.cart_add);

//PUT request to update product quantities in cart
router.put('/', () => {
    //Contoller to update product quantities in cart
});

//DELETE request to delete product from cart
router.delete('/:product_id', () => {
    //Contoller to delete product from cart
});

module.exports = router;
