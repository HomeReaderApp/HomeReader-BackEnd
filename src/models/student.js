const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentName: { 
        type: String, 
        required: true 
    },
    yearLevel: { 
        type: Number, 
        required: true 
    },
    loginCode: { 
        type: String, 
        required: true,
        unique: true 
    },
    classId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class', 
        required: true 
    },
  });
  
  // Create the Student model
  const Student = mongoose.model('Student', studentSchema);

  module.exports = Student