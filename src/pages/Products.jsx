import { useLocation } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Grid, Button, Box, Slider, Typography, Paper, Divider } from "@mui/material";
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
  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search);
    const matchCategory = category ? p.category === category : true;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        px: { xs: 2, md: 6 },
        py: 4,
        backgroundColor: "#eaeded",
        minHeight: "100vh"
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 260,
          p: 3,
          height: "fit-content",
          position: "sticky",
          top: 100,
          display: { xs: "none", md: "block" }
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Filters
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography fontSize={14} gutterBottom>
          Price Range
        </Typography>
        <Typography fontSize={13} color="text.secondary" gutterBottom>
          ${priceRange[0]} - ${priceRange[1]}
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
        />
      </Paper>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          {category ? `${category} Products` : "All Products"}
        </Typography>
        {filtered.length === 0 ? (
          <Paper
            elevation={2}
            sx={{
              p: 5,
              textAlign: "center"
            }}
          >
            <Typography variant="h6" gutterBottom>
              No products found 😔
            </Typography>
            <Typography color="text.secondary">
              Try adjusting your filters or search term.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((product) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={product.id} >
                <ProductCard product={product} />

                <Button
                  fullWidth
                  startIcon={<FavoriteIcon />}
                  onClick={() => addToWishlist(product)}
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    fontWeight: 600
                  }}
                >
                  Add to Wishlist
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}