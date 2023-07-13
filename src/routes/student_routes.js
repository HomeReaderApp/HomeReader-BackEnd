const express = require('express')
const studentRouter = express.Router()
const {addStudent, getStudents} = require('../controllers/student_controller')

studentRouter.get('/', getStudents)
// studentRouter.post('/', addStudent)

module.exports = studentRouter