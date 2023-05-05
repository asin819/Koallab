const mongoose = require('mongoose');

const ProjectTaskSchema = new mongoose.Schema({
    projectid: {
        type: String,
        required: true,
    },
    taskid: {
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

// Create a unique compound index for projectId and taskId
ProjectTaskSchema.index({ projectId: 1, taskId: 1 }, { unique: true });

const ProjectTask = mongoose.model('project_task_relationships', ProjectTaskSchema);
module.exports = { ProjectTask };
