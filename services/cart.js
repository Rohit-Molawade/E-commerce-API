const Cart = require('../models/cart');
const Product = require('../models/product');

exports.add_product = async (product_details, user_id) => {
    try {
        const [product, cart] = await Promise.all([
            await Product.findById(product_details.id),
            await Cart.findOne({ owner: user_id })
                .populate('owner', 'name')
                .populate('product'),
        ]);

        //Throw error if product not found
        if (product === null) {
            throw new Error('Product Not Found');
        }

        //Throw error if product already exists
        if (cart !== null) {
            cart.product.map((prod) => {
                if (prod.productId.toString() === product_details.id) {
                    throw new Error('Product already Added to the cart');
                }
            });
        }

        //Throw error if out of stock
        if (product.availability === false) {
            throw new Error('Product Out of Stock');
        }

        //Throw error if user adds more items then available
        if (product.quantity - product_details.quantity < 0) {
            throw new Error('Product quantity exceeded');
        }

        //Calculate total price
        const totalPrice =
            (cart !== null ? cart.totalPrice : 0) +
            product.price * product_details.quantity;

        //Update cart
        await Cart.findOneAndUpdate(
            { owner: user_id },
            {
                $push: {
                    product: {
                        productId: product_details.id,
                        quantity: product_details.quantity,
                    },
                },
                totalPrice: totalPrice,
            },
            {
                upsert: true,
            }
        );

        //Update product availability and quantity
        const new_quantity = (product.quantity -= product_details.quantity);
        if (new_quantity <= 0) {
            product.availability = false;
            product.quantity = 0;
        } else {
            product.quantity = new_quantity;
        }

        //Update product
        await product.save();

        return 'Product added to Cart successfully';
    } catch (error) {
        return error;
    }
};

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
