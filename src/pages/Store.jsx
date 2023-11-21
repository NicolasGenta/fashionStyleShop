import { useState } from "react";
import { Products } from "../componentes/Store/Products";
import { Banner } from "../componentes/Store/banner";
import '../componentes/Store/store.css';
import { Filters } from "../componentes/Store/Filters";
import { IS_DEVELOPMENT } from "../util/config";
import { useFilters } from "../hooks/useFilters";
import { MostPurchasedSection } from "../componentes/Store/MostPurchased";
import { useData } from "../hooks/useData";

export const Store = ()=> {
    const {filterProducts} = useFilters();
    const {datos} = useData();
    // 👇 Error con la siguiente linea devuelve []
    const filteredProducts = filterProducts(datos);

    if(IS_DEVELOPMENT) console.log(datos);

    return(
        <>
            <Banner></Banner>
            <MostPurchasedSection></MostPurchasedSection>
            <Products productos={filteredProducts}></Products>
        </>
    );
}