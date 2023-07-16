const Class = require('../models/class');

// Controller method for creating a new class
async function createClass(request, response) {
  try {
    // Create a new instance of the Class model
    const newClass = new Class({
      className: request.body.className,
      teacherId: request.body.teacherId
    });

    // Save the new class to the database
    const savedClass = await newClass.save();

    response.status(201).json(savedClass);
  } catch (error) {
    console.error('Error creating class:', error);
    response.status(500).json({ error: 'Failed to create class' });
  }
}

async function getTeacherClasses(request, response){
  try{
    classes = await Class.find({teacherId : request.params.teacherId})
    response.status(200).json(classes);
  } catch (error) {
    console.error('Error retrieving classes:', error);
    response.status(500).json({ error: 'Failed to retrieve classes' });
  }
}


module.exports = {
  createClass,
  getTeacherClasses
};


