let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');

let indexRouter = require('./routes/index');
let apiRouter = require('./routes/index');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//API Routes
app.use('/', indexRouter);
app.use('/v1', apiRouter.listingRouter);
app.use('/v1', apiRouter.userRouter);
app.use('/v1', apiRouter.orderRouter);
app.use('/v1/cart', apiRouter.cartRouter);

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