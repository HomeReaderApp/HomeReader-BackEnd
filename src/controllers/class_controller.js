const Class = require('../models/classes')

// Gets a list of all the classes
const getAllClasses = async (request, response) => {
    let allClasses = await Class.find()
    response.json(allClasses)
}
// Creates a new class
const createClass = async (request, response) => {
    let newClass = new Class({
        className : request.body.className
    })

    await newClass.save()
    response.status(201)
    response.json({
        class: newClass
    })
}

module.exports = {
    getAllClasses,
    createClass
}
