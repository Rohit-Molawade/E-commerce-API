const { body, validationResult } = require('express-validator');

exports.register_validation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name field empty')
        .isString()
        .withMessage('Name should be string')
        .escape(),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email filed is empty')
        .toLowerCase()
        .isEmail()
        .withMessage('Email format error')
        .escape(),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password field is empty')
        .isLength({ min: 8 })
        .withMessage('Password is too short')
        .isStrongPassword()
        .withMessage('Password not strong')
        .escape(),
    (req, res) => {
        const error_list = validationResult(req);
        if (!error_list.isEmpty()) {
            res.status(401).json(error_list);
            return;
        }
        next();
    },
];
