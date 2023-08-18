const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderschema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, refs: 'User' },
    product: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                refs: 'Product',
            },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    totalBill: { type: Number, required: true },
    trackingNumber: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    shippingDetails: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        deliveryNotes: { type: String, required: false },
    },
});

module.exports = mongoose.model('Order', orderschema);
