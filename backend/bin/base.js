let crypto = require('crypto');
let base = require('./base');

/**
 * Generate response data
 * @param {String} status fail | success
 * @param {String} message 
 * @param {String} token 
 * @param {Array} data 
 * @returns 
 */
this.mkBizMsg = function (status, message, token, data) {
    let sr = {
        "status": status,
        "message": message,
        "token": token,
        "data": data
    }
    let sResult = JSON.stringify(sr);
    console.log(new Date() + ": " + sResult);
    return JSON.stringify(sResult);
}

/**
 * Generate random ID
 * @returns {String}
 */
this.getObjectId = function () {
    let S4 = function () {
        let randomStr = Math.floor(
            Math.random() * 0x10000 /* 65536 */
        ).toString(16);
        return randomStr.length == 4 ? randomStr : S4();
    };

    return (
        S4() + S4() +
        S4() +
        S4() +
        S4() +
        S4()
    );
};

/**
 * Generate a hash from a string
 * @param {String} str 
 * @returns 
 */
this.getHash = function (str) {
    let shasum = crypto.createHash("md5");
    shasum.update(str);
    str = shasum.digest("hex");
    return str;
};

/**
 * Check each request, only the login can not contain a token. other request must contain a legal and valid token 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
this.checkReq = async function (req, res, next) {
    try {
        let isOk = false;
        switch (req.originalUrl) {
            case "/": isOk = true; break;
            case "/favicon.ico": isOk = true; break;
            case "/login": isOk = true; break;
            case "/register": isOk = true; break;
            default: {
                //compatible with query
                if (req.query!=null){
                    req.body = Object.assign({}, req.query, req.body);
                }
                if (req.body && req.body.token) {
                    await global.db.modUser.find({ "authorizationtoken": req.body.token }).then(async (docs) => {
                        if (docs.length > 0 && docs[0] != null) {
                            let authorizationvalidityexpirationdate = docs[0].authorizationvalidityexpirationdate;
                            if (authorizationvalidityexpirationdate > new Date()) {
                                if (req.data==null) req.data ={};
                                req.data.curUserid = docs[0].userid; //automatically add current logined user at every time
                                isOk = true;
                            } else {
                                throw new Error("The token has expired");
                            }
                        } else {
                            throw new Error("Invalid token");
                        }
                    });
                } else {
                    throw new Error("Missing token!");
                }
            }
        }
        if (isOk)next();
    } catch (e) {
        console.log(e);
        res.end(base.mkBizMsg("fail", e.message ? e.message : e));
    }
}

exports = this;

