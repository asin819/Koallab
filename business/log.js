const { User } = require("../models/user");
const { TaskLog } = require("../models/log");

let base = require('../bin/base');

const createLog = async (taskId, content, adderToken) => {
    const adderId = await getAdderId(adderToken);
    const logId = base.getObjectId();

    const newLog = new TaskLog({
        logid: logId,
        taskid: taskId,
        content,
        adderid: adderId
    })

    return await newLog.save();
}

const getLog = async (logId) => {
    return await TaskLog.findOne({ logid: logId });
}

const modifyLog = async (logId, content) => {
    const modifiedLog = await TaskLog.findOne({ logid: logId });

    modifiedLog.content = content;

    return await modifiedLog.save();
}

const deleteLog = async (logId) => {
    return await TaskLog.findOneAndDelete({ logid: logId });
}

const getLogListFromTask = async (taskId) => {
    return await TaskLog.find({ taskid: taskId });
}



module.exports = {
    createLog,
    getLog,
    modifyLog,
    deleteLog,
    getLogListFromTask
};


const getAdderId = async (adderToken) => {
    try {
        const adder = await User.findOne({ authorizationtoken: adderToken });
        return adder.userid;
    } catch (err) {
        console.error(err.message);
        throw new Error('Error while fetching the adder id');
    }
};


