let express = require("express");
let router = express.Router();

const { createLog,
    getLog,
    modifyLog,
    deleteLog,
    getLogListFromTask
} = require("../business/log");

router.post('/logs', async (req, res) => {
    const { taskid, content, token } = req.body;

    try {
        const log = await createLog(taskid, content, token);

        return res.status(200).json(log.logid);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error creating Log.' });
    }
})

router.get('/logs', async (req, res) => {
    const logId = req.body.logId;

    try {
        const log = await getLog(logId);

        if (!log) {
            return res.status(HTTP_NOT_FOUND).send("Log not found.");
        }

        return res.status(200).json(log);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching log from ID.' });
    }
})

router.post('/logs/:logId', async (req, res) => {
    const logId = req.params.logId;
    const { content } = req.body;

    try {
        const log = await modifyLog(logId, content);

        if (!log) {
            return res.status(HTTP_NOT_FOUND).send("Log not found.");
        }

        return res.status(200).json(log.logid);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching log from ID.' });
    }
})

router.delete('/logs/:logId', async (req, res) => {
    const logId = req.params.logId;

    try {
        const log = await deleteLog(logId);

        if (!log) {
            return res.status(HTTP_NOT_FOUND).send("Log not found.");
        }

        return res.status(200).json({ message: 'Log deleted successfully' });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching log from ID.' });
    }
})

router.get('/logs/task', async (req, res) => {
    const taskId = req.query.taskId;

    try {
        const logs = await getLogListFromTask(taskId);

        if (!logs) {
            return res.status(HTTP_NOT_FOUND).send("Tasks for the given project ID not found.");
        }

        return res.status(200).json(logs);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching task list by user ID.' });
    }
})


module.exports = router;