import { useLocation } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import {
  Grid,
  Button,
  Box,
  Slider,
  Typography,
  Paper
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const search = params.get("search")?.toLowerCase() || "";
  const category = params.get("category");

  const { addToWishlist } = useWishlist();

  const [priceRange, setPriceRange] = useState([0, 2000]);

  // 🔥 FILTER LOGIC
  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search);
    const matchCategory = category ? p.category === category : true;
    const matchPrice =
      p.price >= priceRange[0] && p.price <= priceRange[1];

    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <Box sx={{ display: "flex", p: 4, gap: 4 }}>

      {/* 🔥 FILTER SIDEBAR */}
      <Paper
        sx={{
          width: 250,
          p: 3,
          height: "fit-content",
          position: "sticky",
          top: 100
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>

        <Typography gutterBottom>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Typography>

        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
        />
      </Paper>

      {/* 🔥 PRODUCT GRID */}
      <Grid container spacing={3} sx={{ flex: 1 }}>
        {filtered.length === 0 && (
          <Typography variant="h6">
            No products found
          </Typography>
        )}

        {filtered.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />

            <Button
              fullWidth
              startIcon={<FavoriteIcon />}
              onClick={() => addToWishlist(product)}
              sx={{ mt: 1 }}
            >
              Add to Wishlist
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
