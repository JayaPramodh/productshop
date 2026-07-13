import { createContext, useContext, useEffect, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlist-reducer";

const WishlistContext = createContext();

const parseStoredValue = (key, fallback) => {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) return fallback;

    try {
        return JSON.parse(storedValue);
    } catch {
        return fallback;
    }
};

const WishlistProvider = ({children}) => {
    const initialState = {
        wishlist: parseStoredValue('wishlist', []),
    }

    const [{wishlist}, wishlistDispatch] = useReducer(wishlistReducer, initialState);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    return (
        <WishlistContext.Provider value={{wishlist, wishlistDispatch}}>
            {children}
        </WishlistContext.Provider>
    )
}

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };