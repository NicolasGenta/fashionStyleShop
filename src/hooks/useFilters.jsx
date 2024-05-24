import { useContext } from "react";
import { FiltersContext } from "../context/filters";
import { CATEGORIES } from "../util/dictionary";

export function useFilters(){
    const { filters, setFilters } = useContext(FiltersContext);

    function filterProducts(products){
        let productosFiltrados;
        productosFiltrados = products.filter(product =>{
            if(product.emprendimiento.estado)
            return (
            product.precio >= filters.minPrice && 
            (
                filters.category === CATEGORIES.ALL_CATEGORY ||
                product.category.nombre_categoria === filters.category
            ) && (
                filters.emprendimiento === CATEGORIES.ALL_CATEGORY ||
                product.emprendimiento.razon_social === filters.emprendimiento
            )
            )
        })
        return productosFiltrados
    }
    return { filters, filterProducts, setFilters}
}