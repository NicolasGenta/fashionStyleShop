import { useEffect, createContext, useState } from "react";
import { getData } from "../util/functions";
import { RESOURCES } from "../util/dictionary";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [datos, setDatos] = useState([]);
    const [emprendimientos, setEmprendimientos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [maxPrecio, setMaxPrecio] = useState();
    const [mostpurchased, setMostpurchased] = useState([]);;
    const [emprendimiento, setEmprendimiento] = useState([]);
    const [rubros, setRubros] = useState([]);

    useEffect(() => {
        getData(RESOURCES.ENDPOINTS.PRODUCTOS)
            .then(data => {
                console.log('productos context', data);
                setDatos(data);
            })
            .catch(error => {
                console.log("Se ha producido un error", error);
            });
        getData(RESOURCES.ENDPOINTS.EMPRENDIMIENTOS)
            .then(data => {
                setEmprendimientos(data)
            })
            .catch(err => console.log("Se ha producido un error", err));
        getData(RESOURCES.ENDPOINTS.CATEGORIAS)
            .then(data => {
                console.log(data);
                setCategorias(data)
            })
            .catch(err => console.log("Se ha producido un error", err));
            getData(RESOURCES.ENDPOINTS.PRECIO_MAXIMO)
            .then(data => {
                setMaxPrecio(data.maxPrecio)
            })
            .catch(err => console.log("Se ha producido un error", err))
             getData(RESOURCES.ENDPOINTS.MOSTPURCHASED)
             .then(data => {
                setMostpurchased(data.mostpurchased)
             })
             .catch(err => console.log("Se ha producido un error", err))
        }, []);

    return (
        <DataContext.Provider value={{
            datos,
            emprendimientos,
            categorias,
            maxPrecio,
            emprendimiento,
            setEmprendimiento,
            rubros,
            setRubros,
            setCategorias
        }}>
            {children}
        </DataContext.Provider>
    )

}