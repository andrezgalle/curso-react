import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) =>{
    const {email,nombre,token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Información del Email
    const info = await transport.sendMail({
        from:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject:"UpTask - Comprueba tu cuenta",
        text:"Comprueba tu cuenta en UpTask",
        html:`
            <p>hola: ${nombre} Comprueba tu cuenta en Uptask </p>
            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}

export const emailOlvidePassword = async (datos) =>{
    const {email,nombre,token} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Información del Email
    const info = await transport.sendMail({
        from:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject:"UpTask - Reestablece tu Password",
        text:"Reestablece tu Password",
        html:`
            <p>hola: ${nombre} has solicitado reestablecer tu password</p>
            <p>Sigue el siguiente enlace para generar un nuevo password: 
            <a href="${process.env.FRONTEND_URL}/nuevo-password/${token}">Reestablecer Password</a>

            <p> Si tu no solicitaste este email, ignora el mensaje</p>
        `
    })
}