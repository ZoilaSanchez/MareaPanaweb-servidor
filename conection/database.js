// Crear la conecion

const mongoose= require('mongoose')

//Cadena de conexion
const URI=process.env.MONGODB_URI // utilizamos la variable de entorno

mongoose.connect(URI) // Conectar

const connection=mongoose.connection;

connection.once('open',()=>{
    console.log('La base de datos ha sido conectada ',URI);
})


