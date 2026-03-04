import { createContext, useContext, useState, useEffect } from "react";
const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        const exists = wishlist.find((p) => p.id === product.id);
        if (!exists) {
            setWishlist([...wishlist, product]);
        }
    };
    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter((item) => item.id !== id));
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);