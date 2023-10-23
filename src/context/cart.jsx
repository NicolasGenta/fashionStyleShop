import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children})=>{
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPriceCart, setTotalPriceCart] = useState(0);

    const addToCart= (product)=>{

        const productInCart = cart.findIndex(item => item.id === product.id);
        
        if(productInCart >= 0){
            const newCart = [...cart];
            newCart[productInCart].quantity += 1;
            setCart(newCart);
        }else{
            setCart(prevState =>[
                ...prevState,
                {
                    ... product,
                    quantity: 1
                }
            ])
            setCartCount(prevCount => prevCount + 1)
        }
        setTotalPriceCart(prevTotalPice => Number((prevTotalPice + product.price).toFixed(2)))
    }   

    const clearCart = ()=>{
        setCart([]);
        setCartCount(0);
        setTotalPriceCart(0);
    }

    const removeFromCart = (product) => {
        const productInCart = cart.find(item => item.id === product.id);
        if (productInCart) {
            if (productInCart.quantity === 1) {
                const newCart = cart.filter(item => item.id !== product.id);
                setCart(newCart);
                setCartCount(prevCount => prevCount - 1);
                setTotalPriceCart(prevTotalPrice => Number((prevTotalPrice - (productInCart.price * productInCart.quantity)).toFixed(2)));
            } else {
                const updatedCart = cart.map(item => {
                if (item.id === product.id) {
                    const updatedQuantity = item.quantity - 1;
                    const updatedPrice = item.price * updatedQuantity;
                    return { ...item, quantity: updatedQuantity, totalPrice: updatedPrice };
                }
                return item;
                });
                setCart(updatedCart);
                setTotalPriceCart(prevTotalPrice => Number((prevTotalPrice - productInCart.price).toFixed(2)));
            }
        }
    };

    return(
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            clearCart,
            removeFromCart,
            cartCount,
            setCartCount,
            totalPriceCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}