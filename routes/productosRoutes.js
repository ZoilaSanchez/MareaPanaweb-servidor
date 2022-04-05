const {Router} = require('express')

const router = Router();

const {getProducto,crearProducto} = require('../controllers/productoControllers')

router.route('/')
.get(getProducto)
.post(crearProducto)

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