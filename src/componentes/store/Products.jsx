import { Filters } from "./Filters";
import "./Products.css";
import "../../index.css"
import { Card } from "./Card";

export function Products ({productos}) {
    console.log('productos:',productos);
    return (
        <section className="store-container">
            <h2> Compra tus productos favoritos!</h2>
            <section>
                <main>
                    <Filters></Filters> 
                </main>
                <main className="products">
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