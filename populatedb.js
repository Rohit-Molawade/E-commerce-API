console.log('This script populates some Category and Items to your database.');

const bcrypt = require('bcrypt');
const Category = require('./models/category');
const Product = require('./models/product');

const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7
const mongoDB =
    'mongodb+srv://api_user:example_pass@cluster0.49myvsm.mongodb.net/CommerceAPI?retryWrites=true&w=majority';

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createCategory();
    await createProduct();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
}

async function categoryCreate(name, description) {
    categorydetail = {
        name,
        description,
    };

    const category = new Category(categorydetail);

    await category.save();
    categories.push(category);
    console.log(`Added category: ${name}`);
}

async function productCreate(
    name,
    description,
    price,
    quantity,
    availability,
    category,
    brand,
    releaseDate
) {
    productDetail = {
        name,
        category,
        price,
        quantity,
        availability,
        category,
        brand,
        releaseDate,
        description,
    };

    const product = new Product(productDetail);
    await product.save();
    console.log(`Added item: ${name}`);
}

async function createCategory() {
    console.log('Adding category');
    await Promise.all([
        categoryCreate(
            'Mobile Phones',
            `Explore our wide range of cutting-edge mobile phones that cater to every need and style. Stay connected, capture moments, and experience seamless functionality with our diverse selection of mobile phones.`
        ),
        categoryCreate(
            'Laptop',
            `Whether you're a professional on the go, a student, or a creative enthusiast, our laptop collection offers a variety of options to cater to your needs.`
        ),
        categoryCreate(
            'Mouse',
            `Explore our diverse collection of computer mice, designed to enhance your digital experience. Discover ergonomic, wireless, gaming, and precision mice for seamless navigation and optimal comfort.`
        ),
        categoryCreate(
            'Keyboard',
            `From sleek wireless options to customizable mechanical keyboards, our selection caters to every need. Browse now and find the perfect keyboard to enhance your productivity and gaming sessions.`
        ),
    ]);
}

async function createProduct() {
    console.log('Adding products');
    await Promise.all([
        productCreate(
            'Oneplus 10 pro',
            `The OnePlus 10 Pro redefines flagship excellence with its cutting-edge features and stunning design.With sleek aesthetics, fast charging technology, and seamless 5G connectivity, this device stands as a testament to OnePlus' commitment to innovation and user satisfaction.`,
            50000,
            20,
            true,
            categories[0],
            'Oneplus',
            new Date('2022-05-21')
        ),
        productCreate(
            'Pixel 5',
            `Introducing the Google Pixel 5: Experience innovation in the palm of your hand with the Pixel 5. Boasting a stunning 6.0" OLED display, powerful 5G capabilities, and the renowned Pixel camera system, capturing breathtaking photos and enjoying seamless connectivity has never been easier.`,
            70000,
            10,
            true,
            categories[0],
            'Google',
            new Date('2023-01-17')
        ),
        productCreate(
            'Legion 5',
            `The Lenovo Legion 5: Unleash Your Gaming Potential. The Lenovo Legion 5 is a powerhouse gaming laptop designed for ultimate performance. With cutting-edge processors, high-refresh-rate displays, and advanced graphics, it delivers an immersive gaming experience.`,
            100000,
            5,
            true,
            categories[1],
            'Lenovo',
            new Date('2021-11-20')
        ),
        productCreate(
            'TUF F15',
            `The TUF F15 is a high-performance gaming laptop that combines power and durability for an exceptional gaming experience. With its powerful hardware, including the latest processors and graphics cards, it delivers smooth gameplay and impressive visuals.`,
            90000,
            2,
            true,
            categories[1],
            'Asus',
            new Date('2022-02-28')
        ),
        productCreate(
            'Viper mini',
            `Razer Viper Mini: Unleash Precision and Speed. The Razer Viper Mini gaming mouse offers a compact design without compromising on performance.`,
            7000,
            0,
            false,
            categories[2],
            'Razer',
            new Date('2019-07-27')
        ),
    ]);
}
