const express = require('express');
const classRouter = express.Router();
const {createClass, getTeacherClasses, getTeacherClass} = require('../controllers/class_controller')
const { isAuthenticated } = require('../middlewares/user_middleware')


// Create a class for the authenticated teacher user
classRouter.post('/create-class', isAuthenticated, createClass);

// Route for getting a teacher user's classes
classRouter.get('/:teacherId/get-classes', isAuthenticated, getTeacherClasses);

// Router for getting a specific class for a teacher user
classRouter.get('/get-class/:classId', isAuthenticated, getTeacherClass)

module.exports = classRouter;