const express = require('express')
const studentRouter = express.Router()
const { createStudent, deleteStudent, getStudentsByClass } = require('../controllers/student_controller')

studentRouter.post('/', createStudent)

studentRouter.delete('/:studentId', deleteStudent)

studentRouter.get('/:classId', getStudentsByClass)

module.exports = studentRouter