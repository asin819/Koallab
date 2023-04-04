let express = require('express');
let router = express.Router();

let user = require('../business/user');

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
