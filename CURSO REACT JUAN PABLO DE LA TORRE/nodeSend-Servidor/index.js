const express = require('express');
const conectarDB = require('./config/db.js')
const cors = require('cors');

//crear el servidor
const app = express();

//conectar en la base de datos
conectarDB();

//Habilitar cors
const whiteList = [process.env.FRONTEND_URL || 'http://localhost:3000' || 'http://localhost:4000']

const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            //puede consultar la api
            callback(null,true)
        }else{
            //no esta permitido
            callback(new Error('error de cors'))
        }
    }
}
app.use(cors())
console.log('Comenzando node send')

//Puerto de la app
const port =  4000;

//habilitar leer los valores de un body
app.use(express.json())

//habilitar carpeta publica
app.use(express.static('uploads'))

//Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

//Arrancar app
app.listen(port,'0.0.0.0', ()=>{
    console.log('el servidor esta funcionando en el puerto',port)
})