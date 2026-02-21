import { createContext, useContext, useState } from "react";
const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );
    const addToWishlist = (product) => {
        const exists = wishlist.find((p) => p.id === product.id);
        if (!exists) {
            const updated = [...wishlist, product];
            setWishlist(updated);
            localStorage.setItem("wishlist", JSON.stringify(updated));
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
