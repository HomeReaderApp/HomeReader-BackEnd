const bcrypt = require('bcrypt')
const TeacherUser = require('../models/teacherUser')

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
    // const { firstName, lastName, schoolName, username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await TeacherUser.findOne({ username: request.body.username });
    if (existingUser) {
      return response
      .status(400)
      .json({ error: 'Username is already taken' });
    }

    // Generate a salt for password hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    // Create a new user
    const newUser = new TeacherUser({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      schoolName: request.body.schoolName,
      username: request.body.username,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    return response.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle any errors that occur during registration
    return response.status(500).json({ error: 'Failed to register user' });
  }
}



// // logout user
// const logOutUser = (request, response) => {

// }

module.exports = {
    getTeacherUsers,
    registerUser
}