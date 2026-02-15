import { Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleConfirm = () => {
    addToCart(product);
    toast.success("Product added to cart!");
    setOpen(false);
    navigate("/cart");
  };
  return (
    <>
      <Card
        sx={{
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 5,
          },
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={product.image}
        />
        <CardContent>
          <Typography variant="h6">{product.title}</Typography>
          <Typography sx={{ mb: 2 }}>${product.price}</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#febd69",
              color: "black",
              "&:hover": { bgcolor: "#f3a847" },
            }}
            onClick={() => setOpen(true)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Add To Cart</DialogTitle>
        <DialogContent>
          Add <strong>{product.title}</strong> to cart?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#febd69",
              color: "black",
            }}
            onClick={handleConfirm}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
