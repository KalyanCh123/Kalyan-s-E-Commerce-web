import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Box,
  Chip
} from "@mui/material";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <Card
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }
          }}
        >
          {/* 🔥 SALE BADGE */}
          {product.sale && (
            <Chip
              label="SALE"
              color="error"
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 2
              }}
            />
          )}

          {/* IMAGE WITH ZOOM */}
          <Box sx={{ overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="220"
              image={product.image}
              sx={{
                transition: "0.4s",
                "&:hover": {
                  transform: "scale(1.1)"
                }
              }}
            />
          </Box>

          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              {product.title}
            </Typography>

            <Rating
              value={product.rating}
              precision={0.5}
              readOnly
              size="small"
            />

            <Typography variant="body2" color="text.secondary">
              ({product.reviews} reviews)
            </Typography>

            <Typography fontWeight="bold" sx={{ my: 1 }}>
              ${product.price}
            </Typography>

            {/* BUTTONS */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 1,
                bgcolor: "#febd69",
                color: "black",
                "&:hover": { bgcolor: "#f3a847" }
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/checkout");
              }}
            >
              Buy Now
            </Button>

            {/* QUICK VIEW BUTTON */}
            <Button
              fullWidth
              size="small"
              sx={{ mt: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                setQuickOpen(true);
              }}
            >
              Quick View
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* QUICK VIEW MODAL */}
      <Dialog open={quickOpen} onClose={() => setQuickOpen(false)}>
        <DialogTitle>{product.title}</DialogTitle>
        <DialogContent>
          <img
            src={product.image}
            alt=""
            style={{ width: "100%", marginBottom: 10 }}
          />
          <Typography>${product.price}</Typography>
          <Typography>{product.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuickOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
