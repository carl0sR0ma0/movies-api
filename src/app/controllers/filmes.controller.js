const filmeschema = require('../models/filmes.models')

/**
 * Função para definir quais campos devem ser buscados ao realizar um find no banco de dados
 * O parâmetro campos é obrigatório
 * @param {*} campos 
 */
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

  /**Método para inserir um dado no banco de dados */
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

  /**
   * Método para visualizar todos os campos do banco de dados, utilizando QueryParams para definir o
   * valor a ser passado na função para definir os campos que devem ser buscados */
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

  /** Método para visualizar apenas um dado de acorddo com o parâmetro obrigatório especificado na URL */
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