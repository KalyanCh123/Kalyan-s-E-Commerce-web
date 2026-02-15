import { Box, Typography } from "@mui/material";

export default function Hero() {
    return (
        <Box
            sx={{
                height: 350,
                backgroundImage: "url('https://images.unsplash.com/photo-1607083206968-13611e3d76db')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
            }}
        >
            <Typography variant="h3" fontWeight="bold">
                Big Sale – Up To 70% Off 🔥
            </Typography>
        </Box>
    );
}
