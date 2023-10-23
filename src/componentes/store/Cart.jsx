import { useCart } from '../../hooks/useCart';
import './cart.css'
function CartItem({img, precio, nombre, quantity, addToCart, removeFromCart}){
    return (
        <li>
            <img
                src={img}
                alt={nombre}
            />
            <div>
                <p>{nombre}</p> 
                <p>Precio unitario: $ {precio}</p>
            </div>
            <footer className='footer-cart'>
                <p>
                    Cantidad: {quantity}
                </p>
                <div>
                    <button onClick={addToCart} style={{backgroundColor: 'black'}}>
                        +
                    </button>
                    <button onClick={removeFromCart} style={{backgroundColor: 'black'}}>
                        -
                    </button>
                </div>
            </footer>
            <span style={{width: "100%"}}>Precio total: ${Number((precio * quantity).toFixed(2))}</span>
        </li>
    )
}

export function Cart() {

    const {cart, removeFromCart, addToCart, clearCart, cartCount, totalPriceCart } = useCart();

    return(
        <>
        <label className="cart-button" htmlFor="cart">
            <img src='../../../src/assets/icons/shopping_cart_icon.svg'/>
            <p style={{backgroundColor: cartCount === 0 ? 'transparent' : '#6E7F85'}}>
            {cartCount === 0 ? '' : cartCount}
            </p>
        </label>
        <input id="cart" type="checkbox" hidden />
        <aside className="cart">
            <h2>Mi carrito 🛒</h2>
            {cartCount === 0
            ? <div>
                <img src='../../../src/assets/images/empty_cart.svg'/>
                <p>No hay artículos en su carrito. Por favor, añada productos para comprar</p>
            </div>
            : <>
                <ul>
                    {
                    cart.map(product =>(
                        <CartItem 
                            key={product.id}
                            addToCart={()=> addToCart(product)}
                            removeFromCart={() => removeFromCart(product)}
                            {...product}
                        />
                ))}
                </ul>  
                <div>
                    {totalPriceCart === 0 ? '' : `Total: $ ${totalPriceCart}`}
                </div>
                <button onClick={()=>clearCart()} style={{backgroundColor: 'black'}}> Borrar carrito</button>
                <button onClick={()=>alert('Ha confirmado su compra')} style={{backgroundColor: 'black'}}> Comprar</button>
            </> 
            }
            
        </aside>
        </>
    )
}