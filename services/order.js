const Cart = require('../models/cart');
const Order = require('../models/order');

exports.place_order = async (shippingDetails, user_id) => {
    try {
        const date = new Date();
        const days_to_deliver = 2;
        const cart = await Cart.findOne({ owner: user_id })
            .populate('owner', 'name')
            .populate(
                'product.productId',
                'name price description brand releaseDate'
            );

        if (cart === null) {
            throw new Error('Cart not found');
        }

        if (cart.product.length === 0) {
            throw new Error('Cart is empty');
        }

        //Create order
        const orderDetails = {
            userId: user_id,
            product: cart.product,
            totalBill: cart.totalPrice,
            deliveryDate: date.setDate(date.getDate() + days_to_deliver), //Delivery will take 2 days
            shippingDetails: shippingDetails,
            trackingNumber: Math.floor(100000 + Math.random() * 900000), //Random 6 digit number
        };

        const order = new Order(orderDetails);
        await order.save();

        //Reset Cart
        cart.product = [];
        cart.totalPrice = 0;

        cart.save();

        return 'Order placed';
    } catch (error) {
        return error;
    }
};

exports.get_history_order = async (user_id) => {
    try {
        const order = await Order.find(
            { userId: user_id },
            'trackingNumber deliveryDate totalBill product createdAt'
        )
            .populate('product.productId')
            .sort({ createdAt: 1 });

        return order;
    } catch (error) {
        return error;
    }
};

exports.get_order = async (order_id, user_id) => {
    try {
        const order = await Order.find({
            _id: order_id,
            userId: user_id,
        }).populate('product.productId');

        if (order === null) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        return error;
    }
};
