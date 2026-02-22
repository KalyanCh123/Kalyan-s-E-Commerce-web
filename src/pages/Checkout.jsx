import { Box, Typography, Button } from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce( (total, item) => total + item.price * item.quantity, 0 );

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>
      {cartItems.map((item) => (
        <Box key={item.id} mb={2}>
          <Typography>
            {item.title} ({item.quantity}) - $
            {(item.quantity * item.price).toFixed(2)}
          </Typography>
        </Box>
      ))}
      <Typography variant="h6" mt={3}>
        Total: ${total.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/payment")}
      >
        Proceed to Payment
      </Button>
    </Box>
  );
}
