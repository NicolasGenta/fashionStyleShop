import { createContext , useState} from "react";

//Creación del contexto
export const FiltersContext = createContext();

//Proveedor del contexto
export function FiltersProvider ({ children }){
    const [ filters, setFilters] = useState({
        category: 'All',
        minPrice: 0
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