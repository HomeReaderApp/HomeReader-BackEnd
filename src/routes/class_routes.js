const express = require('express');
const classRouter = express.Router();
// const authenticateMiddleware = require('../middlewares/authenticateMiddleware');
const Class = require('../models/class');


// Create a class for the authenticated teacher user
classRouter.post('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const { className } = req.body;

    // Create a new class
    const newClass = new Class({
      className,
      teacher: userId,
    });

    // Save the class to the database
    await newClass.save();

    // Return a success response
    return res.status(201).json({ message: 'Class created successfully' });
  } catch (error) {
    // Handle any errors that occur during class creation
    return res.status(500).json({ error: 'Failed to create class' });
  }
});

module.exports = classRouter;