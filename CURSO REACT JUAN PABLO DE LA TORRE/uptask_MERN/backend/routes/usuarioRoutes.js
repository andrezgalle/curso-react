import express from "express";
import {registrar, autenticar, confirmar, olvidePassword,comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js'
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticación, registro y confrimación de Usuarios
router.post('/', registrar) // crea un nuevo usuario
router.post('/login',autenticar)
router.get('/confirmar/:token',confirmar)
router.post('/olvide-password',olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
router.get('/perfil', checkAuth, perfil)


export default router