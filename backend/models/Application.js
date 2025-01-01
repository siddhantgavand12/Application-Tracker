const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    candidateName: { type: String, required: true },
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'],
        default: 'Applied',
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);
