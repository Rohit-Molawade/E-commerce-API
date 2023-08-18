const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = async (userDetails) => {
    try {
        //Get user if already exists
        const user_find = await User.findOne({ email: userDetails.email });
        //Hash password
        const hashPassword = await bcrypt.hash(
            userDetails.password,
            saltRounds
        );

        //If email already exists throw error
        if (user_find !== null) {
            throw new Error('Email already Exists');
        } else {
            //Create new User
            const user = new User({ ...userDetails, password: hashPassword });
            await user.save();
            return 'Registration Successful';
        }
    } catch (error) {
        return error;
    }
};
