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

exports = this;