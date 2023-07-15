const Class = require('../models/Class');

// function for a teacher to create a class
async function createClass(request, response) {
  try {
    // Create a new class
    const newClass = new Class({
      classname: request.body.className,
      teacher: request.user._id, 
    });

    // Save the class to the database
    await newClass.save();

    // Return a success response
    return response.status(201).json({ message: 'Class created successfully' });
  } catch (error) {
    // Handle any errors that occur during class creation
    return response.status(500).json({ error: 'Failed to create class' });
  }
}

module.exports = {
  createClass,
};


