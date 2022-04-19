const usarCtrl= {};

const Usuario=require('../models/Usuario')
const mail=require('../Generales/send_mail')
const recuperar=require('../Generales/actualizar_pass')
const emailCodigo=require('../Generales/send_codigo')
const autenticacion=require('../Generales/metodos_generales')
const generarJwt=require('../Generales/generarJWT.js')
const { v4: uuidv4 } = require('uuid');




usarCtrl.getUsuario=async(req,res)=>{
    const usuarios=await Usuario.find();
    return res.status(200).json({ usuarios });
}

usarCtrl.crearUsuario=async(req,res)=>{
    const {email,nombre} =req.body;
   
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }
    try {
        // guardar usuario
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();
        // enviar email al usuario para ser confirmado
        mail({
          email,
          nombre,
          token: usuarioGuardado.token,
        });
    
        res.json(usuarioGuardado);
      } catch (error) {
        console.log(error);
      }
   
}

usarCtrl.confirmar_user = async (req, res) => {
    const { token } = req.params;
    console.log(token)
    const usuarioConfirmar = await Usuario.findOne({ token });
  
    if (!usuarioConfirmar) {
      const error = new Error("Token incorrecto");
      return res.status(404).json({ msg: error.message });
    }
  
    try {
      usuarioConfirmar.token = null;
      usuarioConfirmar.confirmado = true;
      await usuarioConfirmar.save();
      res.json({ msg: "Bienvenido a Mareapana web" });
    } catch (error) {
      console.log(error);
    }
  };

  usarCtrl.login = async (req, res) => {
    const {email, password } = req.body;
  
    //comprobando si el usuario existe
    const usuario = await Usuario.findOne({ email });
  
    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }
    
    if (usuario.email.toString() !== req.body.email.toString()) {
        const error = new Error("Las credenciales no son correctas");
        return res.status(403).json({msg: error.message});
      }

    // comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
      const error = new Error("Revise su email, la cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    }

    // Revisar al password
    if (await usuario.comprobarPassword(password)) {
      // autenticar
    


      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        codigo:  usuario.codigo,
        token: generarJwt(usuario._id),
      });
    } else {
      const error = new Error("El password es incorrecto");
      return res.status(403).json({ msg: error.message });
    }
  };


  usarCtrl.actualizar_info = async (req, res) => {
    const { codigo } = req.params;
    // prevenir tareas duplicadas
    const usuario_token = await Usuario.findOne({ codigo });
  
    if (!usuario_token) {
      const error = new Error("Codigo incorrecto");
      return res.status(404).json({ msg: error.message });
    }

    const usuario =  await Usuario.findById(usuario_token.id);
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.password = req.body.password || usuario.password;
    usuario.telefono=req.body.telefono || usuario.telefono;

  
    try {
      const usuarioActualizada = await usuario.save();
      res.json(usuarioActualizada)
    } catch (error) {
      console.log(error);
    }
  };
  


  usarCtrl.actualizar_email = async (req, res) => {
    const {email} =req.body;
    const { codigo } = req.params;
    // prevenir tareas duplicadas
    const usuario_codigo = await Usuario.findOne({ codigo });
    if (!usuario_codigo) {
      const error = new Error("Codigo incorrecto");
      return res.status(404).json({ msg: error.message });
    }

    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
        const error = new Error("Email ya registrado");
        return res.status(400).json({ msg: error.message });
    }
    try {
        // guardar usuario
        usuario_codigo.email =req.body.email;
        const nombre= usuario_codigo.nombre;
        usuario_codigo.token =  autenticacion();
        usuario_codigo.confirmado = false;
        const usuarioActualizada = await usuario_codigo.save();
        // enviar email al usuario para ser confirmado
        mail({
          email,
          nombre,
          token: usuarioActualizada.token,
        });
    
        res.json(usuarioActualizada);
      } catch (error) {
        console.log(error);
      }
  };


  usarCtrl.comprobar_token = async (req, res) => {
    const { token } = req.params;
  
    const tokenValido = await Usuario.findOne({ token });
  
    if (tokenValido) {
      res.json({ msg: "Token válido" });
    } else {
      const error = new Error("Token no válido");
      return res.status(400).json({ msg: error.message });
    }
  };



  usarCtrl.actualizar_password= async (req, res) => {
    const {codigo,email} =req.body;
   
    const existeUsuario = await Usuario.findOne({ email });
    if (!existeUsuario) {
        const error = new Error("Email no existe");
        return res.status(400).json({ msg: error.message });
    }

    if (existeUsuario.codigo.toString() !== req.body.codigo.toString()) {
        const error = new Error("Las credenciales no son correctas");
        return res.status(403).json({msg: error.message});
      }
    try {
        // guardar usuario
        existeUsuario.token = autenticacion();
        await existeUsuario.save();
        // enviar email al usuario para ser confirmado
        recuperar({
          email,
          nombre:existeUsuario.nombre,
          token: existeUsuario.token,
        });
    
        res.json("Revise su mail");
      } catch (error) {
        console.log(error);
      }
  };


  usarCtrl.nuevaPass = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const usuario = await Usuario.findOne({ token });
    if (!usuario) {
      const error = new Error("Hubo un error");
      return res.status(400).json({ msg: error.message });
    }
  
    try {
      usuario.token = null;
      usuario.password = password;
      await usuario.save();
      res.json({ msg: "Contraseña actualizada correctamente" });
    } catch (error) {
      console.log(error);
    }
  };
  

usarCtrl.recuperarCodigo = async (req, res) => {
  const {email} =req.body;
  const existeUsuario = await Usuario.findOne({ email });
 
  if (!existeUsuario) {
      const error = new Error("Email no existe");
      return res.status(400).json({ msg: error.message });
  }

  try {
      // guardar usuario
      const identificador =uuidv4().split("-")[1]
      existeUsuario.codigo = identificador;
      await existeUsuario.save();
      // enviar email al usuario para ser confirmado
      emailCodigo({
        email,
        nombre:existeUsuario.nombre,
        codigo: existeUsuario.codigo,
        });
  
      res.json("Revise su mail");
    } catch (error) {
      console.log(error);
    }
};

usarCtrl.habilitarUsuarios = async (req, res) => {
  const {email} =req.body;
  const existeUsuario = await Usuario.findOne({ email });
 
  if (!existeUsuario) {
      const error = new Error("Email no existe");
      return res.status(400).json({ msg: error.message });
  }

  try {
      // guardar usuario
      
      existeUsuario.estado = req.body.estado ;
      await existeUsuario.save();

  
      res.json(existeUsuario);
    } catch (error) {
      console.log(error);
    }
};

module.exports = usarCtrl;
