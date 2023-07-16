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
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true },
});

const ReadingFormData = mongoose.model('ReadingFormData', readingFormDataSchema);

module.exports = ReadingFormData;