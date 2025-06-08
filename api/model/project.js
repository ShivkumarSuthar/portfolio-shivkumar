const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    liveUrl: {
        type: String,
        required: false,
    },
    githubUrl: {
        type: String,
        required: false,
    },
    order: {
        type: Number,
        required: false,
    },
    featured: {
        type: Boolean,
        required: false,
        default: false,
    },
}, { timestamps: true });

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;
