 const { Schema, model } = require('mongoose')
const {appConfig} = require('../config')
const productoSchema = new Schema({
  //campos
  codigo: {
    type: String,
    required: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: false,
    trim: true
  },
  precio: {
    type: Number,
    required: false,
    trim: true
  },
  existencia: {
    type: Number,
    required: false,
    trim: true,
  },
  estado: {
    type: Boolean,
    required: false,
    trim: true,
  },
  imgUrl: {
    type: String,
    required: false,
    trim: true
  }
}
);

productoSchema.methods.setImgUrl=function setImgUrl (filename) {
  const {host,port} = appConfig
  this.imgUrl=`${host}:${port}/public/${filename}`
}
module.exports = model("Producto", productoSchema);



// const mongoose = require('mongoose')
// const { appConfig } = require('../config')

// const Schema = mongoose.Schema

// const productoSchema = Schema({
//   codigo: String,
//   nombre: String,
//   description: String,
//   precio: Number,
//   existencia: Number,
//   estado: Boolean,
//   imgUrl: String
// }, {
//   timestamps: true
// })

// productoSchema.methods.setImgUrl = function setImgUrl (filename) {
//   const { host, port } = appConfig
//   this.imgUrl = `${host}:${port}/public/${filename}`
// }

// module.exports = mongoose.model('Producto', productoSchema)
