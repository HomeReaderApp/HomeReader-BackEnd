const User = require('../models/users')

// This function gets a list of all teacher users
const getUsers = async (request, response) => {
    users = await User.find()
    response.json({
        users: users
    })
}

// Finds a specific user by id
const getUserById = async (request, response) => {
    user = await User.findOne({id:request.id})
    response.json({
        "user": user
    })
}

// This function will register a new user with a firstName, lastName, username, password and school
// First it will check if the user already exists, then create and save the user, then log them in.
const userRegister = async (request, response) => {
    let newUser = new User({
        firstName : request.body.firstName,
        lastName: request.body.lastName,
        username: request.body.username,
        password: request.body.password,
        schoolName: request.body.schoolName
    })

    await newUser.save()
    response.status(201)

    response.json({
        user: newUser
    })
}

const loginUser = (request, response) => {
    
}

module.exports = {
    getUsers,
    getUserById,
    userRegister
}