const Student = require('../models/student')

const isStudentAuthenticated = async (request, response, next) => {
    try {
      // Check if the user is authenticated (e.g., check for valid user_id in request.user)
      const user = await Student.findById(request.user.user_id);
  
      if (!user) {
        return response.status(401).json({ error: 'Authentication failed.' });
      }
  
      request.targetStudent = user;
      next();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    isStudentAuthenticated
  }