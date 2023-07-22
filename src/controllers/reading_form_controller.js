const ReadingFormData = require('../models/readingData');
const Student = require('../models/student')

// Controller function for handling the POST request
async function postReadingForm(request, response) {
  
  try {
    const newReadingForm = new ReadingFormData({
      bookName: request.body.bookName,
      rating: request.body.rating,
      comments: request.body.comments,
      date: Date.now(),
      student: request.targetStudent._id
    });

    await newReadingForm.save()
    request.targetStudent.readingData.push(newReadingForm._id);
    await request.targetStudent.save()
    response.status(201).json({ message: 'Reading form submitted successfully.' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to submit reading form.' });
  }
}


// Function to get all books read by a student
async function getBooksReadByStudent(request, response) {

  try {
    const booksReadByStudent = await ReadingFormData.find({ student: request.params.studentId });
    response.status(200).json(booksReadByStudent);
  } catch (error) {
    response.status(500).json({ error: 'Failed to get books read by the student.' });
  }
}

// Function to get all comments from a student
async function getCommentsByStudent(request, response) {
  try {
    const commentsByStudent = await ReadingFormData.find({ student: request.params.studentId }).select('comments');
    response.status(200).json(commentsByStudent);
  } catch (error) {
    response.status(500).json({ error: 'Failed to get comments from the student.' });
  }
}


// Function not working yet
// async function getCommentsByClass(request, response) {
//   const classId = request.params.classId;

//   try {
//     const studentsInClass = await Student.find({ class: classId }, '_id');
//     const studentIds = studentsInClass.map((student) => student._id);
//     const commentsByClass = await ReadingFormData.find({ student: { $in: studentIds } })
//       .populate('student', 'firstName') 
//       .select('comments');

//     const commentsList = commentsByClass.map((item) => {
//       return {
//         studentName: item.student.firstName,
//         comments: item.comments,
//       };
//     });

//     response.status(200).json(commentsList);
//   } catch (error) {
//     response.status(500).json({ error: 'Failed to get comments by class.' });
//   }
// }


module.exports = { 
    postReadingForm,
    getBooksReadByStudent ,
    getCommentsByStudent
    // getCommentsByClass,
};
