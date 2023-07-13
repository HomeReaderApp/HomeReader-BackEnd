const Class = require('../models/classes')

const getClass = async (request, response) => {
    let classList = await Class.find({name: request.body.name})
    response.json(classList)
}

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
    getClass,
    createClass
}
