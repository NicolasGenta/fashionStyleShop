import './MostPurchased.css'
import { useData } from '../../hooks/useData';
import { useCart } from '../../hooks/useCart';
import { APP_MESSAGES } from '../../util/dictionary';

export const MostPurchasedSection = () => {
    const {datos } = useData();
    const mostPurchasedProducts = datos.filter(product => product.mostPurchased);
    const { addToCart, cart, removeFromCart } = useCart();

    const checkProductInCart = product =>{
        return cart.some(item => item.id === product.id)
    }

    return (
        <section className="mostPurchased-Container">
            <h2 style={{width: '100%'}}>Los más comprados</h2>
            <main className="products">
                <section style={{width: '100%'}}>
                    <ul>
                        {mostPurchasedProducts.map(product => {

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
                </section>
            </main>
        </section>
    );
}
