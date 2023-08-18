const listingService = require('../services/listing');

exports.category_listing = async (req, res) => {
    try {
        const categories = await listingService.get_categories();
        res.status(200).json({
            message: 'Fetch Successful',
            categories,
        });
    } catch (error) {
        next(error);
    }
};

exports.products_listing = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const products = await listingService.get_products(category_id);
        res.status(200).json({ message: 'Fetch Successful', products });
    } catch (error) {
        next(error);
    }
};

exports.products_details = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const product_details = await listingService.get_product_details(
            product_id
        );
        res.status(200).json({ message: 'Fetch Successful', product_details });
    } catch (error) {
        next(error);
    }
};
