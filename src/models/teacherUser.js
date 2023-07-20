const mongoose = require('mongoose');

const teacherUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    schoolName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  });

const TeacherUser = mongoose.model('teacherUser', teacherUserSchema);

module.exports = TeacherUser;


