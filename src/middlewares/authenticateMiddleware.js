// const jwt = require('jsonwebtoken');
// const TeacherUser = require('../models/teacherUser');

// // function to authenicate a user on different routes
// function authenticateMiddleware(request, response, next) {
//   try {
//     // Get the JWT token from the request headers
//     const token = request.headers.authorization.split(' ')[1]; // Assuming the token is passed in the "Authorization" header

//     // Verify and decode the JWT token
//     const decodedToken = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key

//     // Find the user based on the decoded token's information
//     const user = TeacherUser.findById(decodedToken.userId);

//     if (!user) {
//       return response.status(401).json({ error: 'Unauthorized' });
//     }

//     // Attach the user object to the request for later use
//     request.user = user;

//     // Call the next middleware or route handler
//     next();
//   } catch (error) {
//     // If there's an error with token verification, return an error response
//     return response.status(401).json({ error: 'Unauthorized' });
//   }
// }
const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticate = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key');

    // Set the decoded user information in the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;


  