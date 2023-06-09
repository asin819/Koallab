let base = require('./base');
let mongoose = require("mongoose");
let mongoHost = "127.0.0.1:27017";
let database = "khakikoalasdb";

let uri = "mongodb://" + mongoHost + "/" + database;

// mongoose.Promise = global.Promise;

/**
 * Initialize system basic data
 * 
 * userid generated by base.getObjectId()
 * groupid generated by base.getObjectId()
 * projectid generated by base.getObjectId()
 * resourceid generated by base.getObjectId()
 * taskid generated by base.getObjectId()
 * logid generated by base.getObjectId()
 */
let init = async function () {

    //user: userid, email, password, registrationtime, userstatus (normal, deleted)| username, photo (Base64 format), authorizationtoken, authorizationgenerationtime, authorizationvalidityexpirationdate
    let myUsers = [
        { "userid": "0001", "email": "syan408@aucklanduni.ac.nz", "password": "123", "userstatus": "normal", "username": "syan408", "photo": "", "authorizationtoken": "", },
    ];
    await global.db.modUser.insertMany(myUsers).then((docs) => {
        console.log("Initialize user list:" + docs.length);
    });

    //group: groupid, groupname, creatorid, creationtime, groupstatus (normal, disbanded)
    let myGroups = [
        { "groupid": "000001", "groupname": "Front-end Group", "creatorid": "0001", "groupstatus": "normal" },
        { "groupid": "000002", "groupname": "Back-end Group", "creatorid": "0001", "groupstatus": "normal" },
    ];
    await global.db.modGroup.insertMany(myGroups).then((docs) => {
        console.log("Initialize group list:" + docs.length);
    });

    //Group_User_Relationship: groupid, userid, role (administrator, member), jointime
    let myGroup_User_Relationships = [
        { "groupid": "000002", "userid": "0001", "role": "administrator" }
    ];
    await global.db.modGroup_User_Relationship.insertMany(myGroup_User_Relationships).then((docs) => {
        console.log("Initialize Group_User_Relationship list:" + docs.length);
    });

    //Project: projectid, projectname, creatorid, creationtime, projectstatus (normal, closed)|Startime, endtime
    let myProjects = [
        { "projectid": "00000001", "projectname": "Khaki Koalas", "creatorid": "0001", "projectstatus": "normal" }
    ];
    await global.db.modProject.insertMany(myProjects).then((docs) => {
        console.log("Initialize Project list:" + docs.length);
    });

    //Project_User_Relationship: projectid, userid, role (administrator, member), jointime
    let myProject_User_Relationships = [
        { "projectid": "00000001", "userid": "0001", "role": "administrator" }
    ];
    await global.db.modProject_User_Relationship.insertMany(myProject_User_Relationships).then((docs) => {
        console.log("Initialize Project_User_Relationship list:" + docs.length);
    });

    //Project_Resource_Table: resourceid, projectid, resourcetype (video, audio, image, file), file (Base64)
    let myProject_Resource_Tables = [
        { "resourceid": "0000000001", "projectid": "00000001", "resourcetype": "image", "file": "data:image/jpeg;base64,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" }
    ];
    await global.db.modProject_Resource_Table.insertMany(myProject_Resource_Tables).then((docs) => {
        console.log("Initialize Project_Resource_Table list:" + docs.length);
    });

    //task: taskid, tasktitle, taskdescription, creatorid, executorid, taskstatus (new, executing, completed, accepted, obsolete), parentaskid | estimatedtime (how many hours), importance (Non-Important, Important, Average), tasklabel (array)
    let myTasks = [
        { "taskid": "0000000000000001", "tasktitle": "Back-end development task division", "taskdescription": "Tasks need to be divided up according to the interface documentation, making it clear which interfaces each person needs to complete for development.", "creatorid": "0001", "executorid": "0001", "taskstatus": "new", "parentaskid": "", "estimatedtime": 8, "importance": "Important", "tasklabel": ["Back-end", "development", "task division"] }
    ];
    await global.db.modTask.insertMany(myTasks).then((docs) => {
        console.log("Initialize myTasks list:" + docs.length);
    });

    //Task_Log: logid, taskid, content, addtime, adderid
    let myTask_Logs = [
        { "logid": "00000000000000000001", "taskid": "0000000000000001", "content": "Create new task", "adderid": "0001" }
    ];
    await global.db.modTask_Log.insertMany(myTask_Logs).then((docs) => {
        console.log("Initialize Task_Log list:" + docs.length);
    });

    //Project_Task_Relationship: projectid, taskid, addtime, adderid
    let myProject_Task_Relationships = [
        { "projectid": "00000001", "taskid": "0000000000000001", "adderid": "0001" }
    ];
    await global.db.modProject_Task_Relationship.insertMany(myProject_Task_Relationships).then((docs) => {
        console.log("Initialize Project_Task_Relationship list:" + docs.length);
    });
};

let createdb = async function(){
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
        // useMongoClient: true
        /*,
        user: "",
        pass: ""*/
    }).then(async (db) => {
        global.db = db;
    
        require("./initmodel");
    
        await  global.db.modUser.find({}).then(async (docs) => {
            if (docs.length > 0) {
                console.log("database already initialized!");
            } else {
                console.log("start initializing database...");
                await init();
                console.log("initialize database done!")
            }
        })
    }).catch((e) => {
        console.log(e);
    });
}

createdb();
