let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

let mongoose = require('./services/dbconnect');
let apiRouter = require('./routes/index');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Auth middleware
require('./services/passport.js');

//Connect to MongoDB
mongoose.main();

//API Routes
app.use('/v1', apiRouter.listingRouter);
app.use('/v1', apiRouter.userRouter);
app.use('/v1', apiRouter.orderRouter);
app.use('/v1/cart', apiRouter.cartRouter);

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'E-commerce API with Swagger',
            version: '0.1.0',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Rohit Molawade',
                email: 'rohit.molawade27@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json('Some error Occured');
});

module.exports = app;
