const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentName: {
      type: String,
      required: true,
    },
    yearLevel: {
        type: Integer,
        require: true,
    },
    loginCode: {
        type: String,
        require: true
    }
  });
  
  // Create the Student model
  const Student = mongoose.model('Student', studentSchema);