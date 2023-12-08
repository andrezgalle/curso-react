import {useState} from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {

    const [mensaje,setMensaje] = useState('');

    const handlePresupuesto = (e)=>{
        e.preventDefault();


        if(!Number(presupuesto) || Number(presupuesto) <0){
            setMensaje('Presupuesto no Valido')
            return;
        }
        setMensaje('')
        setIsValidPresupuesto(true)
        console.log(presupuesto)


    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label htmlFor="">Definir Presupuesto</label>
                <input
                    value={presupuesto}
                    onChange={e=>setPresupuesto(Number(e.target.value))}
                    className='nuevo-presupuesto' 
                    type="number"
                    placeholder='Añade tu Presupuesto'
                />
                
                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </div>
        </form>
    </div>
  )
}

export default NuevoPresupuesto