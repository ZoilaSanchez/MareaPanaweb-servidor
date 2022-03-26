const {Router} = require('express')

const router = Router();

const {getUsuario,crearUsuario} = require('../controllers/usuarioControllers')

router.route('/')
.get(getUsuario)
.post(crearUsuario)

/*router.route('/:id')
.get()
.delete()
.put()
*/

module.exports =router;