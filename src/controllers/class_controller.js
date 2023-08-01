const Class = require('../models/class');
const TeacherUser = require("../models/teacherUser")

// Controller method for creating a new class
async function createClass(request, response) {
  // let user = await TeacherUser.findById(request.user.user_id)
  try {
    // Create a new instance of the Class model
    let newClass = new Class({
      className: request.body.className,
    });

    // Save the new class to the database
    await newClass.save();
    request.currentUser.classes.push(newClass._id)
    await request.currentUser.save()
  

    response.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    response.status(500).json({ error: 'Failed to create class' });
  }
}

// Get a teachers classes (all)
async function getTeacherClasses(request, response){
  try{
    let classes = request.currentUser.classes
    const classNames = await Class.find({ _id: { $in: classes } })
    if (!classNames || classNames.length === 0) {
      console.log('No classes found for the given user.')
      }
    response.status(200).json(classNames);
  } catch (error) {
    console.error('Error retrieving classes:', error);
    response.status(500).json({ error: 'Failed to retrieve classes' });
  }
}

// Get a specific teacher's class
async function getTeacherClass(request, response) {
  let classId = request.params.classId
  try {
    // Find the specified class by its ID and teacherId
    const teacherClass = await Class.findById(classId).populate('students', 'firstName lastName loginCode');

    if (!teacherClass) {
      return response.status(404).json({ error: 'Class not found' });
    }

    response.status(200).json(teacherClass);
  } catch (error) {
    console.error('Error retrieving class:', error);
    response.status(404).json({ error: 'Failed to retrieve class' });
  }
}

module.exports = {
  createClass,
  getTeacherClasses,
  getTeacherClass
};



