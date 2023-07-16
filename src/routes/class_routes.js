const express = require('express');
const classRouter = express.Router();
// const authenticateMiddleware = require('../middlewares/authenticateMiddleware');
const Class = require('../models/class');
const { createClass, getTeacherClasses } = require('../controllers/class_controller')


// Create a class for the authenticated teacher user
classRouter.post('/', createClass);

// Route for getting a teacher user's classes
classRouter.get('/:teacherId', getTeacherClasses);

module.exports = classRouter;