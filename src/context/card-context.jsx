import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer/cart-reducer";

const CartContext = createContext();

const parseStoredValue = (key, fallback) => {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) return fallback;

    try {
        return JSON.parse(storedValue);
    } catch {
        return fallback;
    }
};

const CartProvider = ({children}) => {
    const initialState = {
        cart: parseStoredValue("cart", []),
        totalcost: parseStoredValue("cart", []).reduce((total, product) => total + Number(product.price || 0), 0)
    }

    const [{cart, totalcost}, cartDispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{cart, totalcost, cartDispatch}}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };