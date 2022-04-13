const usarCtrl= {};

const Producto=require('../models/Producto')
const { v4: uuidv4 } = require('uuid');
const identificador =uuidv4().split("-")[1]

usarCtrl.getProducto=async(req,res)=>{
    const productos=await Producto.find();
    return res.status(200).json({ productos });
}

usarCtrl.crearProducto=async(req,res)=>{

   /* const nuevoProducto=new Producto({
        codigo: codigo,
        nombre:nombre,
        descripcion:descripcion,
        precio: precio,
        existencia: existencia,
        estado: estado,
        imgUrl: imgUrl
    })*/

   /* if (req.file){
        const {filename}=req.file
        nuevoProducto.setImgUrl(filename)
    }*/
    const nuevoProducto = new Producto(req.body);
    nuevoProducto.codigo= req.body.codigo+"-"+identificador;
    const productoGuardado = await nuevoProducto.save();
    res.json(productoGuardado);
}

usarCtrl.actualizar_info = async (req, res) => {
  const { codigo } = req.params;
  console.info(codigo);
  // prevenir tareas duplicadas
  const producto_token = await Producto.findOne({ codigo });
  console.info(producto_token);
  if (!producto_token) {
    const error = new Error("Codigo incorrecto");
    return res.status(404).json({ msg: error.message });
  }

  const producto =  await Producto.findById(producto_token.id);
  producto.nombre = req.body.nombre || producto.nombre;
  producto.descripcion = req.body.descripcion || producto.descripcion;
  producto.precio = req.body.precio || producto.precio;
/*  producto.existencia = req.body.existencia || producto.existencia;*/
  producto.estado = req.body.estado || producto.estado;
  producto.imgUrl = req.body.imgUrl || producto.imgUrl;
  try {
    const productoActualizado = await producto.save();
    res.json(productoActualizado)
  } catch (error) {
    console.log(error);
  }
};

usarCtrl.eliminar_producto = async (req, res) => {
  const { codigo } = req.params;
  // prevenir tareas duplicadas
  const existe_producto = await Producto.findOne({ codigo });

  if (!existe_producto) {
    const error = new Error("Codigo incorrecto");
    return res.status(404).json({ msg: error.message });
  }

  const producto =  await Producto.findById(existe_producto.id);
  try {
    await producto.deleteOne()

    res.json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = usarCtrl;


/* const Product = require('../models/Producto')

async function addProduct (req, res) {
  try {
    const {
        codigo,
        nombre,
        description,
        precio,
        existencia,
        estado,
        imgUrl
    } = req.body

    const product = Product({
        codigo,
        nombre,
        description,
        precio,
        existencia,
        estado,
        imgUrl
    })

    if (req.file) {
      const { filename } = req.file
      product.setImgUrl(filename)
    }

    const productStored = await product.save()

    res.status(201).send({ productStored })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

async function getProducts (req, res) {
  const products = await Product.find().lean().exec()
  res.status(200).send({ products })
}

module.exports = {
  addProduct,
  getProducts
} */