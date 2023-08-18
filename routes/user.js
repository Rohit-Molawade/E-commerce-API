const express = require('express');
const router = express.Router();

const validator = require('../middleware/validation');
const Contoller = require('../controllers/user');
const authentication = require('../middleware/authentication');

//POST request to authenticate user
router.post(
    '/login',
    validator.login_validation,
    authentication.authenticate_local
);

//POST request to register user
router.post('/register', validator.register_validation, Contoller.register);

module.exports = router;
