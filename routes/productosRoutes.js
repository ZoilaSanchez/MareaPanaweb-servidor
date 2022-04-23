const {Router} = require('express')

const autenticacion=require('../Generales/rutas_protegidas')
const router = Router();

const {getProducto,crearProducto, actualizar_info,eliminar_producto} = require('../controllers/productoControllers')

router.get('/',autenticacion, getProducto)
router.post('/',autenticacion, crearProducto)

router.put('/actualizar/:codigo',autenticacion, actualizar_info)

router.delete('/eliminar/:codigo',autenticacion, eliminar_producto)


/*router.route('/:id')
.get()
.delete()
.put()
*/

module.exports =router;

/* 
const express = require('express')
const upload = require('../libs/storage')
const { addProduct, getProducts } = require('../controllers/productoControllers')
const api = express.Router()

api.post('/', upload.single('image'), addProduct)
api.get('/productos', getProducts)

module.exports = api; */