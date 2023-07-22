const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TeacherUser = require('../models/teacherUser')
const { createToken } = require("../services/auth_services")

// This function gets a list of all teacher users
const getTeacherUsers = async (request, response) => {
    let teacherUsers = await TeacherUser.find()
    response.json({
        teacherUsers: teacherUsers
    })
}

// // This function will register a new user with a firstName, lastName, username, password and school
// // First it will check if the user already exists, then create and save the user, then log them in.

async function registerUser(request, response) {
  try {
    // Check if the username is already taken
    const existingUser = await TeacherUser.findOne({ username: request.body.username });
    if (existingUser) {
      return response
      .status(400)
      .json({ error: 'Username is already taken' });
    }

    // Create a new user
    let newUser = new TeacherUser({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      schoolName: request.body.schoolName,
      username: request.body.username,
      password: bcrypt.hashSync(
        request.body.password, 
        bcrypt.genSaltSync(10))
        
    });

    // Save the user to the database
    await newUser.save();
    // return response.status(201).json({ message: 'User registered successfully' });
    const token = createToken(newUser._id, newUser.username)

    // Return a success response
    return response.status(201).json({ message: 'User registered successfully', token: token });
  } catch (error) {
    // Handle any errors that occur during registration
    return response.status(500).json({ error: 'Failed to register user' });
  }
}

// Function to log a registered user in. 
// First needs to check that the user exists
// then needs to check that the password matches
// next needs to issue a JWT token
async function loginUser(request, response) {
  try {
    // Find the user by the provided username
    const user = await TeacherUser.findOne({ username: request.body.username });
    if (!user) {
      return response.status(401).json({ error: 'Invalid username' });
    }

    if(bcrypt.compareSync(request.body.password, user.password)){
      const token = createToken(user._id, user.username)
      return response.json({
        username: user.username,
        token: token
      })
    } else {
      response.status(401).json({ error: 'Wrong password' });
      }
    } catch (error) {
    // Handle any errors that occur during login
    return response.status(500).json({ error: 'Failed to login' });
    }
}


// // logout user
async function logoutUser(request, response) {
    try {
      // Delete the JWT token from the client-side
      response.clearCookie('jwtToken'); 
  
      // Return a success response
      return response.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      // Handle any errors that occur during logout
      return response.status(500).json({ error: 'Failed to logout' });
    }
  }
  
module.exports = {
    getTeacherUsers,
    registerUser,
    loginUser,
    logoutUser
}