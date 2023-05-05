let express = require("express");
let router = express.Router();

const { createLog } = require("../business/log");

router.post('/logs', async (req, res) => {
    const { taskid, content, token } = req.body;

    try {
        const log = await createLog(taskid, content, token);

        if (!log) {
            return res.status(HTTP_NOT_FOUND).send("Task not found.");
        }

        return res.status(200).json(log.logid);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error fetching task from ID.' });
    }
})

module.exports = router;