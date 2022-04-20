const express = require('express')
const cors=require('cors') 

//const fileUpload=require('express-fileupload')
const app=express()


//Configuraciones
app.set('port',process.env.PORT || 8000 ) //8000

// middlewares
app.use(cors()) 
app.use(express.json()) // para que se pueda utilizar el formato js
//app.use(fileUpload)
//Rutas

app.get('/',(req,res)=>{
    res.send('Bienvenido a nuestra rest api')
})

//Rutas para nuestra coleccion de datos = es de las colecciones
//Ruta para usuarios
app.use('/api/usuarios',require('./routes/usuariosRoutes'));
app.use('/api/productos',require('./routes/productosRoutes'));
app.use('/api/public', express.static(`${__dirname}/storage/imgs`))



//Exportaciones de todas las configuraciones que van a index.js
module.exports =app;