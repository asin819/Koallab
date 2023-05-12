const mongoose = require('mongoose');

const TaskLogSchema = new mongoose.Schema({
    logid: {
        type: String,
        required: true,
        unique: true,
    },
    taskid: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    addtime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    adderid: {
        type: String,
        required: true,
    },
});

const TaskLog = mongoose.model('task_logs', TaskLogSchema);
module.exports = { TaskLog };
