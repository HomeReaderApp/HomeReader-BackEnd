const express = require('express')
const {getAllClasses, createClass} = require('../controllers/class_controller')
const classRouter = express.Router()
const Class = require('../models/classes')
const Student = require('../models/students')

classRouter.get('/', getAllClasses)

classRouter.post('/', createClass)

// Create and add a student to a specified class
classRouter.post('/:classId/addStudent', async(request, response) => {
    const classId = request.params.classId;
    const studentData = request.body;
    const selectedClass = await Class.findById(classId)
    const newStudent = new Student(studentData)
    await newStudent.save()
    selectedClass.students.push(newStudent)
    await selectedClass.save()
    response.status(201)
    response.json({
        message: "Student added to class successfully"
    })
})

module.exports = classRouter