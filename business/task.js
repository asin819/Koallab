const { Task } = require("../models/task");
const { User } = require("../models/user");
const { ProjectTask } = require("../models/project-task");


const getTaskInfo = async (taskId) => {
    return await Task.findOne({ taskid: taskId });
}

const getTasksFromProject = async (projectId) => {
    const taskRef = await ProjectTask.find({ projectid: projectId });
    const taskIds = taskRef.map(thisTask => thisTask.taskid);

    return await Task.find({ taskid: { $in: taskIds } });
}

const getTasksFromUser = async (userId) => {
    return await Task.find({ executorid: userId });
}

const addTaskToProject = async (taskId, projectId, adderToken) => {
    const adderId = await getAdderId(adderToken);

    const newTaskRef = new ProjectTask({
        projectid: projectId,
        taskid: taskId,
        adderid: adderId
    })

    return await newTaskRef.save();
}

const deleteTaskFromProject = async (taskId, projectId) => {
    console.log(taskId);
    console.log(projectId);
    return await ProjectTask.findOneAndDelete({
        projectid: projectId,
        taskid: taskId
    });
}

module.exports = {
    getTaskInfo,
    getTasksFromProject,
    getTasksFromUser,
    addTaskToProject,
    deleteTaskFromProject
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