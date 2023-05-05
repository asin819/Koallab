let express = require("express");
let router = express.Router();

const { getTaskInfo,
    getTaskListFromProject,
    getTaskListFromUser,
    addTaskToProject,
    deleteTaskFromProject
} = require("../business/task");


router.get('/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const task = await getTaskInfo(taskId);

        if (!task) {
            return res.status(HTTP_NOT_FOUND).send("Task not found.");
        }

        return res.status(200).json(task);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching task from ID.' });
    }
})

router.get('/tasks/project/:projectId', async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const tasks = await getTaskListFromProject(projectId);

        if (!tasks) {
            return res.status(HTTP_NOT_FOUND).send("Tasks for the given project ID not found.");
        }

        return res.status(200).json(tasks);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching task list from project.' });
    }
})

router.get('/tasks/user/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const tasks = await getTaskListFromUser(userId);


        if (!tasks) {
            return res.status(HTTP_NOT_FOUND).send("Tasks for the given project ID not found.");
        }

        return res.status(200).json(tasks);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching task list by user ID.' });
    }
})

router.post('/projects/tasks', async (req, res) => {
    const { taskId, projectId, token } = req.body;

    try {
        const task = await addTaskToProject(taskId, projectId, token);

        return res.status(200).json(task.taskid);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error adding task.' });
    }
})

router.delete('/projects/tasks', async (req, res) => {
    const projectId = req.body.projectId;
    const taskId = req.body.taskId;

    try {
        const log = await deleteTaskFromProject(taskId, projectId);

        if (!log) {
            return res.status(HTTP_NOT_FOUND).send("Log not found.");
        }

        return res.status(200).json({ message: 'Log deleted successfully' });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching log from ID.' });
    }
})

module.exports = router;