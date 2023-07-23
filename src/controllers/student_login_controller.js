const Student = require('../models/student')
const {createStudentToken} = require('../services/auth_services')

async function studentUserLogin(request, response) {
    try {
      // Find the user by the provided username
      const user = await Student.findOne({ loginCode: request.body.loginCode });
      if (!user) {
        return response.status(401).json({ error: 'Student not found' });
      }
  
      if(user.lastName === request.body.lastName){
        const token = createStudentToken(user._id)
        return response.json({
          firstName: user.firstName,
          lastName: user.lastName,
          token: token
        })
      } else {
        response.status(401).json({ error: 'Last name does not match' });
        }
      } catch (error) {
      // Handle any errors that occur during login
      return response.status(500).json({ error: 'Failed to login' });
      }
  }

  module.exports = {
    studentUserLogin
  }