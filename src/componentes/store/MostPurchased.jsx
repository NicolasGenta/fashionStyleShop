import './MostPurchased.css'

export const MostPurchasedSection = ({ products }) => {
    const mostPurchasedProducts = products.filter(product => product.mostPurchased);

    return (
        <section className="mostPurchased-Container">
            <h2 style={{width: '100%'}}>Los más comprados</h2>
            <main className="mostPurchased">
                <section style={{width: '100%'}}>
                    <ul>
                        {mostPurchasedProducts.map(product => (
                            <li key={product.id}>
                                <img
                                    src={product.img}
                                    alt={product.nombre}
                                />
                                <button>LO QUIERO!</button>
                                <div>
                                    <strong>{product.nombre}</strong>
                                </div>
                                <div>
                                    <p>$ {product.precio}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </section>
    );
}
