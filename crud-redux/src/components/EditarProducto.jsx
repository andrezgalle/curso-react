import { useDispatch, useSelector } from "react-redux"
import { editarProductoAction } from "../actions/productoActions";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {
    //nuevo state de producto
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [productoState,setProducto] = useState({
        nombre:'',
        precio: ''
    })
    //producto a editar
    const producto = useSelector(state=>state.productos.productoeditar);
    //llenar el state
    useEffect(() => {
      return () => {
        setProducto(producto)
      }
    }, [producto])

    //leer los datos del formulario
    const onChangeFormulario = e =>{
        setProducto({
            ...productoState,
            [e.target.name] :e.target.value
        })
    }
    

    const {nombre, precio, id} = producto

    const submitEditarProducto = e =>{
        e.preventDefault();

        dispatch(editarProductoAction(productoState))
        navigate('/')
    }
  return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>
                        Editar Producto 
                    </h2>

                    <form onSubmit={submitEditarProducto}>
                        <div className='form-group'>
                            <label htmlFor="">Nombre Producto</label>
                            <input type="text" className='form-control' value={productoState.nombre} onChange={onChangeFormulario} placeholder='Nombre Producto' name='nombre' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Precio Producto</label>
                            <input type="number" className='form-control' value={productoState.precio} onChange={onChangeFormulario} placeholder='Precio Producto' name='precio' />
                        </div>
                        <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditarProducto