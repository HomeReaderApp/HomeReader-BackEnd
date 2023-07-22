const express = require('express')
const studentRouter = express.Router()
const { createStudent, updateStudent, deleteStudent, getStudentsByClass } = require('../controllers/student_controller')
const { isAuthenticated, isClassOwner } = require('../middlewares/user_middleware')
const { isStudentExist } = require('../middlewares/student_middleware')

studentRouter.post('/:classId', isAuthenticated, isClassOwner, createStudent)

studentRouter.put('/:studentId', isAuthenticated, isStudentExist, updateStudent)

studentRouter.delete('/:studentId', isAuthenticated, isStudentExist, deleteStudent)

studentRouter.get('/:classId', isAuthenticated, isClassOwner, getStudentsByClass)

module.exports = studentRouter