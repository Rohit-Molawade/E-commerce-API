const cartService = require('../services/cart');

exports.cart_get = async (req, res) => {
    try {
        const user_id = req.user._id;
        const cart = await cartService.get_cart(user_id);

        res.status(200).json({
            message: 'Cart found',
            cart: cart,
        });
    } catch (error) {
        next(Error);
    }
};
