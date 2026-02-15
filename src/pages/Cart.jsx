import { useCart } from "../context/CartContext";
import { Box, Button, Typography } from "@mui/material";

export default function Cart() {
  const { cart = [], removeFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 && (
        <Typography>No items in cart</Typography>
      )}
      {cart.map((item, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{item.title}</Typography>
            <Typography>${item.price}</Typography>
            <Button color="error" onClick={() => removeFromCart(index)}>
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      {cart.length > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            maxWidth: 300,
          }}
        >
          <Typography variant="h6">Order Summary</Typography>
          <Typography>Total: ${total.toFixed(2)}</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#febd69", color: "black" }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
}
