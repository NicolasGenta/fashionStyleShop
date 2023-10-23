import { useCart } from "../../hooks/useCart";
import { useData } from "../../hooks/useData";
import { APP_MESSAGES } from "../../util/dictionary";
import { Filters } from "./Filters";
import "./Products.css";
import "../../index.css"

export function Products () {

    const {datos} = useData();
    const { addToCart, cart, removeFromCart } = useCart();

    const checkProductInCart = product =>{
        return cart.some(item => item.id === product.id)
    }

    return (
        <section className="store-container">
            <h2> Compra tus productos favoritos!</h2>
            <Filters></Filters>
            <main className="products">
                <ul>
                    {datos.map(product => {
                        const isProductInCart = checkProductInCart(product);
                        return(
                            <li key={product.id}>
                                <img
                                    src={product.img}
                                    alt={product.nombre}
                                />
                                <button className="button-buy " style={{backgroundColor: isProductInCart ? '#824133' : '#000000'}}onClick={()=> isProductInCart
                                    ? removeFromCart(product)
                                    : addToCart(product)}>
                                        {
                                            isProductInCart
                                        ? APP_MESSAGES.BUTTON_REMOVE_TO_CART
                                        : APP_MESSAGES.BUTTON_ADD_TO_CART}</button>
                                <div>
                                    <strong>{product.nombre}</strong>
                                </div>
                                <div>
                                    <p>$ {product.precio}</p>
                                </div>
                            </li>
                        )
                })}
                </ul>
            </main>
        </section>
    )
}