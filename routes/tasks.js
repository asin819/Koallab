let express = require('express');
let router = express.Router();

let task = require('../business/task');

/**
 * Create a new task
 */ 
router.post('/newTask',task.newTask);

/**
 * Modify task information
 */ 
router.post('/modifyTaskInfo',task.modifyTaskInfo);

/**
 * Change task status
 */ 
router.post('/changeProjectStatus',task.changeProjectStatus);

module.exports = router;