const express = require('express');
const router = express.Router();

const validator = require('../middleware/validation');
const Contoller = require('../controllers/user');

//POST request to authenticate user
router.post('/login', () => {
    //Controller to authenticate user
});

//POST request to register user
router.post('/register', validator.register_validation, Contoller.register);

module.exports = router;
