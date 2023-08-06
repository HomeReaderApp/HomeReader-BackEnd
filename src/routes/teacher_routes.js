const express = require('express')
const { getTeacherUsers, registerUser, loginUser, logoutUser } = require('../controllers/teacher_controller')
const teacherUserRouter = express.Router()

// teacherUserRouter.get("/", getTeacherUsers)

teacherUserRouter.post('/register', registerUser)

teacherUserRouter.post('/login', loginUser)

teacherUserRouter.post('/logout', logoutUser)

module.exports = teacherUserRouter