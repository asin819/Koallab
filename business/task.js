const { Task } = require("../models/task");
const { ProjectTask } = require("../models/project-task");


const getTaskInfo = async (taskId) => {
    return await Task.findOne({ taskid: taskId });
}

const getTaskListFromProject = async (projectId) => {
    const taskRef = await ProjectTask.find({ projectid: projectId });
    const taskIds = taskRef.map(thisTask => thisTask.taskid);

    return await Task.find({ taskid: { $in: taskIds } });
}

const getTaskListFromUser = async (userId) => {
    return await Task.find({ executorid: userId });
}

module.exports = {
    getTaskInfo,
    getTaskListFromProject,
    getTaskListFromUser
};
