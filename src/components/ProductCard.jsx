import { Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Rating, Box, Chip, Stack } from "@mui/material";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quickOpen, setQuickOpen] = useState(false);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart 🛒");
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <Card
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
            }
          }}
        >
          {product.discount > 0 && (
            <Chip
              label={`${product.discount}% OFF`}
              color="error"
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                fontWeight: 600,
                zIndex: 2
              }}
            />
          )}
          <Box sx={{ overflow: "hidden", p: 2 }}>
            <CardMedia
              component="img"
              image={product.images[0]}
              sx={{
                height: 200,
                objectFit: "contain",
                transition: "0.4s",
                "&:hover": {
                  transform: "scale(1.08)"
                }
              }}
            />
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                height: 40,
                overflow: "hidden"
              }}
            >
              {product.title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <Rating
                value={product.rating}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="caption" color="text.secondary">
                ({product.reviews})
              </Typography>
            </Stack>
            <Box mt={1}>
              {product.discount > 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary"
                  }}
                >
                  ${product.price}
                </Typography>
              )}

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#B12704" }}
              >
                ${discountedPrice}
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ p: 2, pt: 0 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 1,
                bgcolor: "#FFD814",
                color: "black",
                fontWeight: 600,
                "&:hover": { bgcolor: "#F7CA00" }
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ fontWeight: 600 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate("/checkout");
              }}
            >
              Buy Now
            </Button>
            <Button
              fullWidth
              size="small"
              sx={{ mt: 1, textTransform: "none" }}
              onClick={(e) => {
                e.stopPropagation();
                setQuickOpen(true);
              }}
            >
              Quick View
            </Button>
          </Box>
        </Card>
      </motion.div>
      <Dialog
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle fontWeight="bold">
          {product.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center" }}>
            <img
              src={product.images[0]}
              alt=""
              style={{
                width: "100%",
                maxHeight: 300,
                objectFit: "contain",
                marginBottom: 20
              }}
            />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            ${discountedPrice}
          </Typography>
          <Typography mt={2} color="text.secondary">
            {product.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuickOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}