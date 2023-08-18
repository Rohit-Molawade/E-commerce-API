const userService = require('../services/user');

exports.register = async (req, res, next) => {
    try {
        const userDetails = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        const message = await userService.register(userDetails);

        console.log(message.name);
        if (message.name === 'Error') {
            res.status(400).json({ message: message.message });
            return;
        }

        res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};
