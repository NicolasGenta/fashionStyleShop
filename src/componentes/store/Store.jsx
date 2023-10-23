import { useState } from "react";
import { Products } from "./Products";
import { Banner } from "./banner";
import './store.css';
import { Filters } from "./Filters";
import { IS_DEVELOPMENT } from "../../util/config";
import { useFilters } from "../../hooks/useFilters";
import { MostPurchasedSection } from "./MostPurchased";
import { useData } from "../../hooks/useData";

export const Store = ()=> {
    const {filterProducts} = useFilters();
    const {datos} = useData();
    // 👇 Error con la siguiente linea devuelve []
    const filteredProducts = filterProducts(datos);

    if(IS_DEVELOPMENT) console.log(filteredProducts);

    return(
        <>
            <Banner></Banner>
            <MostPurchasedSection></MostPurchasedSection>
            <Products></Products>
        </>
    );
}