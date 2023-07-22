const mongoose = require('mongoose');

// ReadingFormData model
const readingFormDataSchema = new mongoose.Schema({
  bookName: { 
    type: String, 
    required: true 
},
  rating: { 
    type: Number, min: 1, max: 5, 
    required: true },
    
  comments: { 
    type: String 
},
  createdAtDate: {
    type: Date
  },
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true },
  // class: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Class', 
  //   required: true },
  }
);

const ReadingFormData = mongoose.model('ReadingFormData', readingFormDataSchema);

module.exports = ReadingFormData;