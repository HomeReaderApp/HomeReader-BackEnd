const express = require('express')
const studentRouter = express.Router()
const { createStudent, updateStudent, deleteStudent, getStudentsByClass } = require('../controllers/student_controller')

studentRouter.post('/', createStudent)

studentRouter.put('/:studentId', updateStudent)

studentRouter.delete('/:studentId', deleteStudent)

studentRouter.get('/:classId', getStudentsByClass)

module.exports = studentRouter