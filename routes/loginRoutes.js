const express = require('express');
const router = express.Router();
const loginController = require('../contorllers/loginController');

router.post('/login', loginController.loginUser);

module.exports = router;