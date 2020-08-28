const { Schema, model } = require('mongoose')

const DiretorSchema = new Schema({
  nome: {
    type: String,
    required: true,
    maxlength: 200,
    trim: true
  },
  biografia: {
    type: String,
    trim: true
  },
  imagem: {
    type: String,
    trim: true
  },
  filmes: [{
    type: Schema.Types.ObjectId,
    ref: 'Filme'
  }]
},
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = model('Diretor', DiretorSchema)