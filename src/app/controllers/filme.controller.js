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

    filme.find({ nome: nomeFilme })
      .populate('diretor', { nome: 1, imagem: 1 })
      .exec((err, data) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processar a sua requisição", error: err})
      } else {
        if (data.length <= 0) {
          res.status(200).send({message: `Filme não encontrado na base de dados`, })
        } else {
          res.status(200).send({message: `Filme ${nomeFilme} foi recuperado com sucesso`, data: data})
        }
      }
    })
  }

  // atualizarUmFilme(req, res) {
  //   //-- Guarda na constante nomeDoFilmeParaSerAtualizado o parâmetro nome que vem da URL do endpoint.
  //   const nomeDoFilmeParaSerAtualizado = req.params.nome
  //   //-- Guarda na constante novoNomeDoFilme o valor da chave nome que vem do corpo da requisição
  //   const novoNomeDoFilme = req.body.nome
    
  //   /**
  //    * Chamando o método de update do banco de dados e passando o nome que deve ser atualizado, e
  //    * e passando para $set o novo nome através do corpo da requisição
  //   **/   
  //   filme.updateOne({nome: nomeDoFilmeParaSerAtualizado}, { $set: req.body }, (err, data) => {
  //     if (err) {
  //       //-- Aqui só ocorre quando tem algum erro ao tentar atualizar
  //       res.status(500).send({message: "Houve um erro ao processar a sua atualização", error: err})
  //     } else {
  //       //-- Verifica se n(numero de registros modificados) é maior que 0, ou seja que o registro foi modificado
  //       if (data.n > 0) {
  //         //-- Aí ele faz uma busca, procurando no banco o novo nome do filme passado
  //         filme.findOne({nome: novoNomeDoFilme}, (err, result) => {
  //           if (err) {
  //             res.status(500).send({message: "Houve um erro ao processar a sua busca no filme atualizado", error: err})
  //           } else {
  //             /*
  //              * Se não tiver erro ele retorna uma mensagem dizendo que o filme que foi atualizado
  //              * teve o nome atualizado para o novo nome do filme
  //              */
  //             res.status(200).send({message: `Filme ${nomeDoFilmeParaSerAtualizado} teve seu nome 
  //             atualizado para ${novoNomeDoFilme}`, filme: result })
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
  
  // apagarUmFilme(req, res) {
  //   //-- Guardando numa variável o valor do parâmetro nome do endpoint.
  //   const nomeDoFilmeParaSerApagado = req.params.nome

  //   //-- Chamando o método deleteOne que vai apagar o registro do banco de dados, nele passa o nome do filme que vai ser apagado.
  //   filme.deleteOne({nome: nomeDoFilmeParaSerApagado}, (err) => {
  //     if (err) {
  //       res.status(500).send({message: "Houve um erro ao apagar um", error: err })
  //     } else {
  //       res.status(200).send({message: `O filme ${nomeDoFilmeParaSerApagado} foi apagado com sucesso!`})
  //     }
  //   })
  // }
}

module.exports = new Filme()