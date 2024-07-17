import { useContext } from "react";
import { FiltersContext } from "../context/filters";
import { CATEGORIES } from "../util/dictionary";

export function useFilters(){
    const { filters, setFilters, handlerChangeFilters } = useContext(FiltersContext);

    function filterProducts(products){
        let productosFiltrados;
        productosFiltrados = products.filter(product =>{
            // if(product.emprendimiento.estado)
            return (
            product.precio >= filters.minPrice && 
            (
                filters.category === CATEGORIES.ALL_CATEGORY ||
                product.categoria === filters.category
            ) && 
            (
                filters.emprendimiento === CATEGORIES.ALL_CATEGORY ||
                product.emprendimiento.razon_social === filters.emprendimiento
            ) && 
            (
                filters.nombre_producto === '' ||
                product.nombre.toLowerCase().includes(filters.nombre_producto.toLowerCase())
            ) && 
            (
                filters.descripcion === '' ||
                product.descripcion.toLowerCase().includes(filters.descripcion.toLowerCase())
            )
            )
        })
        return productosFiltrados
    }
    return { filters, filterProducts, setFilters, handlerChangeFilters}
}