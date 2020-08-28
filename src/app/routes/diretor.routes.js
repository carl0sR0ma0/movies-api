const express = require('express')
const route = express.Router()
const Diretor = require('./../controllers/diretor.controller')

route.get('/listarTodos', Diretor.buscarTodosOsDiretores)
route.get('/listarUm/:nomeDiretor', Diretor.buscarOsFilmesDeUmDiretorPeloNomeDele)

module.exports = route