const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const userDetails = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        await userService(userDetails);
    } catch (error) {
        next(error);
    }
};
