const express = require('express')
const classRouter = express.Router()
const { createClass } = require('../controllers/class_controller')

classRouter.post('/create', createClass)

module.exports = classRouter