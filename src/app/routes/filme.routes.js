const express = require('express')
const route = express.Router()
const Filme = require('../controllers/filme.controller')

route.post('/criar', Filme.criarFilme)
route.get('/listarTodos', Filme.buscarTodosOsFilmes)
route.get('/listarUm/:nomeFilme', Filme.buscarUmFilmePeloNome)
route.get('/validarNomeFilme', Filme.validarNomeFilme)

module.exports = route