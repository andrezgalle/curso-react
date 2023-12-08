import express from 'express'
import checkAuth from '../middleware/checkAuth.js';
import {    
    agregarTarea,
    ObtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
} from '../controllers/tareaController.js'

const router = express.Router();

router.post('/',checkAuth,agregarTarea)
router
    .route('/:id')
    .get(checkAuth,ObtenerTarea)
    .put(checkAuth,actualizarTarea)
    .delete(checkAuth,eliminarTarea)

router.post('/estado/:id',checkAuth,cambiarEstado)

export default router