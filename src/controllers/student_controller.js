const Student = require('../models/student');

// Create a new student
const createStudent = async (request, response) => {
  try {
    // Create a new instance of the Student model
    const newStudent = new Student({
      studentName: request.body.studentName,
      yearLevel: request.body.yearLevel,
      loginCode: request.body.loginCode,
      classId: request.body.classId
    });

    // Save the new student to the database
    const savedStudent = await newStudent.save();

    response.status(201).json(savedStudent);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Update a student by ID
const updateStudent = async (request, response) => {
    try {
      // Retrieve the student ID from the request parameters
      const studentId = request.params.studentId;
  
      // Find the student by ID and update its properties
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        {
          studentName: request.body.studentName,
          yearLevel: request.body.Level,
          loginCode: request.body.loginCode,
          classId: request.body.classId
        },
        { new: true }
      );
  
      response.status(200).json({ student: updatedStudent });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error updating student' });
    }
  };

// Delete a student by ID
const deleteStudent = async (request, response) => {
    try {
  
      // Find the student by ID and remove it
      await Student.findByIdAndRemove(request.params.studentId);
  
      response.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error deleting student' });
    }
  };

// Get all students in a class
const getStudentsByClass = async (request, response) => {
  try {
    // Find all students with the given classId
    const students = await Student.find({ classId: request.params.classId });

    response.status(200).json(students);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = { 
    createStudent, 
    updateStudent,
    deleteStudent,
    getStudentsByClass 
};



