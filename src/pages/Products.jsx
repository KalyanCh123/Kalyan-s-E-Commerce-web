import { useLocation } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { Grid } from "@mui/material";

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";
  const category = params.get("category");
  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search);
    const matchCategory = category ? p.category === category : true;
    return matchSearch && matchCategory;
  });
  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      {filtered.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
