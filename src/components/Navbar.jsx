import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Box,
    InputBase,
    Drawer,
    Button,
    Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const [authOpen, setAuthOpen] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { totalItems = 0, cartItems = [] } = useCart();
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    return (
        <>
            <AppBar position="sticky" sx={{ bgcolor: "#131921" }}>
                <Toolbar sx={{ gap: 2 }}><Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": { color: "#febd69" },
                    }}
                    onClick={() => navigate("/")}
                >
                    MyStore
                </Typography>
                    <Box
                        sx={{
                            bgcolor: "#232f3e",
                            display: "flex",
                            gap: 3,
                            px: 3,
                            py: 1,
                            fontSize: 14,
                        }}
                    >
                        {["Mobiles", "Fashion", "Electronics", "Shoes", "Accessories"].map(
                            (cat) => (
                                <Typography
                                    key={cat}
                                    sx={{ cursor: "pointer", "&:hover": { color: "#febd69" } }}
                                    onClick={() => navigate(`/products?category=${cat}`)}
                                >
                                    {cat}
                                </Typography>
                            )
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "white",
                            px: 2,
                            borderRadius: 1,
                            flexGrow: 1,
                            height: 40,
                        }}
                    >
                        <InputBase
                            placeholder="Search for mobiles, fashion, electronics..."
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    navigate(`/products?search=${search}`);
                                }
                            }}
                        />
                        <IconButton
                            onClick={() => navigate(`/products?search=${search}`)}
                            sx={{ color: "black" }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    {user ? (
                        <Button
                            color="inherit"
                            onClick={logout}
                            sx={{
                                textTransform: "none",
                                fontSize: 13,
                            }}
                        >
                            Hello, {user.email}
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={() => setAuthOpen(true)}
                            sx={{ textTransform: "none" }}
                        >
                            Sign In
                        </Button>
                    )}
                    <IconButton color="inherit" onClick={() => setOpen(true)}>
                        <Badge badgeContent={totalItems} color="warning">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        width: 350,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Shopping Cart
                    </Typography>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                        {cartItems.length === 0 && (
                            <Typography>No items added</Typography>
                        )}

                        {cartItems.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Typography fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography fontSize={13}>
                                        {item.quantity} × ${item.price}
                                    </Typography>
                                </Box>
                                <Typography fontWeight="bold">
                                    ${(item.quantity * item.price).toFixed(2)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Subtotal: ${totalPrice.toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: "#febd69",
                            color: "black",
                            mb: 2,
                            "&:hover": { bgcolor: "#f3a847" },
                        }}
                    >
                        Proceed to Checkout
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            setOpen(false);
                            navigate("/cart");
                        }}
                    >
                        Go To Cart
                    </Button>
                </Box>
            </Drawer>
            <AuthModal open={authOpen} handleClose={() => setAuthOpen(false)} />
        </>
    );
}
