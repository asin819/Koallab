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

/**
 * Modificate user information
 */
router.post('/modifyUserInfo', user.modifyUserInfo);

/**
 * Logout
 */
router.post('/logout', user.logout);

/**
 * Delete user from database
 */
router.post('/deleteUser', user.deleteUser);

/**
 * Get user information from group
 */
router.post('/getGroupUserList', user.getGroupUserList);

/**
 * Get user information from project
 */
router.post('/getProjectUserList', user.getProjectUserList);

/**
 * Create a new group
 */
router.post('/newGroup', user.newGroup);

/**
 * Disband a group
 */
router.post('/disbandGroup', user.disbandGroup);

/**
 * Modify group information
 */
router.post('/modifyGroupInfo', user.modifyGroupInfo);

/**
 * add a user to group
 */
router.post('/addUserToGroup', user.addUserToGroup);

/**
 * remove user from group
 */
router.post('/removeUserFromGroup', user.removeUserFromGroup);

/**
 * modify user role from group
 */
router.post('/modifyUserRoleFromGroup', user.modifyUserRoleFromGroup);

/**
 * get group information
 */
router.get('/getGroupInfo', user.getGroupInfo);

module.exports = router;
