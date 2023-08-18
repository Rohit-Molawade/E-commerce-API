const Cart = require('../models/cart');

exports.get_cart = async (user_id) => {
    try {
        const cart = await Cart.findOne({ owner: user_id })
            .populate('owner', 'name')
            .populate('product');

        //Cart not found
        if (cart === null) {
            //Create cart for the user
            const cartDetails = {
                owner: user_id,
                product: [],
                totalPrice: 0,
            };

            const cart = new Cart(cartDetails);
            return await cart.save();
        } else {
            return cart;
        }
    } catch (error) {
        return error;
    }
};
