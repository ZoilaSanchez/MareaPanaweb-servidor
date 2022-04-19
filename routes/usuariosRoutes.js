const {Router} = require('express')

const router = Router();

const {getUsuario,crearUsuario,confirmar_user,actualizar_info,actualizar_email,actualizar_password,nuevaPass,comprobar_token,login,recuperarCodigo,habilitarUsuarios} = require('../controllers/usuarioControllers')

router.route('/')
.get(getUsuario)
.post(crearUsuario)

router.route('/confirmar/:token').
get(confirmar_user)

router.route('/actualizar-info/:codigo').
put(actualizar_info)

router.route('/email/:codigo').
put(actualizar_email)

router.route('/act-pass').
put(actualizar_password)

router.route('/act-pass/:token').get(comprobar_token).put(nuevaPass)

router.route('/login').post(login)


router.route('/codigo').put(recuperarCodigo)

router.route('/estado').put(habilitarUsuarios)

module.exports =router;