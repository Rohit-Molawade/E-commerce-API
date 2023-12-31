const Cart = require('../models/cart');
const Product = require('../models/product');

exports.add_product = async (product_details, user_id) => {
    try {
        const [product, cart] = await Promise.all([
            await Product.findById(product_details.id),
            await Cart.findOne({ owner: user_id })
                .populate('owner', 'name')
                .populate('product.productId', 'name price quantity brand'),
        ]);

        //Throw error if product not found
        if (product === null) {
            throw new Error('Product Not Found');
        }

        //Throw error if product already exists
        if (cart !== null) {
            cart.product.map((prod) => {
                if (prod.productId._id.toString() === product_details.id) {
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
        product.quantity -= product_details.quantity;
        if (product.quantity <= 0) {
            product.availability = false;
            product.quantity = 0;
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
            .populate('product.productId', 'name price quantity brand');

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

exports.remove_product = async (product_id, user_id) => {
    try {
        let quantity;
        const [product, cart] = await Promise.all([
            await Product.findById(product_id),
            await Cart.findOne({ owner: user_id })
                .populate('owner', 'name')
                .populate('product.productId', 'name price quantity brand'),
        ]);

        //Throw error if cart not exists
        if (cart === null) {
            throw new Error('Cart does not exists');
        }

        cart.product.map((prod) => {
            if (prod.productId._id.toString() === product_id) {
                quantity = prod.quantity;
            }
        });

        //Throw error if product not in cart
        if (quantity === 0) {
            throw new Error('Product not in cart');
        }

        //Calculate total price
        const totalPrice = cart.totalPrice - product.price * quantity;

        await Cart.findOneAndUpdate(
            { owner: user_id },
            {
                $pull: {
                    product: {
                        productId: product.id,
                    },
                },
                totalPrice: totalPrice,
            }
        );

        //Update product availability and quantity
        product.quantity += quantity;
        if (product.quantity > 0) {
            product.availability = true;
        }

        await product.save();

        return 'Product removed from cart';
    } catch (error) {
        return error;
    }
};

exports.update_product = async (product_details, user_id) => {
    let productFlag = false;
    let offset = 0;
    const [product, cart] = await Promise.all([
        await Product.findById(product_details.id),
        await Cart.findOne({ owner: user_id })
            .populate('owner', 'name')
            .populate('product.productId', 'name price quantity brand'),
    ]);

    if (product_details.quantity <= 0) {
        throw new Error('Invalid quantity');
    }

    //Throw error if cart not exists
    if (cart === null) {
        throw new Error('Cart does not exists');
    }

    //Throw error if product not found
    if (product === null) {
        throw new Error('Product Not Found');
    }

    cart.product.map((prod) => {
        if (prod.productId._id.toString() === product_details.id) {
            productFlag = true;
            offset = product_details.quantity - prod.quantity;
        }
    });

    if (productFlag === false) {
        throw new Error('Product not in cart');
    }

    //Throw error if user adds more items then available
    if (product.quantity - offset < 0) {
        throw new Error('Product quantity exceeded');
    }

    //Calculate total price
    const totalPrice = cart.totalPrice + product.price * offset;

    await Cart.findOneAndUpdate(
        { owner: user_id, 'product.productId': product_details.id },
        {
            $set: {
                'product.$.quantity': product_details.quantity,
            },
            totalPrice: totalPrice,
        }
    );

    //Update product availability and quantity
    product.quantity = product.quantity - offset;
    if (product.quantity > 0) {
        product.availability = true;
    }

    await product.save();

    return 'Product quantity updated';
};
