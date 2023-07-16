const express = require('express');
const classRouter = express.Router();
// const authenticateMiddleware = require('../middlewares/authenticateMiddleware');
const Class = require('../models/class');
const { createClass, getTeacherClasses, getTeacherClass } = require('../controllers/class_controller')
// const authenticate = require('../middlewares/authenticateMiddleware')


// Create a class for the authenticated teacher user
classRouter.post('/', createClass);

// Route for getting a teacher user's classes
classRouter.get('/:teacherId', getTeacherClasses);

// Router for getting a specific class for a teacher user
classRouter.get('/:teacherId/:className', getTeacherClass)

module.exports = classRouter;