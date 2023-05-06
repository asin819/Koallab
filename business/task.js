const { Task } = require("../models/task");
const { User } = require("../models/user");
const { ProjectTask } = require("../models/project-task");

let base = require('../bin/base');

const createTask = async (task, adderToken) => {
    const adderId = await getAdderId(adderToken);
    const taskId = base.getObjectId();

    const newTask = new Task({
        taskid: taskId,
        tasktitle: task.taskTitle,
        taskdescription: task.taskDescription,
        creatorid: adderId,
        executorid: task.executorId,
        taskstatus: task.taskStatus,
        parenttaskid: task.parentTaskId,
        estimatedtime: task.estimatedTime,
        importance: task.importance,
        tasklabel: task.taskLabel
    });

    return await newTask.save();
}

const modifyTask = async (taskId, task) => {
    const modifiedTask = await Task.findOne({ taskid: taskId });

    modifiedTask.tasktitle =  task.taskTitle;
    modifiedTask.taskdescription =  task.taskDescription;
    modifiedTask.estimatedtime =  task.estimatedTime;
    modifiedTask.importance =  task.importance;
    modifiedTask.tasklabel =  task.taskLabel;

    return await modifiedTask.save();
}

const modifyTaskStatus = async (taskId, taskstatus) => {
    const modifiedTask = await Task.findOne({ taskid: taskId });

    modifiedTask.taskstatus =  taskstatus;

    return await modifiedTask.save();
}

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
    return await ProjectTask.findOneAndDelete({
        projectid: projectId,
        taskid: taskId
    });
}

module.exports = {
    createTask,
    modifyTask,
    modifyTaskStatus,
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
}   
//let base = require('../bin/base');

// /**
//  * creates a new task
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// this.newTask = async function (req, res, next) {
//     try {
//         let tasktitle = req.body.tasktitle;
//         let taskdescription = req.body.taskdescription;
//         let executorid = req.body.executorid;
//         let taskstatus = req.body.taskstatus;
//         let parentaskid = req.body.parentaskid;
//         let estimatedtime = req.body.estimatedtime;
//         let importance = req.body.importance;
//         let tasklabel = req.body.tasklabel;
//         if (tasktitle != null & tasktitle != "") {
//             if (taskdescription != null & taskdescription != "") {
//                 if (executorid != null & executorid != "") {
//                     if (taskstatus != null & taskstatus != "") {
//                         if (parentaskid != null & parentaskid != "") {
//                             if (importance != null & importance != "") {
//                                 if (tasklabel != null & tasklabel != "") {
//                                     if (estimatedtime == null || estimatedtime == "") {
//                                         startime = 0;
//                                     }
        
//                                     await global.db.modUser.find({"authorizationtoken":userToken}).then(async (docs) => {
//                                         let creatoridFromDB = docs[0].userid;
//                                         let myTasks = [
//                                             { "taskid": base.getObjectId(), "tasktitle": tasktitle, "taskdescription": taskdescription, "creatorid": creatoridFromDB, "executorid": executorid, "taskstatus": taskstatus, "parentaskid": parentaskid, "estimatedtime": estimatedtime, "importance": importance, "tasklabel": tasklabel,},
//                                         ];
//                                         await global.db.modTask.insertMany(myTasks).then((docs) => {
//                                             if (docs.length > 0) {
//                                                 res.end(base.mkBizMsg("success", "task created!"));
//                                             } else {
//                                                 throw new Error("Add task data into database failed");
//                                             }
//                                         });
//                                     });
            
//                                 } else {
//                                     throw new Error("Please provide a valid task label");
//                                 }
//                             } else {
//                                 throw new Error("Please provide a valid importance");
//                             }           
//                         } else {
//                             throw new Error("Please provide a valid parent task id");
//                         }
//                     } else {
//                         throw new Error("Please provide a valid task status");
//                     }
//                 } else {
//                     throw new Error("Please provide a valid executorid");
//                 }
//             } else {
//                 throw new Error("Please provide a valid task description");
//             }
//         } else {
//             throw new Error("Please provide a valid task title");
//         }
//     } catch (e) {
//         console.log(e);
//         res.end(base.mkBizMsg("fail", e.message ? e.message : e));
//     }
// };

// /**
//  * modifies a task (title, description, estimated time, importance, task label)
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// this.modifyTaskInfo = async function (req, res, next) {
//     try {
//         let taskid = req.body.taskid;
//         let tasktitle = req.body.tasktitle;
//         let taskdescription = req.body.taskdescription;
//         let executorid = req.body.executorid;
//         let taskstatus = req.body.taskstatus;
//         let parentaskid = req.body.parentaskid;
//         let estimatedtime = req.body.estimatedtime;
//         let importance = req.body.importance;
//         let tasklabel = req.body.tasklabel;
//         if (taskid != null & taskid != "") {
//             await global.db.modProject.find({"taskid":taskid}).then(async (docs) => {
//                 let objToUpdate = {};
//                 if (docs.length > 0 && docs[0]!=null) {
//                     if(tasktitle != null & tasktitle != ""){
//                         objToUpdate.tasktitle = tasktitle;
//                     }
//                     if(taskdescription != null & taskdescription != ""){
//                         objToUpdate.taskdescription = taskdescription;
//                     }
//                     if(executorid != null & executorid != ""){
//                         objToUpdate.executorid = executorid;
//                     }
//                     if(taskstatus != null & taskstatus != ""){
//                         objToUpdate.taskstatus = taskstatus;
//                     }
//                     if(parentaskid != null & parentaskid != ""){
//                         objToUpdate.parentaskid = parentaskid;
//                     }
//                     if(estimatedtime != null & estimatedtime != ""){
//                         objToUpdate.estimatedtime = estimatedtime;
//                     }
//                     if(importance != null & importance != ""){
//                         objToUpdate.importance = importance;
//                     }
//                     if(tasklabel != null & tasklabel != ""){
//                         objToUpdate.tasklabel = tasklabel;
//                     }
//                     await global.db.modProject.updateMany({"taskid":taskid},
//                         objToUpdate
//                     ).then(async (docs) => {
//                         res.end(base.mkBizMsg("success", "task is modified!"));
//                     });
//                 } else {
//                     throw new Error("Task id does not exist");
//                 }
//             });
//         } else {
//             throw new Error("Please provide a valid task id");
//         }
//     } catch (e) {
//         console.log(e);
//         res.end(base.mkBizMsg("fail", e.message ? e.message : e));
//     }
// };

// /**
//  * changes the status of a task
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// this.changeProjectStatus = async function (req, res, next) {
//     try {
//         let taskid = req.body.taskid;
//         let taskstatus = req.body.taskstatus;
//         if (taskid != null & taskid != "") {
//             await global.db.modTask.find({"taskid":taskid}).then(async (docs) => {
//                 if (docs.length > 0 && docs[0]!=null) {
//                     await global.db.modTask.updateMany({"taskid":taskid},{
//                         "taskstatus":taskstatus,
//                     }).then(async (docs) => {
//                         res.end(base.mkBizMsg("success", "task status has been changed!"));
//                     });
//                 } else {
//                     throw new Error("Task id does not exist");
//                 }
//             });
//         } else {
//             throw new Error("Please provide a valid task id");
//         }
//     } catch (e) {
//         console.log(e);
//         res.end(base.mkBizMsg("fail", e.message ? e.message : e));
//     }
// };