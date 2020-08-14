//-- Importando dependencias necessárias para rodar a minha API --//
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const database = require('./src/config/database')

//-- Importando rotas da aplicação --//
const MoviesRoutes = require('./src/app/routes/movies.routes')

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

app.use('/movies', MoviesRoutes)

//-- Configurando o endpoint * que é retornado uma URL não requisitada não existe --//
app.use('*', (req, res) =>{
  res.send({ message: 'API não encontrada!' })
})

//-- Iniciando o servidor da API na porta configurada na variável de ambiente ou 3000
app.listen(PORT, () => console.log(`API ouvindo na porta ${PORT}`))