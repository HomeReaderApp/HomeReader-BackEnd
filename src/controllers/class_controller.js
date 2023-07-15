const Class = require('../models/class');

// function for a teacher to create a class
async function createClass(request, response) {
    const userId = request.user._id;
    console.log(userId)
  try {
    // Create a new class
    const newClass = new Class({
      classname: request.body.className,
      teacher: userId
        
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



