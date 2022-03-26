

const express = require('express')
const cors=require('cors') 
const app=express()

//Configuraciones
app.set('port',process.env.PORT || 8000)

// middlewares
app.use(cors()) 
app.use(express.json()) // para que se pueda utilizar el formato js

//Rutas

app.get('/',(req,res)=>{
    res.send('Bienvenido a nuestra rest api')
})

//Rutas para nuestra coleccion de datos = es de las colecciones
//Ruta para usuarios
app.use('/api/usuarios',require('./routes/usuariosRoutes'));




//Exportaciones de todas las configuraciones que van a index.js

module.exports =app;