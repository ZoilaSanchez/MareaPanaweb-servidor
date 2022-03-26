const usarCtrl= {};

const Usuario=require('../models/Usuario')


usarCtrl.getUsuario=async(req,res)=>{
    const usuarios=await Usuario.find();
    res.json(usuarios);
}

usarCtrl.crearUsuario=async(req,res)=>{
    const {codigo,nombre} =req.body;
    const nuevoUsuario=new Usuario({
        codigo: codigo,
        nombre:nombre
    })
    await nuevoUsuario.save();
    res.send("el usuario fue guardado")
}


module.exports = usarCtrl;
