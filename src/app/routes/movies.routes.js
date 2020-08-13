const express = require('express')
const route = express.Router()
const Movie = require('./../controllers/movies.controller')

route.post('create', Movie.crateMovie)

module.exports = route