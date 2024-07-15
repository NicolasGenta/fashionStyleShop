import { createContext , useState} from "react";
import { CATEGORIES } from "../util/dictionary";

//Creación del contexto
export const FiltersContext = createContext();

//Proveedor del contexto
export function FiltersProvider ({ children }){
    const [ filters, setFilters] = useState({
        category: CATEGORIES.ALL_CATEGORY,
        minPrice: 0,
        emprendimiento: CATEGORIES.ALL_CATEGORY,
        nombre_producto : '',
        descripcion: '',
        razon_social: '',
        responsable: '',
        rubro: 'All',
        estado: 'All'
    })

    return(
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}