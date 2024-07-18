import { useCart } from "../../hooks/useCart";
import { APP_TEXTS, RESOURCES } from "../../util/dictionary";
import "../../index.css";

export const Card = ({ product }) => {
    const { addToCart, cart, removeFromCart } = useCart();
    const checkProductInCart = product => {
        return cart.some(item => item.codigo_producto === product.codigo_producto)
    }

    const isProductInCart = checkProductInCart(product);
    return (
        <li key={product.id} style={{ listStyle: 'none', minWidth: '200px', maxWidth: '200px', height: '23rem', margin: '0.3rem', backgroundColor: 'white' }} className='box-shadow'>
            <img
                src={RESOURCES.ENDPOINTS.IMAGE + product.img}
                alt={product.nombre}
                style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '65%' }}
            />
            <button className="button-buy" style={{ backgroundColor: isProductInCart ? '#824133' : '#000000', color: 'white', border: 'none', width: '100%' }} onClick={() => isProductInCart
                ? removeFromCart(product)
                : addToCart(product)}>
                {
                    isProductInCart
                        ? APP_TEXTS.BUTTON_REMOVE_TO_CART
                        : APP_TEXTS.BUTTON_ADD_TO_CART}</button>
            <section style={{paddingLeft: '0.5em', paddingTop: '0.5em'}}>
                <div>
                    <strong className='chip-container'>{product.emprendimiento.razon_social}</strong>
                </div>
                <div>
                    <strong>{product.nombre_producto}</strong>
                </div>
                <div>
                    <p>$ {product.precio}</p>
                </div>
            </section>
        </li>
    )
}