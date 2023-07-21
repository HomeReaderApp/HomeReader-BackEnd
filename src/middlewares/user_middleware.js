const TeacherUser = require('../models/teacherUser');
const Class = require('../models/class');

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // Check if the user is authenticated (e.g., check for valid user_id in request.user)
    const user = await TeacherUser.findById(req.user.user_id);

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed.' });
    }

    req.currentUser = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware to check if the user owns the class
const isClassOwner = async (req, res, next) => {
  try {
    const classId = req.params.classId;

    // Find the class by its _id
    const targetClass = await Class.findById(classId);

    if (!targetClass) {
      return res.status(404).json({ error: 'Class not found.' });
    }

    // Check if the authenticated user owns the class
    if (!req.currentUser.classes.includes(classId)) {
      return res.status(403).json({ error: 'You are not authorized to access this class.' });
    }

    req.targetClass = targetClass;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  isAuthenticated,
  isClassOwner,
};
