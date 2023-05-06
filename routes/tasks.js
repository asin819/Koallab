let express = require("express");
let router = express.Router();

const {
    createTask,
    modifyTask,
    modifyTaskStatus,
    getTaskInfo,
    getTasksFromProject,
    getTasksFromUser,
    addTaskToProject,
    deleteTaskFromProject
} = require("../business/task");

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_ERROR = 500;

/**
 * 28. Create new task:
 * 
 * @param {*} req
 * @param {*} req.body => task data fields
 * @param {String} req.body.token => Used to query adderId
 * 
 * @param {*} res => created log Id 
 * 
 */
router.post('/tasks', async (req, res) => {
    const taskContent = {
        taskTitle: req.body.taskTitle,
        taskDescription: req.body.taskDescription,
        executorId: req.body.executorId,
        taskStatus: req.body.taskStatus,
        parentTaskId: req.body.parentTaskId,
        estimatedTime: req.body.estimatedTime,
        importance: req.body.importance,
        taskLabel: req.body.taskLabel
    };
    const { token } = req.body;

    try {
        const newTask = await createTask(taskContent, token);

        return res.status(HTTP_CREATED).json({ message: `Task ${newTask.taskid} created`, taskId: newTask.taskid });
    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error creating Task.' });
    }
})

/**
 * 29. Modify task information (title, description, estimated time, importance, task label):
 * 
 * @param {*} req
 * @param {String} req.body.taskId
 * @param {*} req.body => task data fields
 * 
 * @param {*} res
 * 
 */
router.put('/tasks', async (req, res) => {
    const taskContent = {
        taskTitle: req.body.taskTitle,
        taskDescription: req.body.taskDescription,
        estimatedTime: req.body.estimatedTime,
        importance: req.body.importance,
        taskLabel: req.body.taskLabel
    };
    const { taskId } = req.body;

    try {
        const newTask = await modifyTask(taskId, taskContent);

        if (!newTask) {
            return res.status(HTTP_NOT_FOUND).send("Task not found.");
        }

        return res.status(HTTP_OK).json({ message: `Task ${newTask.taskid} modified` });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error modifying task.' });
    }
})

/**
 * 30. Change task status:
 * 
 * @param {*} req
 * @param {String} req.body.taskId
 * @param {String} req.body.taskStatus
 *      enum: ['new', 'executing', 'completed', 'accepted', 'obsolete']
 * 
 * @param {*} res
 * 
 */
router.put('/tasks/status', async (req, res) => {

    const { taskStatus, taskId } = req.body;

    try {
        const newTask = await modifyTaskStatus(taskId, taskStatus);

        if (!newTask) {
            return res.status(HTTP_NOT_FOUND).send("Task not found.");
        }

        return res.status(HTTP_OK).json({ message: `Status of task ${newTask.taskid} modified` });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error modifying task.' });
    }
})

/**
 * 31. Query the detailed information of a specified task:
 * 
 * @param {*} req 
 * @param {*} req.query.taskId
 * 
 * @param {*} res => Task object 
 * 
 */
router.get('/tasks', async (req, res) => {
    const taskId = req.query.taskId;

    try {
        const task = await getTaskInfo(taskId);

        if (!task) {
            return res.status(HTTP_NOT_FOUND).send("Task not found.");
        }

        return res.status(HTTP_OK).json({ message: 'Done', task });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error fetching task from ID.' });
    }
})

/**
 * 32. Query the task list of the specified project:
 * 
 * @param {*} req
 * @param {String} req.query.projectId
 * 
 * @param {*} res => Task object list
 * 
 */
router.get('/tasks/project', async (req, res) => {
    const projectId = req.query.projectId;

    try {
        const tasks = await getTasksFromProject(projectId);

        if (!tasks) {
            return res.status(HTTP_NOT_FOUND).send("Tasks for the given Project not found.");
        }

        return res.status(HTTP_OK).json({ message: 'Done', tasks });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error fetching task list from project.' });
    }
})

/**
 * 33. Query the list of tasks in which the specified person is involved:
 * 
 * @param {*} req
 * @param {String} req.query.userId
 * 
 * @param {*} res => Task object list
 * 
 */
router.get('/tasks/user', async (req, res) => {
    const userId = req.query.userId;

    try {
        const tasks = await getTasksFromUser(userId);

        if (!tasks) {
            return res.status(HTTP_NOT_FOUND).send("Tasks for the given User not found.");
        }

        return res.status(HTTP_OK).json({ message: 'Done', tasks });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error fetching task list by user.' });
    }
})

/**
 * 39. Add a task to the project:
 * 
 * @param {*} req
 * @param {String} req.body.taskId
 * @param {String} req.body.projectId
 * @param {String} req.body.token => Used to query adderId
 * 
 * @param {*} res
 * 
 */
router.post('/projects/tasks', async (req, res) => {
    const { taskId, projectId, token } = req.body;

    try {
        const taskRef = await addTaskToProject(taskId, projectId, token);

        return res.status(HTTP_CREATED).json({ message: `Task ${taskRef.taskid} add in project ${taskRef.projectid} by User ${taskRef.adderid}` });
    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error adding task.' });
    }
})

/**
 * 40. Remove Task from Project:
 * 
 * @param {*} req
 * @param {String} req.body.taskId
 * @param {String} req.body.projectId
 * 
 * @param {*} res
 * 
 */
router.delete('/projects/tasks', async (req, res) => {
    const projectId = req.body.projectId;
    const taskId = req.body.taskId;

    try {
        const taskRef = await deleteTaskFromProject(taskId, projectId);

        return res.status(HTTP_OK).json({ message: `Task deleted from project ${taskRef.projectid} successfully` });
    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error fetching log from ID.' });
    }
})


// let express = require('express');
// let router = express.Router();

// let task = require('../business/task');

// /**
//  * Create a new task
//  */ 
// router.post('/newTask',task.newTask);

// /**
//  * Modify task information
//  */ 
// router.post('/modifyTaskInfo',task.modifyTaskInfo);

// /**
//  * Change task status
//  */ 
// router.post('/changeProjectStatus',task.changeProjectStatus);

module.exports = router;