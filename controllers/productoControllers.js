const usarCtrl= {};

const Producto=require('../models/Producto')


usarCtrl.getProducto=async(req,res)=>{
    const productos=await Producto.find();
    res.json(productos);
}

usarCtrl.crearProducto=async(req,res)=>{
    const {} =req.body;

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
    const productoGuardado = await nuevoProducto.save();
    res.json(productoGuardado);
}


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