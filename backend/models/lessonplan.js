const mongoose = require('mongoose');

const LessonPlanSchema = new mongoose.Schema({
    subject: String,
    content: String,
    date: String,
    fileUrl: String  // New field to store the file path or URL
});

module.exports = mongoose.model('LessonPlan', LessonPlanSchema);
