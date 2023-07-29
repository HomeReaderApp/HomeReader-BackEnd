const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
  className: { 
    type: String, 
    required: true 
  },
  teacherId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TeacherUser'
  },
  
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

  const Class = mongoose.model('Class', classSchema)

  module.exports = Class