const express = require('express')
const route = express.Router()
const Filme = require('./../controllers/filmes.controller')

route.post('/criar', Filme.criarFilme)
route.get('/visualizarTodos', Filme.visualizarFilmes)
route.get('/visualizarUm/:nome', Filme.visualizarUmFilme)

module.exports = route