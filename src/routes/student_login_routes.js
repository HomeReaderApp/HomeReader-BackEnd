const express = require('express')
const { studentUserLogin } = require('../controllers/student_login_controller')
const studentUserRouter = express.Router()

studentUserRouter.post('/login', studentUserLogin)

module.exports = studentUserRouter