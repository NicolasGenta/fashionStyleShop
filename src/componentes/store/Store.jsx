import { useState } from "react";
import { Products } from "./Products";
import { Banner } from "./banner";
import './store.css';
import { Filters } from "./Filters";
import { IS_DEVELOPMENT } from "../../util/config";
import { useFilters } from "../../hooks/useFilters";
import { MostPurchasedSection } from "./MostPurchased";

export const Store = ({ products })=> {
    const {filterProducts} = useFilters();
    console.log(products);

    // 👇 Error con la siguiente linea devuelve []
    const filteredProducts = filterProducts(products);

    if(IS_DEVELOPMENT) console.log(filteredProducts);

    return(
        <>
            <Banner></Banner>
            <MostPurchasedSection products={products}></MostPurchasedSection>
            <Products products={ products }></Products>
        </>
    );
}