const express = require('express');
const classRouter = express.Router();
// const Class = require('../models/class');
// const {authenticateUser} = require('../middlewares/authMiddlewares')
const {createClass, getTeacherClasses, getTeacherClass} = require('../controllers/class_controller')


// Create a class for the authenticated teacher user
classRouter.post('/', createClass);

// Route for getting a teacher user's classes
classRouter.get('/get-classes', getTeacherClasses);

// Router for getting a specific class for a teacher user
classRouter.get('/get-class/:classId', getTeacherClass)

module.exports = classRouter;