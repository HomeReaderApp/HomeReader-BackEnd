const Student = require('../models/students');
const Class = require('../models/classes')

const getStudents = async (request, response) => {
    let studentList = await Student.find()
    response.json({studentList})
}
// const addStudent = async (request, response) => {
//     let newStudent = new Student({
//         studentName : request.body.studentName,
//         yearLevel: request.body.yearLevel,
//         loginCode: request.body.loginCode,
//         className: request.body.className
//     });
//     const classId = newStudent.className;
//     const updateClass = await Class.findByIdAndUpdate(
//       classId,
//       { $push: { students: newStudent._id } },
//       { new: true }
//     )

//     await newStudent.save();
//     response.status(201);

//     response.json({
//         student: newStudent
//     });
// };

module.exports = {
    // addStudent,
    getStudents
}