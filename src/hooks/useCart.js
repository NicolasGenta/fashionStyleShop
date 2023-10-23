import { useContext } from "react";
import { CartContext } from "../context/cart";

export function useCart(){
    const {cart,clearCart, addToCart, removeFromCart, cartCount, setCartCount, totalPriceCart} = useContext(CartContext);

    if(cart === undefined) throw new Error ('useCart must be used within a CartProvider');
    else return { cart, clearCart, addToCart, removeFromCart, cartCount, setCartCount, totalPriceCart};
}