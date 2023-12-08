const jwt = require('jsonwebtoken')
require('dotenv').config({path:'.env'})

module.exports = (req,res,next)=>{
    const authHeader = req.get('Authorization')

    if(authHeader){
        //obtener el token
        const token = authHeader.split(' ')[1]

        //comprobar el JWT
        try {
            const usuario = jwt.verify(token, process.env.SECRETA)
            req.usuario = usuario
        } catch (error) {
            console.log(error)
        }
    }

    return next()
}