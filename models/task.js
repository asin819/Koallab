const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    taskid: {
        type: String,
        required: true,
        unique: true,
    },
    tasktitle: {
        type: String,
        required: true,
    },
    taskdescription: {
        type: String,
    },
    creatorid: {
        type: String,
        required: true,
    },
    executorid: {
        type: String,
        required: true,
    },
    taskstatus: {
        type: String,
        enum: ['new', 'executing', 'completed', 'accepted', 'obsolete'],
        required: true,
    },
    parenttaskid: {
        type: String,
    },
    estimatedtime: {
        type: Number,
    },
    importance: {
        type: String,
        enum: ['Non-Important', 'Important', 'Average'],
        required: true,
    },
    tasklabel: {
        type: [String],
    },
});

const Task = mongoose.model('tasks', TaskSchema);
module.exports = { Task };