const Class = require('../models/class');
const TeacherUser = require("../models/teacherUser")

// Controller method for creating a new class
async function createClass(request, response) {
  let user = await TeacherUser.findOne({username: request.user.username})
  try {
    // Create a new instance of the Class model
    let newClass = new Class({
      className: request.body.className
    });

    // Save the new class to the database
    await newClass.save();
    user.classes.push(newClass._id)
    await user.save()

    response.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    response.status(500).json({ error: 'Failed to create class' });
  }
}

async function getTeacherClasses(request, response){
  try{
    let classes = await Class.find({teacherId : request.params.teacherId})
    response.status(200).json(classes);
  } catch (error) {
    console.error('Error retrieving classes:', error);
    response.status(500).json({ error: 'Failed to retrieve classes' });
  }
}

// Get a specific teacher's class
async function getTeacherClass(request, response) {
  try {
    // Find the specified class by its ID and teacherId
    const teacherClass = await Class.findOne({ className: request.params.className, teacherId: request.params.teacherId });

    if (!teacherClass) {
      return response.status(404).json({ error: 'Class not found' });
    }

    response.status(200).json(teacherClass);
  } catch (error) {
    console.error('Error retrieving class:', error);
    response.status(500).json({ error: 'Failed to retrieve class' });
  }
}

module.exports = {
  createClass,
  getTeacherClasses,
  getTeacherClass
};



