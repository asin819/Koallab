let express = require('express');
let router = express.Router();

let group = require('../business/group');

/**
 * GET the list of groups the user has created.
 */ 
router.get('/getMyCreatedGroupList',group.getMyCreatedGroupList);

/**
 * GET the list of groups the user has participated in.
 */ 
router.get('/getMyParticipatedGroupList',group.getMyParticipatedGroupList);

module.exports = router;
