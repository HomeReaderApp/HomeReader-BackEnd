const express = require('express')
const studentRouter = express.Router()
const { createStudent, updateStudent, deleteStudent, getStudentsByClass, getStudentWithReadingData } = require('../controllers/student_controller')
const { getBooksReadByStudent, getCommentsByStudent, getFavouriteBooks, getCommentsForClass } = require('../controllers/reading_form_controller')
const { isAuthenticated, isClassOwner } = require('../middlewares/user_middleware')
const { isStudentExist } = require('../middlewares/student_middleware')

studentRouter.post('/:classId/add-student', isAuthenticated, isClassOwner, createStudent)

studentRouter.put('/:studentId', isAuthenticated, isStudentExist, updateStudent)

studentRouter.delete('/:studentId', isAuthenticated, isStudentExist, deleteStudent)

studentRouter.get('/get-students-by-class/:classId', isAuthenticated, isClassOwner, getStudentsByClass)

studentRouter.get('/reading-data/:studentId', isAuthenticated, getBooksReadByStudent)

studentRouter.get('/student-profile/:studentId', isAuthenticated, getStudentWithReadingData)

studentRouter.get('/comments/:studentId', isAuthenticated, getCommentsByStudent)

studentRouter.get('/favourite-books/:classId', isAuthenticated, getFavouriteBooks)

studentRouter.get('/comments/:classId', isAuthenticated, getCommentsForClass)





module.exports = studentRouter