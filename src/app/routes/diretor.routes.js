const express = require('express')
const route = express.Router()
const Diretor = require('./../controllers/diretor.controller')

route.get('/listarTodos', Diretor.buscarTodosOsDiretores)
route.get('/listarUm/:nomeDiretor', Diretor.buscarOsFilmesDeUmDiretorPeloNomeDele)
route.post('/criar', Diretor.criarUmDiretor)
route.get('/validarNomeDiretor', Diretor.validarNomeDiretor)

module.exports = route