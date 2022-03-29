const {Router} = require('express')

const router = Router();

const {getUsuario,crearUsuario,confirmar_user,actualizar,actualizar_email,actualizar_password,nuevaPass,comprobar_token,login,recuperarCodigo} = require('../controllers/usuarioControllers')

router.route('/')
.get(getUsuario)
.post(crearUsuario)

router.route('/confirmar/:token').
get(confirmar_user)

router.route('/actualizar/:id').
put(actualizar)

router.route('/email').
put(actualizar_email)

router.route('/actualizar_pass').
put(actualizar_password)

router.route('/act-pass/:token').get(comprobar_token).put(nuevaPass)

router.route('/login').post(login)


router.route('/codigo').put(recuperarCodigo)

module.exports =router;