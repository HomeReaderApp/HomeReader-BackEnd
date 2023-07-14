const express = require('express')
const { getTeacherUsers, registerUser } = require('../controllers/teacher_controller')
const teacherUserRouter = express.Router()

teacherUserRouter.get("/", getTeacherUsers)

teacherUserRouter.post('/register', registerUser)

// userRouter.get("/:id", getUserById)

// userRouter.post("/register", userRegister)

module.exports = teacherUserRouter