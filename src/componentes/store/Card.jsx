import { useCart } from "../../hooks/useCart";
import { APP_MESSAGES } from "../../util/dictionary";

export const Card = ({ product }) => {
    const { addToCart, cart, removeFromCart } = useCart();
    const checkProductInCart = product => {
        return cart.some(item => item.codigo_producto === product.codigo_producto)
    }

    const isProductInCart = checkProductInCart(product);
    return (
        <li key={product.id}>
            <img
                src={product.img}
                alt={product.nombre}
            />
            <button className="button-buy " style={{ backgroundColor: isProductInCart ? '#824133' : '#000000' }} onClick={() => isProductInCart
                ? removeFromCart(product)
                : addToCart(product)}>
                {
                    isProductInCart
                        ? APP_MESSAGES.BUTTON_REMOVE_TO_CART
                        : APP_MESSAGES.BUTTON_ADD_TO_CART}</button>
            <section>
                <div>
                    <strong className='chip-container'>{product.emprendimiento.razon_social}</strong>
                </div>
            </section>
            <div>
                <strong>{product.nombre_producto}</strong>
            </div>
            <div>
                <p>$ {product.precio}</p>
            </div>
        </li>
    )
}