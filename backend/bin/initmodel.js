
let mongoose = require("mongoose");

// const promiseUtil = require('../bin/promiseUtil');
// const {promiseDbMethodWrapper} = promiseUtil;

/**
 * only initialize model when model is not initialized
 */
if (!global.db.modUser) {

    //user: userid, email, password, registrationtime, userstatus (normal, deleted)| username, photo (Base64 format), authorizationtoken, authorizationgenerationtime, authorizationvalidityexpirationdate
    let schUser = new mongoose.Schema({
        "userid":{type: String, default: ''},
        "email":{type: String, default: ''},
        "password":{type: String, default: ''},
        "registrationtime":{type: Date, default: Date.now},
        "userstatus":{type: String, default: ''},
        "username":{type: String, default: ''},
        "photo":{type: String, default: ''},
        "authorizationtoken":{type: String, default: ''},
        "authorizationgenerationtime":{type: Date, default: Date.now},
        "authorizationvalidityexpirationdate":{type: Date, default: Date.now}
    })

    global.db.modUser = db.model("user",schUser);

    //group: groupid, groupname, creatorid, creationtime, groupstatus (normal, disbanded)
    let schGroup = new mongoose.Schema({
        "groupid":{type: String, default: ''},
        "groupname":{type: String, default: ''},
        "creatorid":{type: String, default: ''},
        "creationtime":{type: Date, default: Date.now},
        "groupstatus":{type: String, default: ''}
    })

    global.db.modGroup = db.model("group",schGroup);

    //Group_User_Relationship: groupid, userid, role (administrator, member), jointime
    let schGroup_User_Relationship = new mongoose.Schema({
        "groupid":{type: String, default: ''},
        "userid":{type: String, default: ''},
        "role":{type: String, default: ''},
        "jointime":{type: Date, default: Date.now}
    })

    global.db.modGroup_User_Relationship = db.model("group_user_relationship",schGroup_User_Relationship);

    //Project: projectid, projectname, creatorid, creationtime, projectstatus (normal, closed)|Startime, endtime
    let schProject = new mongoose.Schema({
        "projectid":{type: String, default: ''},
        "projectname":{type: String, default: ''},
        "creatorid":{type: String, default: ''},
        "creationtime":{type: Date, default: Date.now},
        "projectstatus":{type: String, default: ''},
        "Startime":{type: Date, default: Date.now},
        "endtime":{type: Date, default: null},
    })

    global.db.modProject = db.model("project",schProject);

    //Project_User_Relationship: projectid, userid, role (administrator, member), jointime
    let schProject_User_Relationship = new mongoose.Schema({
        "projectid":{type: String, default: ''},
        "userid":{type: String, default: ''},
        "role":{type: String, default: ''},
        "jointime":{type: Date, default: Date.now}
    })

    global.db.modProject_User_Relationship = db.model("project_user_relationship",schProject_User_Relationship);

    //Project_Resource_Table: resourceid, projectid, resourcetype (video, audio, image, file), file (Base64)
    let schProject_Resource_Table = new mongoose.Schema({
        "resourceid":{type: String, default: ''},
        "projectid":{type: String, default: ''},
        "resourcetype":{type: String, default: ''},
        "file":{type: String, default: ''}
    })

    global.db.modProject_Resource_Table = db.model("project_resource_table",schProject_Resource_Table);

    //task: taskid, tasktitle, taskdescription, creatorid, executorid, taskstatus (new, executing, completed, accepted, obsolete), parentaskid | estimatedtime (how many hours), importance (Non-Important, Important, Average), tasklabel (array)
    let schTask = new mongoose.Schema({
        "taskid":{type: String, default: ''},
        "tasktitle":{type: String, default: ''},
        "taskdescription":{type: String, default: ''},
        "creatorid":{type: String, default: ''},
        "executorid":{type: String, default: ''},
        "taskstatus":{type: String, default: ''},
        "parentaskid":{type: String, default: ''},
        "estimatedtime":{type: Number, default: 0},
        "importance":{type: String, default: ''},
        "tasklabel":{type: Array, default: []}
    })

    global.db.modTask = db.model("task",schTask);

    //Task_Log: logid, taskid, content, addtime, adderid
    let schTask_Log = new mongoose.Schema({
        "logid":{type: String, default: ''},
        "taskid":{type: String, default: ''},
        "content":{type: String, default: ''},
        "addtime":{type: Date, default: Date.now},
        "adderid":{type: String, default: ''}
    })

    global.db.modTask_Log = db.model("task_log",schTask_Log);

    //Project_Task_Relationship: projectid, taskid, addtime, adderid
    let schProject_Task_Relationship = new mongoose.Schema({
        "projectid":{type: String, default: ''},
        "taskid":{type: String, default: ''},
        "addtime":{type: Date, default: Date.now},
        "adderid":{type: String, default: ''}
    })

    global.db.modProject_Task_Relationship = db.model("project_task_relationship",schProject_Task_Relationship);

    console.log("initialize model done!");

    // [
    //     global.db.modUser,
    //     global.db.modGroup,
    // ].forEach(modal => {
    //     promiseDbMethodWrapper(modal);
    // });

    // console.log("packed find and findOne to Promise!");
}