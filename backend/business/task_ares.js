let base = require('../bin/base');

this.getTaskInfo = async function (req, res, next) {
    try {
        let taskid = req.body.taskid;
        if (taskid != null & taskid != "") {
            await global.db.modTask.find({ "taskid": taskid }).then(async (docs) => {
                if (docs.length > 0 && docs[0] != null) {
                    let taskidFromDb = docs[0].taskid;
                    let tasktitle = docs[0].tasktitle;
                    let taskdescription = docs[0].taskdescription;
                    let executorid = docs[0].executorid;
                    let taskstatus = docs[0].taskstatus;
                    let parentaskid = docs[0].parentaskid;
                    let estimatedtime = docs[0].estimatedtime;
                    let importance = docs[0].importance;
                    let tasklabel = docs[0].tasklabel;
                    let resultData = [{
                        "taskid": taskidFromDb,
                        "tasktitle": tasktitle,
                        "taskdescription": taskdescription,
                        "taskstatus": taskstatus,
                        "parentaskid": parentaskid,
                        "estimatedtime": estimatedtime,
                        "executorid": executorid,
                        "importance": importance,
                        "tasklabel": tasklabel
                    }];
                    res.end(base.mkBizMsg("success", "done!", null, resultData));
                } else {
                    throw new Error("The taskid is not exist");
                }
            });
        } else {
            throw new Error("Please provide a taskid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.getTaskListFromProject = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        if (projectid != null & projectid != "") {
            await global.db.modProject_Task_Relationship.find({ "projectid": projectid }).then(async (docs) => {
                if (docs.length > 0 && docs[0] != null) {
                    let taskList = [];
                    docs.forEach(d => {
                        taskList.push(d.taskid)
                    });
                    await global.db.modTask.find({ "taskid": taskList }).then(async (docs) => {
                        if (docs.length > 0 && docs[0] != null) {
                            let resultData = [];
                            docs.forEach(d => {
                                let taskidFromDb = d.taskid;
                                let tasktitle = d.tasktitle;
                                let taskdescription = d.taskdescription;
                                let executorid = d.executorid;
                                let taskstatus = d.taskstatus;
                                let parentaskid = d.parentaskid;
                                let estimatedtime = d.estimatedtime;
                                let importance = d.importance;
                                let tasklabel = d.tasklabel;
                                resultData.push({
                                    "taskid": taskidFromDb,
                                    "tasktitle": tasktitle,
                                    "taskdescription": taskdescription,
                                    "taskstatus": taskstatus,
                                    "parentaskid": parentaskid,
                                    "estimatedtime": estimatedtime,
                                    "executorid": executorid,
                                    "importance": importance,
                                    "tasklabel": tasklabel
                                });
                            });
                            res.end(base.mkBizMsg("success", "done!", null, resultData));
                        } else {
                            res.end(base.mkBizMsg("success", "done!", null, []));
                        }
                    });
                } else {
                    res.end(base.mkBizMsg("success", "done!", null, []));
                }
            });


        } else {
            throw new Error("Please provide a projectid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.getTaskListByUserid = async function (req, res, next) {
    try {
        let userid = req.body.userid;
        if (userid != null & userid != "") {
            await global.db.modTask.find({ "$or": [{ "executorid": userid }, { "creatorid": userid }] }).then(async (docs) => {
                if (docs.length > 0 && docs[0] != null) {

                    let resultData = [];

                    docs.forEach(d => {
                        let taskidFromDb = d.taskid;
                        let tasktitle = d.tasktitle;
                        let taskdescription = d.taskdescription;
                        let executorid = d.executorid;
                        let taskstatus = d.taskstatus;
                        let parentaskid = d.parentaskid;
                        let estimatedtime = d.estimatedtime;
                        let importance = d.importance;
                        let tasklabel = d.tasklabel;
                        resultData.push({
                            "taskid": taskidFromDb,
                            "tasktitle": tasktitle,
                            "taskdescription": taskdescription,
                            "taskstatus": taskstatus,
                            "parentaskid": parentaskid,
                            "estimatedtime": estimatedtime,
                            "executorid": executorid,
                            "importance": importance,
                            "tasklabel": tasklabel
                        });
                    })
                    res.end(base.mkBizMsg("success", "done!", null, resultData));
                } else {
                    res.end(base.mkBizMsg("success", "done!", null, []));
                }
            });
        } else {
            throw new Error("Please provide a userid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.addLog = async function (req, res, next) {
    try {
        let taskid = req.body.taskid;
        let content = req.body.content;
        if ((taskid != null & taskid != "") && (content != null && content != "")) {
            let myLog = [
                { "logid": base.getObjectId(), "taskid": taskid, "content": content, "adderid": req.data.curUserid, "addtime": new Date() },
            ];
            await global.db.modTask_Log.insertMany(myLog).then((docs) => {
                if (docs.length > 0) {
                    res.end(base.mkBizMsg("success", "Added!"));
                } else {
                    throw new Error("Create a new group failed");
                }
            });
        } else {
            throw new Error("taskid and content must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.modifyLogContent = async function (req, res, next) {
    try {
        let taskid = req.body.taskid;
        let content = req.body.content;
        if ((taskid != null & taskid != "") && (content != null && content != "")) {
            await global.db.modTask_Log.findOneAndUpdate({ taskid: taskid }, { content: content }, {
                new: true
            }).then((docs) => {
                if (docs.content == content) {
                    res.end(base.mkBizMsg("success", "modify done!"));
                } else {
                    throw new Error("Modify log failed");
                }
            });
        } else {
            throw new Error("taskid and content must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.deleteLog = async function (req, res, next) {
    try {
        let taskid = req.body.taskid;
        if (taskid != null & taskid != "") {
            await global.db.modTask_Log.deleteOne({ taskid: taskid }).then((docs) => {
                if (docs.deletedCount > 0) {
                    res.end(base.mkBizMsg("success", "Delete log done!"));
                } else {
                    throw new Error("Delete log failed");
                }
            });
        } else {
            throw new Error("You need to provide a taskid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.getLogInfo = async function (req, res, next) {
    try {
        let logid = req.body.logid;
        if (logid != null & logid != "") {
            await global.db.modTask_Log.find({ "logid": logid }).then(async (docs) => {
                if (docs.length > 0 && docs[0] != null) {
                    let logidFromDb = docs[0].logid;
                    let taskid = docs[0].taskid;
                    let content = docs[0].content;
                    let addtime = docs[0].addtime;
                    let adderid = docs[0].adderid;
                    let resultData = [{
                        "logid": logidFromDb,
                        "taskid": taskid,
                        "content": content,
                        "addtime": addtime,
                        "adderid": adderid
                    }];
                    res.end(base.mkBizMsg("success", "done!", null, resultData));
                } else {
                    throw new Error("The logid is not exist");
                }
            });
        } else {
            throw new Error("Please provide a logid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.getlogListFromTask = async function (req, res, next) {
    try {
        let taskid = req.body.taskid;
        if (taskid != null & taskid != "") {
            await global.db.modTask_Log.find({ "taskid": taskid }).then(async (docs) => {
                if (docs.length > 0 && docs[0] != null) {
                    let resultData = [];
                    docs.forEach(d => {
                        let logidFromDb = d.logid;
                        let taskid = d.taskid;
                        let content = d.content;
                        let addtime = d.addtime;
                        let adderid = d.adderid;
                        resultData.push({
                            "logid": logidFromDb,
                            "taskid": taskid,
                            "content": content,
                            "addtime": addtime,
                            "adderid": adderid
                        });
                    })
                    res.end(base.mkBizMsg("success", "done!", null, resultData));
                } else {
                    res.end(base.mkBizMsg("success", "done!", null, []));
                }
            });
        } else {
            throw new Error("Please provide a taskid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.addTaskToProject = async function (req, res, next) {
    try {
        let taskid = req.body.taskid;
        let projectid = req.body.projectid;
        if ((taskid != null & taskid != "") && (projectid != null && projectid != "")) {
            let myRela = [
                { "projectid": base.getObjectId(), "taskid": taskid, "adderid": req.data.curUserid, "addtime": new Date() },
            ];
            await global.db.modProject_Task_Relationship.insertMany(myRela).then((docs) => {
                if (docs.length > 0) {
                    res.end(base.mkBizMsg("success", "Added!"));
                } else {
                    throw new Error("add task to project failed");
                }
            });
        } else {
            throw new Error("taskid and projectid must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.deleteTaskFromProject = async function (req, res, next) {
    try {
        let taskid = req.body.taskid;
        let projectid = req.body.projectid;
        if ((taskid != null & taskid != "") && (projectid != null && projectid != "")) {
            await global.db.modProject_Task_Relationship.deleteOne({ taskid: taskid, projectid: projectid }).then((docs) => {
                if (docs.deletedCount > 0) {
                    res.end(base.mkBizMsg("success", "remove done!"));
                } else {
                    throw new Error("remove failed");
                }
            });
        } else {
            throw new Error("taskid and projectid must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.modifyUserPhoto = async function (req, res, next) {
    try {
        let userid = req.body.userid;
        let photo = req.body.photo;
        if ((userid != null & userid != "") && (photo != null && photo != "")) {
            await global.db.modUser.findOneAndUpdate({ userid: userid }, { photo: photo }, {
                new: true
            }).then((docs) => {
                if (docs.photo == photo) {
                    res.end(base.mkBizMsg("success", "modify done!"));
                } else {
                    throw new Error("Modify photo failed");
                }
            });
        } else {
            throw new Error("userid and photo must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.upload = async function (req, res, next) {
    try {
        let file = req.body.file;
        let projectid = req.body.projectid;
        if ((file != null & file != "") && (projectid != null && projectid != "")) {
            let resourceid = base.getObjectId();
            let resourcetype = "";
            let path = "";
            let myRela = [
                { "resourceid": resourceid, "projectid": projectid, "resourcetype": resourcetype, "file": file },
            ];
            await global.db.modProject_Resource_Table.insertMany(myRela).then((docs) => {
                if (docs.length > 0) {
                    res.end(base.mkBizMsg("success", "Done!", null, [{ resourceid: resourceid }]));
                } else {
                    throw new Error("upload failed");
                }
            });
        } else {
            throw new Error("file  and projectid must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.download = async function (req, res, next) {
    try {
        let resourceid = req.body.resourceid;
        if (resourceid != null & resourceid != "") {
            await global.db.modProject_Resource_Table.find({ "resourceid": resourceid }).then(async (docs) => {
                if (docs.length > 0 && docs[0] != null) {
                    let file = docs[0].file;
                    let resultData = [{
                        "file": file
                    }];
                    res.end(base.mkBizMsg("success", "done!", null, resultData));
                } else {
                    throw new Error("The resourceid is not exist");
                }
            });
        } else {
            throw new Error("Please provide a resourceid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.deleteResource = async function (req, res, next) {
    try {
        let resourceid = req.body.resourceid;
        if ((resourceid != null & resourceid != "")) {
            await global.db.modProject_Resource_Table.deleteOne({ resourceid: resourceid }).then((docs) => {
                if (docs.deletedCount > 0) {
                    res.end(base.mkBizMsg("success", "remove done!"));
                } else {
                    throw new Error("remove failed");
                }
            });
        } else {
            throw new Error("resourceid must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

this.getResourceListFromProject = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        if (projectid != null & projectid != "") {
            await global.db.modProject_Resource_Table.find({ "projectid": projectid }).then(async (docs) => {
                if (docs.length > 0 && docs[0] != null) {
                    let resultData = [];
                    docs.forEach(d => {
                        let resourceidFromDb = d.resourceid;
                        let projectid = d.projectid;
                        let resourcetype = d.resourcetype;
                        let file = d.file;
                        resultData.push({
                            "resourceid": resourceidFromDb,
                            "projectid": projectid,
                            "resourcetype": resourcetype,
                            "file": file
                        });
                    })

                    res.end(base.mkBizMsg("success", "done!", null, resultData));
                } else {
                    res.end(base.mkBizMsg("success", "done!", null, []));
                }
            });
        } else {
            throw new Error("Please provide a projectid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

exports = this;