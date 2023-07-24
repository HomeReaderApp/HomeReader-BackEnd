const Student = require('../models/student');
const TeacherUser = require('../models/teacherUser')
const Class = require('../models/class')
const ReadingFormData = require('../models/readingData')

// Create a new student
const createStudent = async (request, response) => {
  try {
  
    // Create a new instance of the Student model
    const newStudent = new Student({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      yearLevel: request.body.yearLevel,
      loginCode: request.body.loginCode
    });

    // Save the new student to the database
    await newStudent.save();
    request.targetClass.students.push(newStudent._id);
    await request.targetClass.save()

    response.status(201).json(newStudent);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Update a student by ID
const updateStudent = async (request, response) => {
    try {
  
      // Find the student by ID and update its properties
      const updatedStudent = await Student.findByIdAndUpdate(
       request.targetStudent._id,
        {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
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
    
      await Class.updateMany(
        { students: request.targetStudent._id },
        { $pull: { students: request.targetStudent._id } }
      );
      // await Student.findByIdAndRemove(existingStudent);
      await Student.deleteOne({ _id: request.targetStudent._id })
      
  
      response.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error deleting student' });
    }
  };

// Get all students in a class
const getStudentsByClass = async (request, response) => {
  try {
    
    // Find all students in the class using the student IDs stored in the 'students' array
    const students = await Student.find({ _id: { $in: request.targetClass.students } });

    response.status(200).json(students);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

// Get student and their reading data by student ID
const getStudentWithReadingData = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find the student by ID and populate the 'readingData' field
    const studentWithReadingData = await Student.findById(studentId).populate('readingData');

    if (!studentWithReadingData) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(studentWithReadingData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { 
    createStudent, 
    updateStudent,
    deleteStudent,
    getStudentsByClass,
    getStudentWithReadingData 
};



