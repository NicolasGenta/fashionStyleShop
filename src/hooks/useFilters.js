import { useContext } from "react";
import { FiltersContext } from "../context/filters";

export function useFilters(){
    const { filters, setFilters } = useContext(FiltersContext);

    function filterProducts(products){
        return products.filter(product =>{
            return (
            product.price >= filters.minPrice && 
            (
                filters.category === CATEGORIES.ALL_CATEGORY ||
                product.category === filters.category
            )
            )
        })
    }
    return { filters, filterProducts, setFilters}
}