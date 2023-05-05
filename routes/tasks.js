let express = require("express");
let router = express.Router();

const { getTaskInfo } = require("../business/task");


router.get('/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await getTaskInfo(taskId);

        console.log(task)

        if (!task) {
            return res.status(HTTP_NOT_FOUND).send("Task not found.");
        }

        return res.json(task);

    } catch (e) {
        console.log(e);
    }
})

module.exports = router;