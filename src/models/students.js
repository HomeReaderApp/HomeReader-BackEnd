const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentName: {
      type: String,
      required: true,
    },
    yearLevel: {
        type: Number,
        require: true,
    },
    loginCode: {
        type: String,
        require: true
    },
    className: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Class' 
    }
  });
  
  // Create the Student model
  const Student = mongoose.model('Student', studentSchema);

  module.exports = Student