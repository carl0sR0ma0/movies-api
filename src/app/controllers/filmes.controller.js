const filmeschema = require('../models/filme.model')

/**
 * Função para definir quais campos devem ser buscados ao realizar um find no banco de dados
 * O parâmetro campos é obrigatório
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

  //-- Método para inserir um dado no banco de dados
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

  /** Método para visualizar todos os campos do banco de dados,
   *  utilizando QueryParams para definir o valor a ser passado na função para definir os campos que
   *  devem ser buscados
  */ 
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

  //-- Método para visualizar apenas um dado de acorddo com o parâmetro obrigatório especificado na URL
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

  atualizarUmFilme(req, res) {
    //-- Guarda na constante nomeDoFilmeParaSerAtualizado o parâmetro nome que vem da URL do endpoint.
    const nomeDoFilmeParaSerAtualizado = req.params.nome
    //-- Guarda na constante novoNomeDoFilme o valor da chave nome que vem do corpo da requisição
    const novoNomeDoFilme = req.body.nome
    
    /**
     * Chamando o método de update do banco de dados e passando o nome que deve ser atualizado, e
     * e passando para $set o novo nome através do corpo da requisição
    **/   
    filmeschema.updateOne({nome: nomeDoFilmeParaSerAtualizado}, { $set: req.body }, (err, data) => {
      if (err) {
        //-- Aqui só ocorre quando tem algum erro ao tentar atualizar
        res.status(500).send({message: "Houve um erro ao processar a sua atualização", error: err})
      } else {
        //-- Verifica se n(numero de registros modificados) é maior que 0, ou seja que o registro foi modificado
        if (data.n > 0) {
          //-- Aí ele faz uma busca, procurando no banco o novo nome do filme passado
          filmeschema.findOne({nome: novoNomeDoFilme}, (err, result) => {
            if (err) {
              res.status(500).send({message: "Houve um erro ao processar a sua busca no filme atualizado", error: err})
            } else {
              /*
               * Se não tiver erro ele retorna uma mensagem dizendo que o filme que foi atualizado
               * teve o nome atualizado para o novo nome do filme
               */
              res.status(200).send({message: `Filme ${nomeDoFilmeParaSerAtualizado} teve seu nome 
              atualizado para ${novoNomeDoFilme}`, filme: result })
            }
          })
        }
      }
    })
  }
  
  apagarUmFilme(req, res) {
    //-- Guardando numa variável o valor do parâmetro nome do endpoint.
    const nomeDoFilmeParaSerApagado = req.params.nome

    //-- Chamando o método deleteOne que vai apagar o registro do banco de dados, nele passa o nome do filme que vai ser apagado.
    filmeschema.deleteOne({nome: nomeDoFilmeParaSerApagado}, (err) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao apagar um", error: err })
      } else {
        res.status(200).send({message: `O filme ${nomeDoFilmeParaSerApagado} foi apagado com sucesso!`})
      }
    })
  }
}

module.exports = new Filme()