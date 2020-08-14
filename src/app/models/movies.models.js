const { Schema, model } = require('mongoose')

const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: false,
    trim: true
  },
  age: {
    type: Number,
    required: false
  },
  older18: {
    type: Boolean,
    required: true
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)
module.exports = model('fileschema', MovieSchema)