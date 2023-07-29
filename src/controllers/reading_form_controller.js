const ReadingFormData = require('../models/readingData');
const Student = require('../models/student')
const Class = require('../models/class')

// Submit a reading form
async function postReadingForm(request, response) {
  // let targetClass = await Class.find({students: request.targetStudent._id})
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
    response.status(201).json({ message: 'Reading form submitted successfully.',
  readingForm: newReadingForm });
  } catch (error) {
    response.status(500).json({ error: 'Failed to submit reading form.' });
  }
}


// Function to get all books read by a student
// async function getBooksReadByStudent(request, response) {

//   try {
//     const booksReadByStudent = await ReadingFormData.find({ student: request.params.studentId });
//     response.status(200).json(booksReadByStudent);
//   } catch (error) {
//     response.status(500).json({ error: 'Failed to get books read by the student.' });
//   }
// }

// Get all reading data from the class

async function getComments(request, response) {
  let classId = request.params.classId;

  try {
    // Find the specified class by its ID and populate the 'students' field.
    const teacherClass = await Class.findById(classId).populate('students');

    if (!teacherClass) {
      return response.status(404).json({ error: 'Class not found' });
    }

    // Extract all student IDs from the Class document.
    const studentIds = teacherClass.students.map(student => student._id);

    // Find all ReadingFormData entries where the student ID matches the ones in the class.
    const readingFormDataList = await ReadingFormData.find({
      'student': { $in: studentIds },
      comments: { $exists: true, $ne: '' }
    }).populate('student', 'firstName lastName');

    // Extract and format the comments.
    const comments = readingFormDataList.map(entry => ({
      studentName: `${entry.student.firstName} ${entry.student.lastName}`,
      bookName: entry.bookName,
      comment: entry.comments,
      date: entry.date
    }));

    response.status(200).json(comments);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Unable to fetch comments for the class.' });
  }
}

// Function to get all the favourite books from a class
async function getFavouriteBooks(request, response) {
  let classId = request.params.classId;

  try {
    // Find the specified class by its ID and populate the 'students' field.
    const teacherClass = await Class.findById(classId).populate('students');

    if (!teacherClass) {
      return response.status(404).json({ error: 'Class not found' });
    }

    // Extract all student IDs from the Class document.
    const studentIds = teacherClass.students.map(student => student._id);

    // Find all ReadingFormData entries where the student ID matches the ones in the class.
    const readingFormDataList = await ReadingFormData.find({
      'student': { $in: studentIds },
      comments: { $exists: true, $ne: '' }
    }).populate('student', 'firstName lastName');

    // Extract and format the comments.
    const comments = readingFormDataList.map(entry => ({
      studentName: `${entry.student.firstName} ${entry.student.lastName}`,
      bookName: entry.bookName,
      comment: entry.comments,
      date: entry.date,
      rating: entry.rating // Include the book rating in the comments list
    }));

    // Filter the comments to only include books with a rating of 5.
    const favouriteBooks = comments.filter(comment => comment.rating === 5);

    response.status(200).json(favouriteBooks);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Unable to fetch favourite books for the class.' });
  }
}






module.exports = { 
    postReadingForm,
    // getBooksReadByStudent ,
    getComments,
    getFavouriteBooks
};
