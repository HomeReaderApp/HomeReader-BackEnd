const jwt = require('jsonwebtoken');
const TeacherUser = require('../models/teacherUser');

// Middleware function to check JWT token and authenticate the user
const authenticateUser = async (req, res, next) => {
  try {
    // Get the JWT token from the request headers
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication failed: Token missing' });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, 'jwt_secret_key'); 

    // Find the user based on the decoded token
    const user = await TeacherUser.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed: User not found' });
    }

    // Attach the user object to the request for use in other route handlers
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed: Invalid token' });
  }
};

module.exports = authenticateUser;
