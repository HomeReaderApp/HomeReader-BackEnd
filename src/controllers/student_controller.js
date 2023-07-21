const Student = require('../models/student');
const TeacherUser = require('../models/teacherUser')
const Class = require('../models/class')

// Create a new student
const createStudent = async (request, response) => {
  try {
  let user = await TeacherUser.findById(request.user.user_id)
  let classId = await request.params.classId
  if (!user.classes.includes(classId)) {
    return response.status(403).json({ error: 'You are not authorized to modify this class.' });
  }
    // Create a new instance of the Student model
    const newStudent = new Student({
      studentName: request.body.studentName,
      yearLevel: request.body.yearLevel,
      loginCode: request.body.loginCode
    });

    // Save the new student to the database
    await newStudent.save();
    const targetClass = await Class.findById(classId)
    targetClass.students.push(newStudent._id)
    await targetClass.save()

    response.status(201).json(newStudent);
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
      const studentId = request.params.studentId
      const existingStudent = await Student.findById(studentId)
      
      // Find the student by ID and remove it
      // const existingStudent = request.params.studentId
      if (!existingStudent) {
        return response.status(404).json({ error: 'Student not found.' });
      }
      await Class.updateMany(
        { students: studentId },
        { $pull: { students: studentId } }
      );
      // await Student.findByIdAndRemove(existingStudent);
      await Student.deleteOne({ _id: studentId })
      
  
      response.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error deleting student' });
    }
  };

// Get all students in a class
const getStudentsByClass = async (request, response) => {
  try {
    let user = await TeacherUser.findById(request.user.user_id)
    const classId = request.params.classId;

    // Find the class by its _id
    const targetClass = await Class.findById(classId);

    if (!targetClass) {
      return response.status(404).json({ error: 'Class not found.' });
    }

    // Check if the authenticated user owns the class
    if (!user.classes.includes(classId)) {
      return response.status(403).json({ error: 'You are not authorized to access this class.' });
    }

    // Find all students in the class using the student IDs stored in the 'students' array
    const students = await Student.find({ _id: { $in: targetClass.students } });

    response.status(200).json(students);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

module.exports = { 
    createStudent, 
    updateStudent,
    deleteStudent,
    getStudentsByClass 
};



