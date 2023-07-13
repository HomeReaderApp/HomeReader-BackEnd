const express = require('express')
const { userRegister, getUsers, getUserById } = require('../controllers/user_controller')
const userRouter = express.Router()

userRouter.get("/", getUsers)

userRouter.get("/:id", getUserById)

userRouter.post("/register", userRegister)

module.exports = userRouter