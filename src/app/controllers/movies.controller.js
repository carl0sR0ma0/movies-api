const movieschema = require('./../models/movies.models')

class Movie {
  crateMovie(req, res) {
    const body = req.body

    movieschema.create(body, (err, data) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
      } else {
        res.status(201).send({message: "Filme criado com sucesso no banco de dados", filme: data})
      }
    })
  }
}
module.exports = new Movie()