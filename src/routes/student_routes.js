const express = require('express')
const studentRouter = express.Router()
const { createStudent, updateStudent, deleteStudent, getStudentsByClass } = require('../controllers/student_controller')
const { isAuthenticated, isClassOwner } = require('../middlewares/user_middleware')

studentRouter.post('/:classId', isAuthenticated, isClassOwner, createStudent)

studentRouter.put('/:studentId', updateStudent)

studentRouter.delete('/:studentId', deleteStudent)

studentRouter.get('/:classId', getStudentsByClass)

module.exports = studentRouter