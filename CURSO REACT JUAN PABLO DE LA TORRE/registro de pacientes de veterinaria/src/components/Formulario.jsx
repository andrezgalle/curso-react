import { useState , useEffect} from "react"
import Error from "./Error";

const Formulario = ({setPacientes,pacientes,paciente,setPaciente}) => {
    const [nombre,setNombre] = useState('');
    const [propietario,setPropietario] = useState('');
    const [email,setEmail] = useState('');
    const [fecha,setFecha] = useState('');
    const [sintomas,setSintomas] = useState('');

    const [error,setError] = useState(false);

    useEffect(() => {
        if(Object.keys(paciente).length>0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])


    const generarId = ()=>{
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        /* Validacion del formulario */
        if([nombre,propietario,email,fecha,sintomas].includes('')){
            setError(true);
            return;
        }

        setError(false);

        /* OBJETO DE PACIENTES */
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
        }

        if(paciente.id){
            /* Editando el registro */
            objetoPaciente.id = paciente.id;

            const pacientesActualizados = pacientes.map(pacienteState=>pacienteState.id===paciente.id?objetoPaciente:pacienteState)

            setPacientes(pacientesActualizados)
            setPaciente({})
        }else{
            /* Nuevo Registro */
            objetoPaciente.id = generarId();
            setPacientes([...pacientes,objetoPaciente]);
        }


        /* REINICIAR EL FORM */
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''} 
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            onSubmit={handleSubmit}        
        >
            {error && <Error><p>Todos los campos son obligatorios</p></Error>}
            <div className="mb-5">
                <label
                    htmlFor="nombre"
                    className="block text-gray-700 uppercase font-bold"
                >Nombre Mascota
                </label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                    id="nombre"
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="propietario"
                    className="block text-gray-700 uppercase font-bold"
                >Nombre Propietario
                </label>
                <input
                    value={propietario}
                    onChange={(e)=>setPropietario(e.target.value)}
                    type="text"
                    id="propietario"
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="Email"
                    className="block text-gray-700 uppercase font-bold"
                >Email
                </label>
                <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email"
                    id="Email"
                    placeholder="Email Contacto"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>

            
            <div className="mb-5">
                <label
                    htmlFor="Alta"
                    className="block text-gray-700 uppercase font-bold"
                >Alta
                </label>
                <input
                    value={fecha}
                    onChange={(e)=>setFecha(e.target.value)}
                    type="date"
                    id="Alta"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="sintomas"
                    className="block text-gray-700 uppercase font-bold"
                >Síntomas
                </label>
                <textarea
                    value={sintomas}
                    onChange={(e)=>setSintomas(e.target.value)} 
                    id="sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los Síntomas"
                />
            </div>

            <input
                type="submit"
                value={paciente.id ? 'Editar Paciente': 'Agregar Paciente'}
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            />
        </form>
    </div>
  )
}

export default Formulario