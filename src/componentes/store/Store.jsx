import { useState } from "react";
import { Products } from "./Products";
import { Banner } from "./banner";
import './store.css';
import { CATEGORIES } from "../../util/dictionary";
import { Filters } from "./Filters";

export const Store = ({products})=> {
    console.log(products)
    const [filters, setFilters] = useState({
        category: CATEGORIES.ALL_CATEGORY,
        minPrice: 0,
    });

    const filterProducts = (productos) =>{
        return productos.filter(producto => {
            return (
                producto.precio >= filters.minPrice && (
                    filters.category === CATEGORIES.ALL_CATEGORY ||
                    producto.categoria === filters.category
                )
            );
        });
    }

    const filteredProducts = filterProducts(products);
    console.log(filteredProducts);

    return(
        <>
            <Banner></Banner>
            <Filters></Filters>
            <Products products={filteredProducts}></Products>
        </>
    );
}