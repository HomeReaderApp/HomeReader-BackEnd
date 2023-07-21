const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
  className: { 
    type: String, 
    required: true 
  },
  // teacherId: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'TeacherUser', 
  //   required: true
  // },
});

  const Class = mongoose.model('Class', classSchema)

  module.exports = Class