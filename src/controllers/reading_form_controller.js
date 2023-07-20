const ReadingFormData = require('../models/readingData');

// Controller function for handling the POST request
async function postReadingForm(request, response) {

  try {
    const newReadingForm = new ReadingFormData({
      bookName: request.body.bookName,
      rating: request.body.rating,
      comments: request.body.comments,
      student: request.body.studentId
    });

    const readingData = await newReadingForm.save();
    response.status(201).json({ message: 'Reading form submitted successfully.' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to submit reading form.' });
  }
}


// Function to get all books read by a student
async function getBooksReadByStudent(request, response) {
  const studentId = request.params.studentId

  try {
    const booksReadByStudent = await ReadingFormData.find({ student: studentId }, 'bookName rating comments');
    response.status(200).json(booksReadByStudent);
  } catch (error) {
    response.status(500).json({ error: 'Failed to get books read by the student.' });
  }
}


module.exports = { 
    postReadingForm,
    getBooksReadByStudent 
};
