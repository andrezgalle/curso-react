import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_ERROR,
    PRODUCTO_EDITADO_EXITO,
    COMENZAR_EDICION_PRODUCTO
} from '../types'

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
import EditarProducto from '../components/EditarProducto';


// Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) =>{
        dispatch(agregarProducto());

        try {
            //insertar en la API
            await clienteAxios.post('/productos',producto)

            //si todo sale bien actualiza el state
            dispatch(agregarProductoExito(producto))

            //Alerta
            Swal.fire({
                icon: 'success',
                title:'Correcto',
                text:'El producto se agregó correctamente',
                confirmButtonText : 'Entendido'
                
            })
        } catch (error) {
            console.log(error)
            //si hay error actualiza el state
            dispatch(agregarProductoError(true))

            //alerta de error
            Swal.fire({
                icon: 'error',
                title:'Hubo un error',
                text:'Hubo un error, intenta de nuevo',
                confirmButtonText : 'Entendido'
            })
        }
    }
}

const agregarProducto = () =>({
    type: AGREGAR_PRODUCTO,
    payload:true
})

//si el producto se guarda en la base de datos
const  agregarProductoExito = producto =>({
    type:AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo un error

const agregarProductoError = estado =>({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:estado
})

//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction(){
    return async (dispatch)=>{
        dispatch(descargarProductos())

        try {
            const {data} = await clienteAxios('/productos')
            dispatch(descargaProductosExitosa(data))
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError())
        }
    }
}

const descargaProductosExitosa = productos =>({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload:productos
})

const descargarProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload:true,
})

const descargaProductosError = () =>({
    type:DESCARGA_PRODUCTOS_ERROR,
    payload:true
})

//Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async(dispatch)=>{
        dispatch(obtenerProductoEliminar(id) );

        try {
            const {data} = await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            //si se elimina mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente',
                'success'
              )
        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id =>({
    type:OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () =>({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () =>({
    type:PRODUCTO_ELIMINADO_ERROR,
    payload:true
})


//Colocar producto en edicion
export function obtenerProductoEditar(producto){
    return (dispatch)=>{
        dispatch(obtenerProductoAction(producto))
    }
}

const obtenerProductoAction = producto =>({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//Edita un registro en la api y en el state
export function editarProductoAction(producto){
    return async (dispatch)=>{
        dispatch(editarProducto())

        try {
           const {data} = await clienteAxios.put(`/productos/${producto.id}`,producto) 
           dispatch(editarProductoExito(producto))
        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto =>({
    type:PRODUCTO_EDITADO_EXITO,
    payload:producto
})

const editarProductoError = () =>({
    type:PRODUCTO_EDITADO_ERROR,
    payload:true
})