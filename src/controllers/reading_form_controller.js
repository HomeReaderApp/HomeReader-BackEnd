const ReadingFormData = require('../models/readingData');
const Student = require('../models/student')
const Class = require('../models/class')

// Controller function for handling the POST request
async function postReadingForm(request, response) {
  let cl = await Class.find({students: request.targetStudent._id})
  console.log(cl)
  try {
    const newReadingForm = new ReadingFormData({
      bookName: request.body.bookName,
      rating: request.body.rating,
      comments: request.body.comments,
      date: Date.now(),
      student: request.targetStudent._id
    });

    await newReadingForm.save()
    console.log(newReadingForm)
    request.targetStudent.readingData.push(newReadingForm._id);
    await request.targetStudent.save()
    response.status(201).json({ message: 'Reading form submitted successfully.',
  readingForm: newReadingForm });
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

// Get all reading data from the class

// Not working
async function getFavouriteBooks(request, response){
  try{
    const favouriteBooks = await ReadingFormData.find({classId: request.params.classId, rating:5})

  } catch (error) {
    response.status(500).json({ error: 'Failed to get books' });

  }
}

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
    getBooksReadByStudent ,
    getCommentsByStudent,
    getFavouriteBooks,
    getComments,
    getFavouriteBooks
};
