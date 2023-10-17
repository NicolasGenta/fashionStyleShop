import "./Products.css";
export function Products ({products}) {
    return (
        <main className="products">
            <ul>
                {products.map(product => (
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
        </main>
    )
}