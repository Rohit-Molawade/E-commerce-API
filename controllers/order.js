const orderService = require('../services/order');

exports.order_place = async (req, res, next) => {
    try {
        const user_id = req.user._id;
        const shippingDetails = {
            name: req.user.name,
            address: req.body.address,
            deliveryNotes: req.body.deliveryNotes,
        };
        const message = await orderService.place_order(
            shippingDetails,
            user_id
        );

        if (message.name === 'Error') {
            res.status(400).json({ message: message.message });
            return;
        }

        res.status(200).json({ message: message });
    } catch (error) {
        next(error);
    }
};

exports.order_history = async (req, res, next) => {
    try {
        const user_id = req.user._id;
        const order_history = await orderService.get_history_order(user_id);

        res.status(200).json({
            message: 'Order history fetched',
            order_history,
        });
    } catch (error) {
        next(error);
    }
};

exports.get_order = async (req, res, next) => {
    try {
        const user_id = req.user._id;
        const order_id = req.params.order_id;

        const order = await orderService.get_order(order_id, user_id);

        if (order.name === 'Error') {
            res.status(400).json({ message: message.message });
            return;
        }

        res.status(200).json({ message: 'Order details fetched', order });
    } catch (error) {
        next(error);
    }
};
