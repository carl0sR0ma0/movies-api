const { Schema, model } = require('mongoose')

const filmeSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  genero: {
    type: String,
    required: false,
    trim: true
  },
  ano: {
    type: Number,
    required: false
  },
  maior18: {
    type: Boolean,
    required: true
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)
module.exports = model('filmeschema', filmeSchema)