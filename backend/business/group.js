let base = require('../bin/base');

/**
 * get the list of groups the user has created
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getMyCreatedGroupList = async function (req, res, next) {
    try {
        let userToken = req.body.token;
            await global.db.modUser.find({"authorizationtoken":userToken}).then(async (docs) => {
                let creatoridFromDB = docs[0].userid;
                    await global.db.modGroup.find({"creatorid":creatoridFromDB}).then(async (docs) => {
                        let i;
                        let resultData=[];
                        for(i = 0; i < docs.length ; i++){
                            let groupidFromDb = docs[i].groupid;
                            let groupnameFromDb = docs[i].groupname;
                            let creatoridFromDb = docs[i].creatorid;
                            let creationtimeFromDb = docs[i].creationtime;
                            let groupstatusFromDb = docs[i].groupstatus;
                            let singleData = {};
                            singleData.groupid = groupidFromDb;
                            singleData.groupname = groupnameFromDb;
                            singleData.creatorid = creatoridFromDb;
                            singleData.creationtime = creationtimeFromDb;
                            singleData.groupstatus = groupstatusFromDb;
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
 * get the list of groups the user has participated in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
this.getMyParticipatedGroupList = async function (req, res, next) {
    try {
        let userToken = req.body.token;
            await global.db.modUser.find({"authorizationtoken":userToken}).then(async (docs) => {
                let participantidFromDb = docs[0].userid;
                    await global.db.modGroup_User_Relationship.find({"userid":participantidFromDb}).then(async (docs) => {
                        let participantingGroupidFromDb = [];
                        let i;
                        for(i = 0; i < docs.length ; i++){
                            participantingGroupidFromDb[i] = docs[i].projectid;
                        }
                        await global.db.modGroup.find({"groupid":participantingGroupidFromDb}).then(async (docs) => {
                            let i;
                            let resultData=[];
                            for(i = 0; i < docs.length ; i++){
                                let groupidFromDb = docs[i].groupid;
                                let groupnameFromDb = docs[i].groupname;
                                let creatoridFromDb = docs[i].creatorid;
                                let creationtimeFromDb = docs[i].creationtime;
                                let groupstatusFromDb = docs[i].groupstatus;
                                let singleData = {};
                                singleData.groupid = groupidFromDb;
                                singleData.groupname = groupnameFromDb;
                                singleData.creatorid = creatoridFromDb;
                                singleData.creationtime = creationtimeFromDb;
                                singleData.groupstatus = groupstatusFromDb;
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
