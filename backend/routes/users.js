let express = require('express');
let router = express.Router();

let user = require('../business/user');

/**
 * GET user information.
 */ 
router.get('/getUserInfo',user.getUserInfo);

/**
 * GET user id.
 */ 
router.get('/getUserid',user.getUserid);

/**
 * GET group id.
 */ 
router.get('/getGroupId',user.getGroupId);

/**
 * GET group id.
 */ 
router.get('/getUserRoleInGroup',user.getUserRoleInGroup);

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
router.get('/getGroupUserList', user.getGroupUserList);

/**
 * get user information from project
 */
router.get('/getProjectUserList', user.getProjectUserList);

/**
 * Get all user information
 */
router.get('/getAllUserList', user.getAllUserList);

/**
 * Get user information from project
 */
router.get('/getProjectUserList', user.getProjectUserList);

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
