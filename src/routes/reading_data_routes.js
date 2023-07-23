const express = require('express');
const readingDataRouter = express.Router();
const { postReadingForm, getBooksReadByStudent } = require('../controllers/reading_form_controller');
const { isStudentAuthenticated } = require('../middlewares/student_user_middleware')


// POST route for submitting a reading form
readingDataRouter.post('/submit-reading-form', isStudentAuthenticated, postReadingForm);

// route to get a list of books read by a particular student
readingDataRouter.get('/:studentId/books', getBooksReadByStudent)

module.exports = readingDataRouter;