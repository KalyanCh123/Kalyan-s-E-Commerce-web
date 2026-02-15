import { Dialog, DialogTitle, DialogContent, TextField, Button, Tabs, Tab, Box, Typography, } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ open, handleClose }) {
    const { register, login } = useAuth();
    const [tab, setTab] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = () => {
        if (!email || !password) {
            setError("All fields required");
            return;
        }
        if (tab === 0) {
            const res = login(email, password);
            if (!res.success) {
                setError(res.message);
            } else {
                handleClose();
            }
        } else {
            const res = register(email, password);
            if (!res.success) {
                setError(res.message);
            } else {
                handleClose();
            }
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ textAlign: "center" }}>
                {tab === 0 ? "Sign In" : "Create Account"}
            </DialogTitle>
            <DialogContent>
                <Tabs
                    value={tab}
                    onChange={(e, newValue) => {
                        setTab(newValue);
                        setError("");
                    }}
                    centered
                    sx={{ mb: 2 }}
                >
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: "#febd69",
                            color: "black",
                            "&:hover": { bgcolor: "#f3a847" },
                        }}
                        onClick={handleSubmit}
                    >
                        {tab === 0 ? "Login" : "Create Account"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
