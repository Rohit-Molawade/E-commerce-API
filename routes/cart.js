const express = require('express');
const router = express.Router();

//GET request for cart
router.get('/', () => {
    //Controller to displaty Users cart
});

//POST request to add product in cart
router.post('/:product_id', () => {
    //Contoller to add product in cart
});

//PUT request to update product quantities in cart
router.put('/:product_id', () => {
    //Contoller to update product quantities in cart
});

//DELETE request to delete product from cart
router.delete('/:product_id', () => {
    //Contoller to delete product from cart
});

module.exports = router;
