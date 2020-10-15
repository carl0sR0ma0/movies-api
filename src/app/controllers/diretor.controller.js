const diretor = require('./../models/diretor.model')

class Diretor{

  buscarTodosOsDiretores(req, res) {
    diretor.find({})
      .sort({ nome: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({message: "Houve um erro ao processar sua requisição", error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({message: "Não foram encontrados diretores para exibir"})
          } else {
            res.status(200).send({message: "Diretores recuperados com sucesso", data: data })
          }
        }
      })
  }

  buscarOsFilmesDeUmDiretorPeloNomeDele(req, res){
    const { nomeDiretor } = req.params

    if (nomeDiretor == undefined || nomeDiretor == 'null') {
      res.status(400).send({message: "O nome do diretor deve ser obrigatoriamente preenchido" })
    }

    diretor.find({ nome: nomeDiretor })
      .populate('filmes', { nome: 1, imagem: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({message: "Houve um erro ao processar sua requisição", error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({message: `O diretor ${nomeDiretor} não existe no banco de dados` })          
          } else {
            res.status(200).send({message: `O diretor ${nomeDiretor} possui filmes cadastrados`, data: data })
          }
        }
      })
  }

  criarUmDiretor(req, res) {
    const reqBody = req.body

    diretor.create(reqBody, (err, data) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processar sua requisição", error: err })
      } else {
        res.status(200).send({message: "Diretor criado com sucesso", data: data })
      }
    })
  }

  validarNomeDiretor(req, res) {
    const nome = req.query.nome.replace(/%20/g, " ")

    diretor.find({ nome: { '$regex': `^${nome}$`, '$options': 'i' } }, (err, result) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
      } else {
        if (result.length > 0) {
          res.status(200).send({message: "Já existe um diretor cadastrado com esse nome", data: result.length })
        } else {
          res.status(200).send({message: "Diretor disponível", data: result.length })
        }
      }
    })
  }
}
module.exports = new Diretor()