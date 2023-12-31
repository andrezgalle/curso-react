import axios from "axios";
import { useState,useEffect,createContext } from "react";


const BebidasContext = createContext()

const BebidasProvider = ({children}) =>{

    const [bebidas, setBebidas] = useState([])
    const [modal, setModal] = useState(false)
    const [bebidaId, setBebidaId] = useState(null)
    const [receta, setReceta] = useState({})

    const consultarBebida = async datos =>{
        try {

            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

            const {data} = await axios(url)

            setBebidas(data.drinks)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalClick = () =>{
        setModal(!modal);
    }

    const handleBebidaId = id =>{
        setBebidaId(id)
    }

    useEffect(() => {
        const obtenerReceta = async () =>{
            if(!bebidaId) return

            try {
                const url =  `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const {data} = await axios(url)
                setReceta(data.drinks[0])

            } catch (error) {
                
            }
        }
        obtenerReceta()
    }, [bebidaId])
    

    return(
        <BebidasContext.Provider
            value={{
                consultarBebida,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaId,
                receta,
                setReceta
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {BebidasProvider}
export default BebidasContext