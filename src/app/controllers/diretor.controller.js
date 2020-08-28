const diretor = require('./../models/diretor.model')

class Diretor{

  buscarTodosOsDiretores(req, res) {
    diretor.find({}, { filmes: 0})
      .sort({ nome: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({messge: "Houve um erro ao processar sua requisição", error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({messge: "Não foram encontrados diretores para exibir"})
          } else {
            res.status(200).send({messge: "Diretores recuperados com sucesso", data: data })
          }
        }
      })
  }
}
module.exports = new Diretor()