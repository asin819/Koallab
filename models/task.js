const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    taskId: {
        type: String,
        required: true,
        unique: true,
    },
    taskTitle: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
    },
    creatorId: {
        type: String,
        required: true,
    },
    executorId: {
        type: String,
        required: true,
    },
    taskStatus: {
        type: String,
        enum: ['new', 'executing', 'completed', 'accepted', 'obsolete'],
        required: true,
    },
    parentTaskId: {
        type: String,
    },
    estimatedIime: {
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

const Task = mongoose.model('Task', TaskSchema);
module.exports = { Task };