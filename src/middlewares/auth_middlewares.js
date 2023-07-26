
// const { verifyToken } = require('../services/auth_services')

// const validateRequest = (request, response, next) => {
//     try {
//         if(request.headers.authorization){
//             const token = request.headers.authorization.split(" ")[1]
//             if (!token){
//                 throw new Error ("A token is required for authentication")
//             }
//             const decoded = verifyToken(token)
//             request.user = decoded
//             return next()
//         } else {
//             throw new Error ("Not authenticated for this action")
//         }
//         return next()
//     } catch (error) {
//         next(error)
//     }
// }

// module.exports = validateRequest

const { verifyToken } = require('../services/auth_services');

const validateRequest = (request, response, next) => {
  try {
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];
      if (!token) {
        throw new Error('A token is required for authentication');
      }
      const decoded = verifyToken(token);
      request.user = decoded;
      next(); // Move this line inside the if block to proceed to the next middleware/route handler only if authenticated.
    } else {
      throw new Error('Not authenticated for this action');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validateRequest;

