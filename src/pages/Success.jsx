import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useCart } from "../context/CartContext";

export default function Success() {
    const navigate = useNavigate();
    const { clearCart } = useCart();
    useEffect(() => {
        clearCart();
    }, []);
    return (
        <div style={{ padding: 40, textAlign: "center" }}>
            <h1>🎉 Payment Successful!</h1>
            <p>Your order has been placed successfully.</p>
            <button
                onClick={() => navigate("/orders")}
                style={{
                    padding: 12,
                    marginTop: 20,
                    background: "#febd69",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                View Orders
            </button>
        </div>
    );
}
