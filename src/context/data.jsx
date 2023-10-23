import { useEffect, createContext, useState} from "react";
import { getData } from "../util/functions";

export const DataContext = createContext();

export const DataProvider = ({children})=> {
    const [ datos, setDatos ] = useState([]);

    useEffect(() => {
        getData("http://localhost:3000/productos/")
            .then(data => {
            console.log(data);
            setDatos(data);
            })
            .catch(error => {
            console.log("Se ha producido un error", error);
            });
    }, []);

    return(
        <DataContext.Provider value={{
            datos,
        }}>
            {children}
        </DataContext.Provider>
    )

}