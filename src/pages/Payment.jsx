import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Payment() {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const generateOrderId = () => {
        const year = new Date().getFullYear();
        const counter = JSON.parse(localStorage.getItem("orderCounter")) || 1;
        const formatted = `ORD-${year}-${String(counter).padStart(4, "0")}`;
        localStorage.setItem("orderCounter", counter + 1);
        return formatted;
    };

    const handlePayment = () => {
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const orderId = generateOrderId();
        const newOrder = {
            id: orderId,
            userEmail: user?.email,
            items: cartItems,
            total: totalPrice,
            status: "Processing",
            date: new Date().toLocaleDateString(),
        };
        localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
        clearCart();
        navigate("/success");
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Payment Page</h2>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button
                onClick={handlePayment}
                style={{
                    padding: 12,
                    background: "green",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Pay Now
            </button>
        </div>
    );
}
