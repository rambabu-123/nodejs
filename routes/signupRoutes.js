const express = require('express');
const router = express.Router();
const signupController = require('../contorllers/signupController');

router.post('/signup', signupController.createusers);
console.log(signupController.createusers); // Should show the function definition
module.exports = router;
