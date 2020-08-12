//-- Importando dependencias necessárias para rodar a minha API --//
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000

//-- Configurando o body parser --//
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.text())
// app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/json' }))

//-- Configurando o CORS --//
app.use(cors())

//-- Configurando cabeçalhos de response PADRÃO --//
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

//-- Configurando o endpoint / para responder um JSON com uma mensagem --//
app.get('/', (req, res) => {
  res.send({ message: `API ouvindo na porta ${PORT}`})
})

//-- Iniciando o servidor da API na porta configurada na variável de ambiente ou 3000
app.listen(PORT, () => console.log(`API ouvindo na porta ${PORT}`))