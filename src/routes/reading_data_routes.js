const express = require('express');
const readingDataRouter = express.Router();
const { postReadingForm, getBooksReadByStudent } = require('../controllers/reading_form_controller');

// POST route for submitting a reading form
readingDataRouter.post('/submit-reading-form', postReadingForm);

// route to get a list of books read by a particular student
readingDataRouter.get('/:studentId/books', getBooksReadByStudent)

module.exports = readingDataRouter;