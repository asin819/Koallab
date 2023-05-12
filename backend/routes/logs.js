let express = require("express");
let router = express.Router();

const { createLog,
    getLog,
    modifyLog,
    deleteLog,
    getLogListFromTask
} = require("../business/log");

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_ERROR = 500;

/**
 * 34. Add Log:
 * 
 * @param {*} req
 * @param {String} req.body.taskId
 * @param {String} req.body.content
 * @param {String} req.body.token => Used to query adderId
 * 
 * @param {*} res => created log Id 
 * 
 */
router.post('/logs', async (req, res) => {
    const { taskId, content, token } = req.body;

    try {
        const log = await createLog(taskId, content, token);

        return res.status(HTTP_CREATED).json({ message: `Log ${log.logid} created`, logId: log.logid });
    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error creating Log.' });
    }
})

/**
 * 37. Query the details of the specified log:
 * 
 * @param {*} req
 * @param {String} req.body.logId
 * 
 * @param {*} res => Log object 
 * 
 */
router.get('/logs', async (req, res) => {
    const logId = req.body.logId;

    try {
        const log = await getLog(logId);

        if (!log) {
            return res.status(HTTP_NOT_FOUND).send("Log not found.");
        }

        return res.status(HTTP_OK).json({ message: 'Done', log });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error fetching log from ID.' });
    }
})

/**
 * 35. Modify log content:
 * 
 * @param {*} req
 * @param {String} req.body.logId
 * @param {String} req.body.content
 * 
 * @param {*} res
 * 
 */
router.put('/logs', async (req, res) => {
    const { content, logId } = req.body;

    try {
        const log = await modifyLog(logId, content);

        if (!log) {
            return res.status(HTTP_NOT_FOUND).send("Log not found.");
        }

        return res.status(HTTP_OK).json({ message: `Log ${log.logid} modified` });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error modifying log.' });
    }
})

/**
 * 36. Delete Log:
 * 
 * @param {*} req
 * @param {String} req.body.logId
 * 
 * @param {*} res
 * 
 */
router.delete('/logs', async (req, res) => {
    const logId = req.body.logId;

    try {
        const log = await deleteLog(logId);

        if (!log) {
            return res.status(HTTP_NOT_FOUND).send("Log not found.");
        }

        return res.status(HTTP_OK).json({ message: 'Log deleted successfully' });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error deleting log.' });
    }
})

/**
 * 38. Query the log list of the specified task:
 * 
 * @param {*} req
 * @param {String} req.body.taskId
 * 
 * @param {*} res
 * 
 */
router.get('/logs/task', async (req, res) => {
    const taskId = req.query.taskId;

    try {
        const logs = await getLogListFromTask(taskId);

        if (!logs) {
            return res.status(HTTP_NOT_FOUND).send("Logs for the given task not found.");
        }

        return res.status(HTTP_OK).json({ message: 'Done', logs });

    } catch (e) {
        console.log(e);
        return res.status(HTTP_ERROR).json({ message: 'Error fetching log list by task.' });
    }
})


module.exports = router;