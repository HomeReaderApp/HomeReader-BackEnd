const express = require('express')
const studentRouter = express.Router()
const { createStudent, getStudentById, updateStudent, deleteStudent } = require('../controllers/student_controller')
const { getFavouriteBooks } = require('../controllers/reading_form_controller')
const { isAuthenticated, isClassOwner } = require('../middlewares/user_middleware')
const { isStudentExist } = require('../middlewares/student_middleware')

studentRouter.post('/:classId/add-student', isAuthenticated, isClassOwner, createStudent)

studentRouter.put('/update-student/:studentId', isAuthenticated, isStudentExist, updateStudent)

studentRouter.delete('/delete-student/:studentId', isAuthenticated, isStudentExist, deleteStudent)

studentRouter.get('/get-student/:studentId', isAuthenticated, isStudentExist, getStudentById)

studentRouter.get('/favourite-books/:classId', isAuthenticated, getFavouriteBooks)






module.exports = studentRouter