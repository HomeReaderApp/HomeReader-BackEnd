const express = require('express');
const readingDataRouter = express.Router();
const { postReadingForm, getBooksReadByStudent, getComments, getFavouriteBooks } = require('../controllers/reading_form_controller');
const { isAuthenticated, isClassOwner } = require('../middlewares/user_middleware')
const { isStudentAuthenticated } = require('../middlewares/student_user_middleware')


// POST route for submitting a reading form
readingDataRouter.post('/:studentId/submit-reading-form', isStudentAuthenticated, postReadingForm);

// route to get a list of books read by a particular student
readingDataRouter.get('/:studentId/books', getBooksReadByStudent)

readingDataRouter.get('/comments/:classId', isAuthenticated, isClassOwner, getComments )

readingDataRouter.get('/favourite-books/:classId', isAuthenticated, isClassOwner, getFavouriteBooks )


module.exports = readingDataRouter;