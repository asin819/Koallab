let express = require('express');
let router = express.Router();

let task = require('../business/task_ares');

router.get('/getTaskInfo',task.getTaskInfo);

router.get('/getTaskListFromProject', task.getTaskListFromProject);

router.get('/getTaskListByUserid',task.getTaskListByUserid);

router.post('/addLog',task.addLog);

router.post('/modifyLogContent',task.modifyLogContent);

router.post('/deleteLog',task.deleteLog);

router.get('/getLogInfo',task.getLogInfo);

router.get('/getlogListFromTask',task.getlogListFromTask);

router.post('/addTaskToProject',task.addTaskToProject);

router.post('/deleteTaskFromProject',task.deleteTaskFromProject);

router.post('/modifyUserPhoto',task.modifyUserPhoto);

router.post('/modifyLogContent',task.modifyLogContent);

router.post('/upload',task.upload);

router.get('/download',task.download);

router.post('/deleteResource',task.deleteResource);

router.get('/getResourceListFromProject',task.getResourceListFromProject);

module.exports = router;
