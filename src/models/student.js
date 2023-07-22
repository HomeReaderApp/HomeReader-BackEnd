const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: {
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
    readingData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReadingData'
      }]
   
  });
  
  // Create the Student model
  const Student = mongoose.model('Student', studentSchema);

  module.exports = Student