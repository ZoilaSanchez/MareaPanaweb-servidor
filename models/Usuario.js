const{Schema,model} = require('mongoose')


const usuarioSchema = new Schema({
    //campos
    codigo: {
        type: String,
        required: true,
        trim:true
      },
    nombre: {
        type: String,
        required: true,
        trim:true
      },
      password: {
        type: String,
        required: false,
        trim:true
      },
      email: {
        type: String,
        required: false,
        unique: true,
        trim:true
      },
      telefono: {
        type: String,
        default: null,
        trim: true,
      },
      token: {
        type: String,
        trim: true,
      },
      confirmado: {
        type: Boolean,
        default: false,
      },

    },
      {
        timestamps: true,
      }
);


module.exports = model("Usuario", usuarioSchema);

