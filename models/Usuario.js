const{Schema,model} = require('mongoose')
const bcrypt = require('bcrypt')
const autenticacion=require('../Generales/metodos_generales.js')
const { v4: uuidv4 } = require('uuid');
const identifiador =uuidv4().split("-")[1]
const usuarioSchema = new Schema({
    //campos
    codigo: {
        type: String,
        default:identifiador,
        trim:true  
      },
    nombre: {
        type: String,
        required: true,
        trim:true
      },
      password: {
        type: String,
        required: true,
        trim:true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim:true
      },
      telefono: {
        type: String,
        default: "",
        trim: true,
      },
      token: {
        type: String,
        default: autenticacion()
      },
      confirmado: {
        type: Boolean,
        default: false,
      },
      puesto: {
        type: String,
        default: "",
      },
      estado: {
        type: Boolean,
        default: true,
      },

    },
      {
        timestamps: true,
      }
);

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

module.exports = model("Usuario", usuarioSchema);

