const cartService = require('../services/cart');

exports.cart_add = async (req, res, next) => {
    try {
        const product_details = {
            id: req.body.product_id,
            quantity: req.body.quantity,
        };

        const user_id = req.user._id;
        const message = await cartService.add_product(product_details, user_id);

        if (message.name === 'Error') {
            res.status(400).json({ message: message.message });
            return;
        }

        res.status(200).json({ message: message });
    } catch (error) {
        next(error);
    }
};

exports.cart_get = async (req, res, next) => {
    try {
        const user_id = req.user._id;
        const cart = await cartService.get_cart(user_id);

        res.status(200).json({
            message: 'Cart found',
            cart: cart,
        });
    } catch (error) {
        next(error);
    }
};
