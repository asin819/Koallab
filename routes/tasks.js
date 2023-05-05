let express = require("express");
let router = express.Router();

const { getTaskInfo,
    getTaskListFromProject,
    getTaskListFromUser
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

module.exports = router;