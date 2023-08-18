const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticate_local = function (req, res, next) {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        console.log('auth done')
        if (error || !user) {
            res.status(400).json({
                error: info.message,
            });
            return;
        }

        //If credentials are correct Login and sign JWT
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.status(400).json({
                    error: 'Some error Occured',
                });
            }

            const token = jwt.sign(
                { _id: user._id, email: user.email },
                process.env.jwt_secret,
                { expiresIn: '24h' }
            );
            res.status(200).json({
                token,
                user: {
                    name: user.name,
                    email: user.email,
                },
                message: 'Login Successful',
            });
        });
    })(req, res, next);
};

exports.authenticate_jwt = function (req, res, next) {
    //Check for JWT token
    passport.authenticate('jwt', { session: false })(req, res, next);
};
