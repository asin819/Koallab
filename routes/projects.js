let express = require('express');
let router = express.Router();

let project = require('../business/project');

/**
 * Create a new project
 */ 
router.post('/newProject',project.newProject);

/**
 * Close a project
 */ 
router.get('/closeProject',project.closeProject);

/**
 * Restart a project
 */ 
router.post('/restartProject',project.restartProject);

/**
 * Modify project information
 */ 
router.post('/modifyProjectInfo',project.modifyProjectInfo);

/**
 * Add a new user to a project
 */ 
router.post('/addUserToProject',project.addUserToProject);

/**
 * Remove a user to a project
 */ 
router.post('/removeUserFromProject',project.removeUserFromProject);

/**
 * Modify a member role in a project
 */ 
router.post('/modifyUserRoleInProject',project.modifyUserRoleInProject);

/**
 * Get a project's information
 */ 
router.get('/getProjectInfo',project.getProjectInfo);

/**
 * Get all projects that user has created
 */ 
router.get('/getMyCreatedProjectList',project.getMyCreatedProjectList);

/**
 * Get all projects that user has participated
 */ 
router.get('/getMyParticipatedProjectList',project.getMyParticipatedProjectList);

module.exports = router;