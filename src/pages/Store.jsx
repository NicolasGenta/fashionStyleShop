import { Products } from "../componentes/Store/Products";
import { Banner } from "../componentes/Store/banner";
import '../componentes/Store/store.css';
import { useFilters } from "../hooks/useFilters";
import { MostPurchasedSection } from "../componentes/Store/MostPurchased";
import { useData } from "../hooks/useData";


export const Store = () => {
    const { filterProducts } = useFilters();
    const { datos } = useData();
    const filteredProducts = filterProducts(datos);

    console.log(datos);

    return (
        <>
            <Banner></Banner>
            <MostPurchasedSection></MostPurchasedSection>
            <section id="productos">
                <Products productos={filteredProducts}></Products>
            </section>
        </>
    );
}