const express = require('express')
const studentRouter = express.Router()
const { createStudent, getStudentById, updateStudent, deleteStudent, getStudentWithReadingData } = require('../controllers/student_controller')
const { getBooksReadByStudent, getCommentsByStudent, getFavouriteBooks, getCommentsForClass } = require('../controllers/reading_form_controller')
const { isAuthenticated, isClassOwner } = require('../middlewares/user_middleware')
const { isStudentExist } = require('../middlewares/student_middleware')

studentRouter.post('/:classId/add-student', isAuthenticated, isClassOwner, createStudent)

studentRouter.put('/update-student/:studentId', isAuthenticated, isStudentExist, updateStudent)

studentRouter.delete('/delete-student/:studentId', isAuthenticated, isStudentExist, deleteStudent)

studentRouter.get('/get-student/:studentId', isAuthenticated, isStudentExist, getStudentById)

studentRouter.get('/reading-data/:studentId', isAuthenticated, getBooksReadByStudent)

studentRouter.get('/student-profile/:studentId', isAuthenticated, getStudentWithReadingData)

studentRouter.get('/comments/:studentId', isAuthenticated, getCommentsByStudent)

studentRouter.get('/favourite-books/:classId', isAuthenticated, getFavouriteBooks)

studentRouter.get('/comments/:classId', isAuthenticated, getCommentsForClass)





module.exports = studentRouter