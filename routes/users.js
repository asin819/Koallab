var express = require('express');
var router = express.Router();

var user = require('../business/user');

/**
 * GET user information.
 */ 
router.get('/getUserInfo',user.getUserInfo);

/**
 * validate user email and password
 */
router.post('/login', user.login);

/**
 * Register a new user
 */
router.post('/register', user.register);


module.exports = router;
