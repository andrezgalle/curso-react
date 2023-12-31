import { useSelector, useDispatch } from "react-redux"
import { obtenerProductosAction } from "../actions/productoActions"
import { useEffect } from "react";
import Producto from "./Producto";
const Productos = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    //consultar la API
    const cargarProductos = () => dispatch(obtenerProductosAction())
    return()=>{cargarProductos()}
  }, [])

  //obtener state
  const productos = useSelector(state=>state.productos.productos)
  const error = useSelector(state => state.productos.error)
  const cargando = useSelector(state=> state.productos.loading)
  

  return (
    <>
        <h2 className="text-center my-5">Listado de Productos</h2>
        {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p>:null}
        {cargando ? <p className="text-center">Cargando</p>:null}
        <table className="table table-striped">
            <thead className="bg-primary table-dark">
                <tr>
                    <th scope="col"><span>Nombre</span></th>
                    <th scope="col"><span>Precio</span></th>
                    <th scope="col"><span>Acciones</span></th>
                </tr>
            </thead>
            <tbody>
                {productos.length === 0 ? <tr><td><span>No hay productos</span></td></tr>: (
                  productos.map(producto=>(

                    <Producto
                      key={producto.id}
                      producto={producto}
                    />
                  ))
                )}
            </tbody>
        </table>
    </>
  )
}

export default Productos