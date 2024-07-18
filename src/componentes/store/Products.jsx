import { Filters } from "./Filters";
import "../../index.css"
import "./Products.css";
import { Card } from "./Card";
import { useWindowSize } from "../../hooks/useWindowSize";

export function Products ({productos}) {
    const {windowSize} = useWindowSize();

    return (
        <section className="store-container" style={{ height: `${windowSize.width < 768 ? 'max-content' : windowSize.height - 56}`, overflow: 'hidden'}}>
            <h2> Compra tus productos favoritos!</h2>
            <section className="flex wrap" style={{height: `${windowSize.width < 768 ? 'max-content' : windowSize.height - 56}`, overflow: 'hidden'}}>
                <main className="filters-store">
                    <Filters></Filters> 
                </main>
                <main className="products" style={{overflow: 'scroll', height: '90%', padding: '1em', width: `${windowSize.width < 768 ? '100%' : '70%' }`}}>
                    <ul>
                        {productos.map(product => {
                            return(
                                <Card product={product}/>
                            )
                    })}
                    </ul>
                </main>
            </section>
        </section>
    )
}