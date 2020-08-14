const filmeschema = require('../models/filmes.models')

function definirCamposDeBusca(campos) {
  if (campos == 'maior18') {
    return { nome: 1, maior18: 1 }
  } else if (campos == 'nome') {
    return { nome: 1 }
  } else {
    return null
  }
}

class Filme {
  criarFilme(req, res) {
    const body = req.body

    filmeschema.create(body, (err, data) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
      } else {
        res.status(201).send({message: "Filme criado com sucesso no banco de dados", filme: data})
      }
    })
  }

  visualizarFilmes(req, res) {
    const campos = req.query.campos
    
    filmeschema.find({}, definirCamposDeBusca(campos), (err, data) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
      } else {
        res.status(200).send({message: "Todos os filmes foram recuperados com sucesso", filme: data})
      }
    })
  }

  visualizarUmFilme(req, res) {
    const nome = req.params.nome

    filmeschema.find({ nome: nome }, (err, data) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
      } else {
        res.status(200).send({message: `Filme ${nome} foi recuperado com sucesso`, filme: data})
      }
    })
  }
}
module.exports = new Filme()