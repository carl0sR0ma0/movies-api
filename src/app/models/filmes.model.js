const { Schema, model } = require('mongoose')

const filmeSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  genero: {
    type: String,
    required: true,
    trim: true
  },
  ano: {
    type: Number,
    required: false
  },
  classificacao: {
    type: String,
    required: false
  },
  estudio: {
    type: String,
    trim: true
  },
  duracao: {
    type: Number
  },
  imagem: {
    type: String,
    required: true,
    trim: true
  },
  diretor: {
    type: Schema.Types.ObjectId,
    ref: 'Diretor',
    required: true
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)
module.exports = model('Filme', filmeSchema)