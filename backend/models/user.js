const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userid: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
    registrationtime: {
        type: Date,
        default: Date.now,
    },
    userstatus: {
        type: String,
        default: '',
    },
    username: {
        type: String,
        default: '',
    },
    photo: {
        type: String,
        default: '',
    },
    authorizationtoken: {
        type: String,
        default: '',
    },
    authorizationgenerationtime: {
        type: Date,
        default: Date.now,
    },
    authorizationvalidityexpirationdate: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('users', UserSchema);
module.exports = { User };
