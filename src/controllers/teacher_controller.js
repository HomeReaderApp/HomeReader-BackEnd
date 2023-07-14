const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(request.body.password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ error: 'Invalid username or password' });
    }

    // Password is correct, authentication successful
    // generate a JWT token 
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

   // Return the token in the response
    return response.status(200).json({ token });
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