const TeacherUser = require('../models/teacherUser');
const Class = require('../models/class');

// Middleware to check if the user is authenticated
const isAuthenticated = async (request, response, next) => {
  try {
    // Check if the user is authenticated (e.g., check for valid user_id in request.user)
    const user = await TeacherUser.findById(request.user.user_id);

    if (!user) {
      return response.status(401).json({ error: 'Authentication failed.' });
    }

    request.currentUser = user;
    next();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Middleware to check if the user owns the class
const isClassOwner = async (request, response, next) => {
  try {
    const classId = request.params.classId;

    // Find the class by its _id
    const targetClass = await Class.findById(classId);

    if (!targetClass) {
      return response.status(404).json({ error: 'Class not found.' });
    }

    // Check if the authenticated user owns the class
    if (!request.currentUser.classes.includes(classId)) {
      return response.status(403).json({ error: 'You are not authorized to access this class.' });
    }

    request.targetClass = targetClass;
    next();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  isAuthenticated,
  isClassOwner,
};
