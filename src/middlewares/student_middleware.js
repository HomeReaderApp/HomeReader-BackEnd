const Student = require('../models/student.js')

const isStudentExist = async (request, response, next) => {
    try {
      const studentId = request.params.studentId;
      const existingStudent = await Student.findById(studentId);
      
      if (!existingStudent) {
        return response.status(404).json({ error: 'Student not found.' });
      }
  
      request.targetStudent = existingStudent;
      next();
    } catch (error) {
      response.status(500).json({ error: 'Error finding student.' });
    }
  };

  module.exports = {
    isStudentExist,
  }