const express = require('express');
const router = express.Router();

const validator = require('../middleware/validation');

//POST request to authenticate user
router.post('/login', () => {
    //Controller to authenticate user
});

//POST request to register user
router.post('/register', validator.register_validation);

module.exports = router;
