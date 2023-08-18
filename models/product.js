const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productschema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 0},
    availability: { type: Boolean, required: true },
    category: { type: Schema.Types.ObjectId, required: true, refs: 'Category' },
    Brand: { type: String, required: true },
    releaseDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Product', productschema);
