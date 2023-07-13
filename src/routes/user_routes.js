const express = require('express')
const { userRegister, getUsers } = require('../controllers/user_controller')
const userRouter = express.Router()

userRouter.get("/", getUsers)

userRouter.post("/register", userRegister)

module.exports = userRouter