/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated ID of category
 *         name:
 *           type: string
 *           description: Name of the category
 *         description:
 *           type: string
 *           description: Description of the category
 *       example:
 *         id: 12930130
 *         title: Mobile Phones
 *         description: Whether you're a professional on the go, a student, or a creative enthusiast, our laptop collection offers a variety of options to cater to your needs.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated ID of category
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: user's Email
 *         password:
 *           type: string
 *           description: user's password
 *       example:
 *         id: 64df9561b7cca5b50159fb73
 *         name: Tim button
 *         email: tim@gmail.com
 *         password: tim@Button12
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - quantity
 *         - availability
 *         - category
 *         - brand
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated ID of product
 *         name:
 *           type: string
 *           description: Name of the product
 *         description:
 *           type: string
 *           description: Description of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         quantity:
 *           type: number
 *           description: Number of available product
 *         availability:
 *           type: boolean
 *           description: indicates whether product is available
 *         category:
 *           type: string
 *           description: Auto generated ID of category this product belongs to
 *         brand:
 *           type: string
 *           description: Brand of the product
 *         releaseDate:
 *           type: date
 *           description: Date of product release date
 *       example:
 *         id: 64df555c32d3c4c9d396c6d5
 *         name: Pixel 5
 *         description: Introducing the Google Pixel 5 Experience innovation in the palm of your hand with the Pixel 5.
 *         price: 70000
 *         quantity: 16
 *         availability: true
 *         category: 64df555b32d3c4c9d396c6cc
 *         brand: Google
 *         releaseDate: 2023-01-17T00:00:00.000Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - owner
 *         - product
 *         - totalPrice
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated ID of cart
 *         owner:
 *           type: string
 *           description: ID of the cart owner with its name
 *         product:
 *           type: array
 *           description: array of ID of the product in cart
 *         totalPrice:
 *           type: number
 *           description: Total price of the entire shopping cart
 *       example:
 *         id: 64df555c32d3c4c9d396c6d5
 *         owner: 64df9561b7cca5b50159fb73
 *         product: [productId: 64df555c32d3c4c9d396c6d5]
 *         totalPrice: 70000
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - product
 *         - totalBill
 *         - trackingNumber
 *         - deliveryDate
 *         - shippingDetails
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated ID of order
 *         userId:
 *           type: string
 *           description: ID of the user who placed the order
 *         product:
 *           type: array
 *           description: array of ID of the product in cart
 *         totalBill:
 *           type: number
 *           description: Total price of the entire order
 *         trackingNumber:
 *           type: number
 *           description: 6 digit number to tracking order
 *         deliveryDate:
 *           type: date
 *           description: Date when order will be deilvered
 *         shippingDetails:
 *           type: array
 *           description: Array of shipping Details i.e name, address, deliveryNotes
 *       example:
 *         id: 64df555c32d3c4c9d396c6d5
 *         userId: 64df9561b7cca5b50159fb73
 *         product: [productId: 64df555c32d3c4c9d396c6d5]
 *         totalBill: 70000
 *         trackingNumber: 092375
 *         deliveryDate: 2023-01-19T00:00:00.000Z
 *         shippingDetails: {name: Tim, Address: Add, deliveryNotes: Notes}
 */
