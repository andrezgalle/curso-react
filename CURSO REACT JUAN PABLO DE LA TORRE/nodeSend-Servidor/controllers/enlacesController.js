const Enlace = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator')
const Enlaces = require('../models/Enlace');

exports.nuevoEnlace = async (req, res, next) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    //Crear un objeto de enlace
    const {nombre_original, nombre} = req.body;
    const enlace = new Enlace();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;


    //si el usuario esta autenticado
    if(req.usuario){
        const {password, descargas} = req.body;
        //asignar a enlace el numero de descargas
        if(descargas){
            enlace.descargas = descargas;
        }
        //asignar un password
        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt);
        }
        //asignar el autor
        enlace.autor = req.usuario.id;
    }
    
    //almacenar en la base de datos
    try {
        await enlace.save();
        return res.json({msg: `${enlace.url}`});
        next();
    } catch (error) {
        console.log(error);
    }
}

//obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
    const {url} = req.params;
    console.log(url)

    //verificar si existe el enlace
    const enlace = await Enlace.findOne({url});
    console.log(enlace);

    if(!enlace){
        res.status(404).json({msg: 'Ese Enlace no existe'});
        return next();
    }

    //si el enlace existe
    res.json({archivo: enlace.nombre,password: false});

    

    next();
}

//obtiene un listado de todos los enlaces
exports.todosEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlace.find({}).select('url -_id');
        res.json({enlaces});
    } catch (error) {
        console.log(error);
    }
}

//retorna si el enlace tiene password o no
exports.tienePassword = async (req, res, next) => {
    const {url} = req.params;
    console.log(url)

    //verificar si existe el enlace
    const enlace = await Enlace.findOne({url});
    console.log(enlace);

    if(!enlace){
        res.status(404).json({msg: 'Ese Enlace no existe'});
        return next();
    }

    if(enlace.password){
        return res.json({password: true, enlace: enlace.url})
    }

    next();
}

//verifica si el password es correcto
exports.verificarPassword = async (req, res, next) => {
    const {url} = req.params;
    const {password} = req.body;
    //consultar por el enlace
    const enlace = await Enlace.findOne({url});

    //verificar el password
    if(bcrypt.compareSync(password, enlace.password)){
        //permitirle al usuario descargar el archivo
        next();
    }else{
        return res.status(401).json({msg: 'Password Incorrecto'});
    }


}