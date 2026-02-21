import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your Cart is Empty 🛒</h2>
          <p>Add some products to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-left">
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>₹ {item.price}</p>
            </div>
          </div>
          <div className="cart-right">
            <div className="qty-controls">
              <button onClick={() => removeFromCart(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item)}>+</button>
            </div>
            <p className="item-total">
              ₹ {item.price * item.quantity}
            </p>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <h3>Total: ₹ {totalPrice}</h3>
<Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: "#febd69", color: "black" }} onClick={() => navigate("/checkout")} > Proceed to Checkout </Button>
      </div>
    </div>
  );
}
