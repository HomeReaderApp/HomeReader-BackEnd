const express = require('express')
const {getClass, createClass} = require('../controllers/class_controller')
const classRouter = express.Router()

classRouter.get('/', getClass)

classRouter.post('/', createClass)

module.exports = classRouter