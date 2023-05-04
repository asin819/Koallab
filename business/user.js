let base = require('../bin/base');

this.login = async function (req, res, next) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (email != null & email != "") {
            if (password != null && password != "") {
                await global.db.modUser.find({"email":email,"password":password}).then(async (docs) => {
                    if (docs.length > 0 && docs[0]!=null) {
                        let sRandomId = base.getObjectId();
                        let stoken = base.getHash(sRandomId);
                        let userid = docs[0].userid;
                        let expireDate = new Date(new Date().setDate(new Date().getDate()+1));
                        await global.db.modUser.updateMany({"userid":userid},{$set: {
                            "authorizationtoken":stoken,
                            "authorizationgenerationtime":new Date(),
                            "authorizationvalidityexpirationdate":expireDate
                        }}).then((docs) => {
                            if (docs.modifiedCount > 0) {
                                res.end(base.mkBizMsg("success", "login success!",stoken));
                            }else{
                                throw new Error("Generate token failed");
                            }
                        });
                    } else {
                        throw new Error("Email or Password is wrong");
                    }
                });
            } else {
                throw new Error("Password must be provided");
            }

        } else {
            throw new Error("Please provide a valid email");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * Save new user information into database
 * email or username can't be same as existing
 * email or username must provide one of them
 * password can't be empty string
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.register = async function (req, res, next) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;
        let photo = req.body.photo;
        if ((email != null & email != "") || (username != null & username != "")) {
            if (password != null && password != "") {
                let myUsers = [
                    { "userid": base.getObjectId(), "email": email, "password": password, "userstatus": "normal", "username": username, "photo": photo, "authorizationtoken": "", },
                ];
                await global.db.modUser.insertMany(myUsers).then((docs) => {
                    if (docs.length > 0) {
                        res.end(base.mkBizMsg("success", "register done!"));
                    } else {
                        throw new Error("Add user data into database failed");
                    }
                });
            } else {
                throw new Error("Password must be provided");
            }

        } else {
            throw new Error("Please provide a valid email or username");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * modify user information
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.modifyUserInfo = async function (req, res, next) {
    try {
        let newEmail = req.body.email;
        if ((newEmail != null & newEmail != "")) {
                await global.db.modUser.findOneAndUpdate({ userid: req.data.curUserid },{ email: newEmail },{
                    new: true
                  }).then((docs) => {
                    if (docs.email ==newEmail) {
                        res.end(base.mkBizMsg("success", "modification done!"));
                    } else {
                        throw new Error("Modify user information failed");
                    }
                });
        } else {
            throw new Error("Please provide a valid email");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * logout from the system and remove the token and the gobal
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.logout = async function (req, res, next) {
    try {
        if ((req.data.curUserid != null & req.data.curUserid != "")) {
                await global.db.modUser.findOneAndUpdate({ userid: req.data.curUserid },{ authorizationtoken: "",authorizationgenerationtime:null,authorizationvalidityexpirationdate:null },{
                    new: true
                  }).then((docs) => {
                    if (docs.authorizationtoken =="") {
                        res.end(base.mkBizMsg("success", "logout done!"));
                    } else {
                        throw new Error("Logout failed");
                    }
                });
        } else {
            throw new Error("You don't need to log out");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * delete a user from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.deleteUser = async function (req, res, next) {
    try {
        let userid = req.body.userid;
        if (userid != null & userid != "") {
                await global.db.modUser.deleteOne({ userid: userid }).then((docs) => {
                    if (docs.deletedCount ==1) {
                        res.end(base.mkBizMsg("success", "Delete user done!"));
                    } else {
                        throw new Error("Delete user failed");
                    }
                });
        } else {
            throw new Error("You need to provide a userid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * get user information
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getUserInfo = async function (req, res, next) {
    try {
        let userid = req.body.userid;
        if (userid != null & userid != "") {
                await global.db.modUser.find({"userid":userid}).then(async (docs) => {
                    if (docs.length > 0 && docs[0]!=null) {
                        //userid, email, registrationtime, userstatus|username, photo
                        let useridFromDb = docs[0].userid;
                        let email = docs[0].email;
                        let registrationtime = docs[0].registrationtime;
                        let userstatus = docs[0].userstatus;
                        let username = docs[0].username;
                        let photo = docs[0].photo;
                        let resultData=[{
                            "userid":useridFromDb,
                            "email":email,
                            "registrationtime":registrationtime,
                            "userstatus":userstatus,
                            "username":username,
                            "photo":photo
                        }];
                        res.end(base.mkBizMsg("success", "done!",null,resultData));
                    } else {
                        throw new Error("The userid is not exist");
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

/**
 * get user list and detail information from group
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getGroupUserList = async function (req, res, next) {
    try {
        let groupid = req.body.groupid;
        if (groupid != null & groupid != "") {
                await global.db.modGroup_User_Relationship.find({"groupid":groupid}).then(async (docs) => {
                    if (docs.length > 0 && docs[0]!=null) {
                        let userList = [];
                        docs.forEach(d => {
                            userList.push(d.userid)
                        });
                        await global.db.modUser.find({"userid":userList}).then(async (docs) => {
                            if (docs.length > 0 && docs[0]!=null) {
                                let resultData = [];
                                docs.forEach(d => {
                                    let useridFromDb = d.userid;
                                    let email = d.email;
                                    let registrationtime = d.registrationtime;
                                    let userstatus = d.userstatus;
                                    let username = d.username;
                                    let photo = d.photo;
                                    resultData.push({
                                        "userid":useridFromDb,
                                        "email":email,
                                        "registrationtime":registrationtime,
                                        "userstatus":userstatus,
                                        "username":username,
                                        "photo":photo
                                    });
                                })
                                res.end(base.mkBizMsg("success", "done!",null,resultData));
                            } else {
                                throw new Error("The userid is not exist");
                            }
                        });
                    } else {
                        throw new Error("No one in this group");
                    }
                });
            

        } else {
            throw new Error("Please provide a groupid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * query the user list from the project
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getProjectUserList = async function (req, res, next) {
    try {
        let projectid = req.body.projectid;
        if (projectid != null & projectid != "") {
                await global.db.modProject_User_Relationship.find({"projectid":projectid}).then(async (docs) => {
                    if (docs.length > 0 && docs[0]!=null) {
                        let userList = [];
                        docs.forEach(d => {
                            userList.push(d.userid)
                        });
                        await global.db.modUser.find({"userid":userList}).then(async (docs) => {
                            if (docs.length > 0 && docs[0]!=null) {
                                let resultData = [];
                                docs.forEach(d => {
                                    let useridFromDb = d.userid;
                                    let email = d.email;
                                    let registrationtime = d.registrationtime;
                                    let userstatus = d.userstatus;
                                    let username = d.username;
                                    let photo = d.photo;
                                    resultData.push({
                                        "userid":useridFromDb,
                                        "email":email,
                                        "registrationtime":registrationtime,
                                        "userstatus":userstatus,
                                        "username":username,
                                        "photo":photo
                                    });
                                })
                                res.end(base.mkBizMsg("success", "done!",null,resultData));
                            } else {
                                throw new Error("The userid is not exist");
                            }
                        });
                    } else {
                        throw new Error("No one in this group");
                    }
                });
            

        } else {
            throw new Error("Please provide a groupid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * Create a new Group
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.newGroup = async function (req, res, next) {
    try {
        let groupname = req.body.groupname;
        if (groupname != null & groupname != "")  {
            let myGroup = [
                { "groupid": base.getObjectId(), "groupname": groupname, "creatorid": req.data.curUserid,"groupstatus":"normal",creationtime: new Date()},
            ];
            await global.db.modGroup.insertMany(myGroup).then((docs) => {
                if (docs.length > 0) {
                    res.end(base.mkBizMsg("success", "created!"));
                } else {
                    throw new Error("Create a new group failed");
                }
            });
        } else {
            throw new Error("groupname must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * disbands a group
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.disbandGroup = async function (req, res, next) {
    try {
        let groupid = req.body.groupid;
        let newGroupstatus="disbanded";
        if ((groupid != null & groupid != "")) {
                await global.db.modGroup.findOneAndUpdate({ groupid: groupid },{ groupstatus: newGroupstatus },{
                    new: true
                  }).then((docs) => {
                    if (docs.groupstatus ==newGroupstatus) {
                        res.end(base.mkBizMsg("success", "disband done!"));
                    } else {
                        throw new Error("Disband group failed");
                    }
                });
        } else {
            throw new Error("Please provide a groupid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * modify group information
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.modifyGroupInfo = async function (req, res, next) {
    try {
        let groupname = req.body.groupname;
        let groupid = req.body.groupid;
        if ((groupid != null & groupid != "")&&(groupname != null & groupname != "")) {
                await global.db.modGroup.findOneAndUpdate({ groupid: groupid },{ groupname: groupname },{
                    new: true
                  }).then((docs) => {
                    if (docs.groupname ==groupname) {
                        res.end(base.mkBizMsg("success", "modify done!"));
                    } else {
                        throw new Error("Modify group failed");
                    }
                });
        } else {
            throw new Error("Please provide a groupid and groupname");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * add a new user to the group
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.addUserToGroup = async function (req, res, next) {
    try {
        let groupid = req.body.groupid;
        let userid = req.body.userid;
        let userole = req.body.userole;
        if ((groupid != null & groupid != "")&&(userid != null & userid != "")&&(userole != null & userole != ""))  {
            if (userole!="administrator" && userole!="member"){
                throw new Error("user's role must be administrator or member");
            }else{
                let myGroupUser = [
                    { "groupid": base.getObjectId(), "userid": userid, "role": userole,jointime: new Date()},
                ];
                await global.db.modGroup_User_Relationship.insertMany(myGroupUser).then((docs) => {
                    if (docs.length > 0) {
                        res.end(base.mkBizMsg("success", "add done!"));
                    } else {
                        throw new Error("add a new user to group failed");
                    }
                });
            }
        } else {
            throw new Error("groupid,userid and userole must be provided");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * remove a user from the group
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.removeUserFromGroup = async function (req, res, next) {
    try {
        let groupid = req.body.groupid;
        let userid = req.body.userid;
        if ((groupid != null & groupid != "")&&(userid != null & userid != "")) {
                await global.db.modGroup_User_Relationship.deleteOne({ userid: userid,groupid:groupid }).then((docs) => {
                    if (docs.deletedCount ==1) {
                        res.end(base.mkBizMsg("success", "remove done!"));
                    } else {
                        throw new Error("remove user failed");
                    }
                });
        } else {
            throw new Error("You need to provide a userid and groupid");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * modify user role from group
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.modifyUserRoleFromGroup = async function (req, res, next) {
    try {
        let groupid = req.body.groupid;
        let userid = req.body.userid;
        let newUserole = req.body.userole;
        if ((groupid != null & groupid != "")&&(userid != null & userid != "")&&(newUserole != null & newUserole != "")) {
            if (newUserole!="administrator" && newUserole!="member"){
                throw new Error("user's role must be administrator or member");
            }else{
                await global.db.modGroup_User_Relationship.findOneAndUpdate({ groupid: groupid,userid:userid },{ role: newUserole },{
                    new: true
                }).then((docs) => {
                    if (docs!=null && docs.role ==newUserole) {
                        res.end(base.mkBizMsg("success", "modify done!"));
                    } else {
                        throw new Error("Modify group failed");
                    }
                });
            }
        } else {
            throw new Error("You need to provide a userid, groupid and newUserole");
        }
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
};

/**
 * get group information
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getGroupInfo = async function (req, res, next) {
    try {
        let groupid = req.body.groupid;
        if (groupid != null & groupid != "") {
                await global.db.modGroup.find({"groupid":groupid}).then(async (docs) => {
                    if (docs.length > 0 && docs[0]!=null) {
                        //userid, email, registrationtime, userstatus|username, photo
                        let groupidFromDb = docs[0].groupid;
                        let groupname = docs[0].groupname;
                        let creatorid = docs[0].creatorid;
                        let creationtime = docs[0].creationtime;
                        let groupstatus = docs[0].groupstatus;
                        let resultData=[{
                            "groupid":groupidFromDb,
                            "groupname":groupname,
                            "creatorid":creatorid,
                            "creationtime":creationtime,
                            "groupstatus":groupstatus
                        }];
                        res.end(base.mkBizMsg("success", "done!",null,resultData));
                    } else {
                        throw new Error("The userid is not exist");
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

exports = this;