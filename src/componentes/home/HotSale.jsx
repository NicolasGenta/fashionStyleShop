import React from 'react';
import './hot-sale.css';
import { IS_DEVELOPMENT } from '../../util/config';
import { useData } from '../../hooks/useData';
import { useWindowSize } from '../../hooks/useWindowSize';
import '../../index.css';
import { useCart } from '../../hooks/useCart';
import { APP_MESSAGES } from '../../util/dictionary';

const HotSale = () => {
  const { datos } = useData();
  const hotSaleProducts = datos.filter(product => product.descuento);
  const { windowSize } = useWindowSize();

  const {addToCart, cart, removeFromCart} = useCart();

  const checkProductInCart = product =>{
    return cart.some(item => item.id === product.id)
}

  return (
    <section className='hotSale-container'>
      <h2 >Hot Sale</h2>
      <main className='products'>
        <ul style={{width: windowSize.width}}>
          { hotSaleProducts.slice(0,5).map((producto, index) => {
              const isProductInCart = checkProductInCart(producto);
              return(
                  <li key={producto.id}>
                      <img
                          src={producto.img}
                          alt={producto.nombre}
                      />
                      <button className="button-buy " style={{backgroundColor: isProductInCart ? '#824133' : '#000000'}}onClick={()=> isProductInCart
                          ? removeFromCart(producto)
                          : addToCart(producto)}>
                              {
                                  isProductInCart
                              ? APP_MESSAGES.BUTTON_REMOVE_TO_CART
                              : APP_MESSAGES.BUTTON_ADD_TO_CART}</button>
                      <div>
                          <strong>{producto.nombre}</strong>
                      </div>
                      <div>
                          <p>$ {producto.precio}</p>
                      </div>
                  </li>
              )
          })}
        </ul>
      </main>
  </section>
  );
}


export default HotSale;
