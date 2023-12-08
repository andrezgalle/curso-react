import { useDispatch,useSelector } from "react-redux"
import { crearNuevoProductoAction } from "../actions/productoActions"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mostrarAlerta,ocultarAlertaAction } from "../actions/alertaActions";
const NuevoProducto = () => {

    //state del componente
    const [nombre,setNombre] = useState('');
    const [precio,setPrecio ] = useState(0);
    const navigate = useNavigate()

    //utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    //acceder al state del store
    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state=> state.alerta.alerta)

    //mandar llamar el action de producto action
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))

    const submitNuevoProducto = e =>{
        e.preventDefault();

        //validar formular 
        if(nombre.trim() === '' || precio <= 0){
            const alerta = {
                msg:'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta))
            return;
        }
        //sino hay errores
        dispatch(ocultarAlertaAction())
        //crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })

        navigate('/')

        
    }

  return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>
                        Agregar Nuevo Producto 
                    </h2>
                    {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                    <form onSubmit={submitNuevoProducto}>
                        <div className='form-group'>
                            <label htmlFor="">Nombre Producto</label>
                            <input type="text" className='form-control' value={nombre} onChange={e=> setNombre(e.target.value)} placeholder='Nombre Producto' name='nombre' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Precio Producto</label>
                            <input type="number" className='form-control' value={precio} onChange={e=> setPrecio(+e.target.value)} placeholder='Precio Producto' name='precio' />
                        </div>
                        <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Agregar</button>
                    </form>

                    {cargando ? <p>Cargando</p>:null}
                    {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>: null}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NuevoProducto