//-- Importando dependencias para configurar o banco de dados --//
const mongoose = require('mongoose')
require('dotenv').config()
let db = null

//-- Montando a URI do banco de dados --//
const URI_DATABASE = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

//-- Criando a conexão com o banco de dados --//
db = mongoose.connect(URI_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch(error => console.log(`Problema ao conectar no banco de dados = ERRO : ${error}`))

//-- Exportando o banco de dados --//
module.exports = { db }