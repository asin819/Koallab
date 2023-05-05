const { Task } = require("../models/task");


const getTaskInfo = async (taskId) => {
    return await Task.findOne({ taskid: taskId });
}

module.exports = {
    getTaskInfo
};
