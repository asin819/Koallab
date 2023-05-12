let base = require('../bin/base');

/**
 * creates a new project
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.newProject = async function (req, res, next) {
    try {
        let projectname = req.body.projectname;
        let creationtime = req.body.creationtime;
        let startime = req.body.startime;
        let endtime = req.body.endtime;
        let userToken = req.body.token;
        if (projectname != null & projectname != "") {
            if (startime == null || startime == "") {
                startime = Date.now;
            }
            if (creationtime == null || creationtime == "") {
                creationtime = Date.now;
            }
            if (endtime == "") {
                endtime = null;
            }
            await global.db.modUser.find({"authorizationtoken":userToken}).then(async (docs) => {
                let creatoridFromDB = docs[0].userid;
                let myProjects = [
                    { "projectid": base.getObjectId(), "projectname": projectname, "creatorid": creatoridFromDB, "creationtime": creationtime, "projectstatus": "normal", "Startime": startime, "endtime": endtime, },
                ];
                await global.db.modProject.insertMany(myProjects).then((docs) => {
                    if (docs.length > 0) {
                        res.end(base.mkBizMsg("success", "project created!"));
                    } else {
                        throw new Error("Add project data into database failed");
                    }
                });
            });
        } else {
            throw new Error("Please provide a valid project name");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * closes a project
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.closeProject = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        if (projectid != null & projectid != "") {
            await global.db.modProject.find({"projectid":projectid}).then(async (docs) => {
                if (docs.length > 0 && docs[0]!=null) {
                    await global.db.modProject.updateMany({"projectid":projectid},{$set: {
                        "projectstatus":"closed",
                        "endtime":new Date(),
                    }}).then(async (docs) => {
                        res.end(base.mkBizMsg("success", "project is closed!"));
                    });
                } else {
                    throw new Error("Project id does not exist");
                }
            });
        } else {
            throw new Error("Please provide a valid project id");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * restarts a project
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.restartProject = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        if (projectid != null & projectid != "") {
            await global.db.modProject.find({"projectid":projectid}).then(async (docs) => {
                if (docs.length > 0 && docs[0]!=null) {
                    await global.db.modProject.updateMany({"projectid":projectid},{$set: {
                        "projectstatus":"normal",
                        "endtime":"",
                    }}).then(async (docs) => {
                        res.end(base.mkBizMsg("success", "project is restarted!"));
                    });
                } else {
                    throw new Error("Project id does not exist");
                }
            });
        } else {
            throw new Error("Please provide a valid project id");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * modifies a project (name, start time, end time)
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.modifyProjectInfo = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        let projectname = req.body.projectname;
        let startime = req.body.startime;
        let endtime = req.body.endtime;
        if (projectid != null & projectid != "") {
            await global.db.modProject.find({"projectid":projectid}).then(async (docs) => {
                let objToUpdate = {};
                if (docs.length > 0 && docs[0]!=null) {
                    if(projectname != null & projectname != ""){
                        objToUpdate.projectname = projectname;
                    }
                    if(startime != null & startime != ""){
                        objToUpdate.startime = startime;
                    }
                    if(endtime != null & endtime != ""){
                        objToUpdate.endtime = endtime;
                    }
                    await global.db.modProject.updateMany({"projectid":projectid},
                        objToUpdate
                    ).then(async (docs) => {
                        res.end(base.mkBizMsg("success", "project is modified!"));
                    });
                } else {
                    throw new Error("Project id does not exist");
                }
            });
        } else {
            throw new Error("Please provide a valid project id");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * adds a new user to a project
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.addUserToProject = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        let userid = req.body.userid;
        let role = req.body.role;
        if (projectid != null & projectid != "") {
            if (userid != null && userid != "") {
                if (role != null && role != "") {
                    await global.db.modUser.find({"userid":userid}).then(async (docs) => {
                        if(docs.length > 0 && docs[0] != null){
                            await global.db.modProject.find({"projectid":projectid}).then(async (docs) => {
                                if(docs.length > 0 && docs[0] != null){
                                    let myProject_User_Relationship = [
                                        { "projectid": projectid, "userid": userid, "role": role, },
                                    ];
                                    await global.db.modProject_User_Relationship.insertMany(myProject_User_Relationship).then((docs) => {
                                        if (docs.length > 0) {
                                            res.end(base.mkBizMsg("success", "user has been added!"));
                                        } else {
                                            throw new Error("Add project user relationship data into database failed");
                                        }
                                    });
                                }else{
                                    throw new Error("Project does not exist");
                                }
                            });
                        }else{
                            throw new Error("User does not exist");
                        }
                    });
                } else {
                    throw new Error("Please provide a valid role");
                }
            } else {
                throw new Error("Please provide a valid user id");
            }
        } else {
            throw new Error("Please provide a valid project id");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * removes an existing user to a project
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.removeUserFromProject = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        let userid = req.body.userid;
        if (projectid != null & projectid != "") {
            if (userid != null && userid != "") {
                    await global.db.modUser.find({"userid":userid}).then(async (docs) => {
                        if(docs.length > 0 && docs[0] != null){
                            await global.db.modProject.find({"projectid":projectid}).then(async (docs) => {
                                if(docs.length > 0 && docs[0] != null){
                                    await global.db.modProject_User_Relationship.deleteOne({
                                        "projectid":projectid,
                                        "userid":userid,
                                    }).then((docs) => {
                                       
                                            res.end(base.mkBizMsg("success", "user has been removed!"));
                                      
                                    });
                                }else{
                                    throw new Error("Project does not exist");
                                }
                            });
                        }else{
                            throw new Error("User does not exist");
                        }
                    });
            } else {
                throw new Error("Please provide a valid user id");
            }
        } else {
            throw new Error("Please provide a valid project id");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * modifies user's role in a project
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.modifyUserRoleInProject = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        let userid = req.body.userid;
        let role = req.body.role;
        if (projectid != null & projectid != "") {
            if (userid != null && userid != "") {
                if (role != null && role != "") {
                    if(role != "administrator" && role != "member"){
                        throw new Error("the role must either by administrator or member");
                    }else{
                        await global.db.modUser.find({"userid":userid}).then(async (docs) => {
                            if(docs.length > 0 && docs[0] != null){
                                await global.db.modProject.find({"projectid":projectid}).then(async (docs) => {
                                    if(docs.length > 0 && docs[0] != null){
                                        await global.db.modProject_User_Relationship.findOneAndUpdate({"projectid":projectid,"userid":userid},{
                                            "role": role,
                                        },{
                                            new: true
                                        }).then(async (docs) => {
                                            res.end(base.mkBizMsg("success", "User role has been modified!"));
                                        });
                                    }else{
                                        throw new Error("Project does not exist");
                                    }
                                });
                            }else{
                                throw new Error("User does not exist");
                            }
                        });
                    }
                } else {
                    throw new Error("Please provide a valid role");
                }
            } else {
                throw new Error("Please provide a valid user id");
            }
        } else {
            throw new Error("Please provide a valid project id");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * get project information
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getProjectInfo = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        if (projectid != null & projectid != "") {
                await global.db.modProject.find({"projectid":projectid}).then(async (docs) => {
                    if (docs.length > 0 && docs[0]!=null) { 
                        let projectidFromDb = docs[0].projectid;
                        let projectname = docs[0].projectname;
                        let creatorid = docs[0].creatorid;
                        let creationtime = docs[0].creationtime;
                        let projectstatus = docs[0].projectstatus;
                        let Startime = docs[0].Startime;
                        let endtime = docs[0].endtime;
                        let resultData=[{
                            "projectid":projectidFromDb,
                            "projectname":projectname,
                            "creatorid":creatorid,
                            "creationtime":creationtime,
                            "projectstatus":projectstatus,
                            "Startime":Startime,
                            "endtime":endtime
                        }];
                        res.end(base.mkBizMsg("success", "done!",null,resultData));
                    } else {
                        throw new Error("The projectid is not exist");
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

/**
 * get the list of projects the user has created
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getMyCreatedProjectList = async function (req, res, next) {
    try {
        let userToken = req.body.token;
            await global.db.modUser.find({"authorizationtoken":userToken}).then(async (docs) => {
                let creatoridFromDB = docs[0].userid;
                    await global.db.modProject.find({"creatorid":creatoridFromDB}).then(async (docs) => {
                        let i;
                        let resultData=[];
                        for(i = 0; i < docs.length ; i++){
                            let projectidFromDb = docs[0].projectid;
                            let projectnameFromDb = docs[0].projectname;
                            let creatoridFromDb = docs[0].creatorid;
                            let creationtimeFromDb = docs[0].creationtime;
                            let projectstatusFromDb = docs[0].projectstatus;
                            let StartimeFromDb = docs[0].Startime;
                            let endtimeFromDb = docs[0].endtime;
                            let singleData = {};
                            singleData.projectid = projectidFromDb;
                            singleData.projectname = projectnameFromDb;
                            singleData.creatorid = creatoridFromDb;
                            singleData.creationtime = creationtimeFromDb;
                            singleData.projectstatus = projectstatusFromDb;
                            singleData.Startime = StartimeFromDb;
                            singleData.endtime = endtimeFromDb;
                            resultData[i] = singleData;
                        }
                        res.end(base.mkBizMsg("success", "done!",null,resultData));
                    });
            });
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * get the list of projects the user has participated in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getMyParticipatedProjectList = async function (req, res, next) {
    try {
        let userToken = req.body.token;
            await global.db.modUser.find({"authorizationtoken":userToken}).then(async (docs) => {
                let participantidFromDb = docs[0].userid;
                    await global.db.modProject_User_Relationship.find({"userid":participantidFromDb}).then(async (docs) => {
                        let participantingProjectidFromDb = [];
                        let i;
                        for(i = 0; i < docs.length ; i++){
                            participantingProjectidFromDb[i] = docs[i].projectid;
                        }
                        await global.db.modProject.find({"projectid":participantingProjectidFromDb}).then(async (docs) => {
                            let i;
                            let resultData=[];
                            for(i = 0; i < docs.length ; i++){
                                let projectidFromDb = docs[i].projectid;
                                let projectnameFromDb = docs[i].projectname;
                                let creatoridFromDb = docs[i].creatorid;
                                let creationtimeFromDb = docs[i].creationtime;
                                let projectstatusFromDb = docs[i].projectstatus;
                                let StartimeFromDb = docs[i].Startime;
                                let endtimeFromDb = docs[i].endtime;
                                let singleData = {};
                                singleData.projectid = projectidFromDb;
                                singleData.projectname = projectnameFromDb;
                                singleData.creatorid = creatoridFromDb;
                                singleData.creationtime = creationtimeFromDb;
                                singleData.projectstatus = projectstatusFromDb;
                                singleData.Startime = StartimeFromDb;
                                singleData.endtime = endtimeFromDb;
                                resultData[i] = singleData;
                            }
                            res.end(base.mkBizMsg("success", "done!",null,resultData));
                        });
                    });
            });
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};