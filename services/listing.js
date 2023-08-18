const Category = require('../models/category');
const Product = require('../models/product');

exports.get_categories = async () => {
    try {
        return await Category.find({}).sort({ name: 1 });
    } catch (error) {
        return error;
    }
};

exports.get_products = async (category_id) => {
    try {
        return await Product.find(
            { category: category_id },
            'name price availability category'
        )
            .sort({ name: 1 })
            .populate('category');
    } catch (error) {
        return error;
    }
};

exports.get_product_details = async (product_id) => {
    try {
        return await Product.findById(product_id)
            .sort({ name: 1 })
            .populate('category');
    } catch (error) {
        return error;
    }
};
