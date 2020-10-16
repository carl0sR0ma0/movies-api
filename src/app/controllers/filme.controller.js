const filme = require('../models/filme.model')
const diretor = require('../models/diretor.model')

class Filme {

  //-- Método para inserir um dado no banco de dados
  criarFilme(req, res) {
    const reqBody = req.body
    const idDiretor = reqBody['diretor']

    filme.create(reqBody, (err, filme) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err })
      } else {
        diretor.findById(idDiretor, (err, diretor) => {
          if (err) {
            res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err })
          } else {
            diretor.filmes.push(filme)
            diretor.save({}, (err) => {
              if (err) {
                res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err })
              } else {
                res.status(201).send({message: "Filme criado com sucesso", data: filme })
              }
            })
          }
        })
      }
    })
  }

  /** Método para visualizar todos os campos do banco de dados,
   *  utilizando QueryParams para definir o valor a ser passado na função para definir os campos que
   *  devem ser buscados
  */ 
  buscarTodosOsFilmes(req, res) {    
    
    filme.find({})
      .populate('diretor', { nome: 1, imagem: 1 })
      .sort({ nome: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
        } else {
          if (data.length <= 0) {
            res.status(200).send({message: "Não existem filmes cadastrados na base de dados" })  
          } else {
            res.status(200).send({message: "Todos os filmes foram recuperados com sucesso", data: data})
          }
        }
      })
  }

  //-- Método para visualizar apenas um dado de acorddo com o parâmetro obrigatório especificado na URL
  buscarUmFilmePeloNome(req, res) {
    const { nomeFilme } = req.params

    if (nomeFilme == undefined || nomeFilme == 'null') {
      res.status(400).send({message: "O nome do filme deve ser obrigatoriamente preenchido", })
    }

    filme.findOne({ nome: nomeFilme })
      .populate('diretor', { nome: 1, imagem: 1 })
      .exec((err, data) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
      } else {
        if (data == null) {
          res.status(200).send({message: `Filme não encontrado na base de dados`, })
        } else {
          res.status(200).send({message: `Filme ${nomeFilme} foi recuperado com sucesso`, data: data})
        }
      }
    })
  }

  validarNomeFilme(req, res) {
    const nome = req.query.nome.replace(/%20/g, " ")

    filme.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, (err, result) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
      } else {
        if (result.length > 0) {
          res.status(200).send({message: "Já existe um filme cadastrado com esse nome", data: result.length })
        } else {
          res.status(200).send({message: "Filme disponível", data: result.length })
        }
      }
    })
  }

  update(req, res) {
    const { movieId } = req.params
    const reqBody = req.body
    const directorId = reqBody['diretor']

    filme.updateOne({ _id: movieId }, { $set: reqBody }, (err, filme) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
      } else {
        diretor.findOne({ filmes: movieId }, (err, result) => {
          if (err) {
            res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
          } else {
            if (result['_id'] == directorId) {
              res.status(200).send({ message: "O Filme foi atualizado", data: filme })
            } else {
              result.filmes.pull(movieId)
              result.save({}, (err) => {
                if (err) {
                  res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
                } else {
                  diretor.findById(directorId, (err, diretor) => {
                    if (err) {
                      res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
                    } else {
                      diretor.filmes.push(movieId)
                      diretor.save({}, (err) => {
                        if (err) {
                          res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
                        } else {
                          res.status(200).send({ message: "O Filme foi atualizado", data: filme })
                        }
                      })
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }

  delete(req, res) {
    const { movieId } = req.params

    diretor.findOne({ filmes: movieId }, (err, diretor) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
      } else {
        diretor.filmes.pull(movieId)
        diretor.save({}, (err) => {
          if (err) {
            res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
          } else {
            filme.deleteOne({_id: movieId}, (err, result) => {
              if (err) {
                res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
              } else {
                res.status(200).send({message: "Filme foi apagado com sucesso", data: result })
              }
            })
          }
        })
      }
    })
  }
}

module.exports = new Filme()