const express = require('express')
const route = express.Router()
const Filme = require('./../controllers/filmes.controller')

route.post('/criar', Filme.criarFilme)

module.exports = route