
const { verifyToken } = require('../services/auth_services');

const validateRequest = (request, response, next) => {
  try {
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];
      if (!token) {
        throw new Error('A token is required for authentication');
      }
      const decoded = verifyToken(token, response);
      request.user = decoded;
      next(); 

    } else {
      throw new Error('Not authenticated for this action');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validateRequest;

