const bcrypt = require('bcrypt');
const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const jwtstrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user.js');

//Implement Local strategy for authentication
passport.use(
    new localstrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            console.log('auth going')
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: 'Email not found' });
                }

                //Compare user's hashed password and entered password
                const valid = await bcrypt.compare(password, user.password);

                if (valid) {
                    return done(null, user, { message: 'Login Successful' });
                }

                return done(null, false, { message: 'Password wrong' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

//Implement JWT Strategy for Authorization to API
passport.use(
    new jwtstrategy(
        {
            secretOrKey: process.env.jwt_secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (payload, done) => {
            try {
                const user = await User.findOne(
                    { email: payload.email },
                    'name email'
                );
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                done(error);
            }
        }
    )
);
