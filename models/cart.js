const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartschema = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    product: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Cart', cartschema);
