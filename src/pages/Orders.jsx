import { useAuth } from "../context/AuthContext";
import { Box, Typography, Card, CardContent, Chip, Button, Divider, } from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import jsPDF from "jspdf";

export default function Orders() {
    const { user } = useAuth();
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter(
        (order) => order.userEmail === user?.email
    );
    const steps = ["Placed", "Processing", "Shipped", "Delivered"];
    const downloadInvoice = (order) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Invoice", 20, 20);
        doc.setFontSize(12);
        doc.text(`Order ID: ${order.id}`, 20, 35);
        doc.text(`Date: ${order.date}`, 20, 45);
        doc.text(`Total: $${order.total}`, 20, 55);
        doc.save(`invoice-${order.id}.pdf`);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Your Orders
            </Typography>
            {userOrders.length === 0 && (
                <Typography>No orders found</Typography>
            )}
            {userOrders.map((order) => (
                <Card key={order.id} sx={{ mb: 4, boxShadow: 4, borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                            Order ID: {order.id}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Date: {order.date}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            Total: ${order.total}
                        </Typography>
                        <Chip
                            label={order.status}
                            color={
                                order.status === "Delivered"
                                    ? "success"
                                    : order.status === "Shipped"
                                        ? "warning"
                                        : "info"
                            }
                            sx={{ mb: 2 }}
                        />
                        <Divider sx={{ mb: 2 }} />
                        {order.items.map((item) => (
                            <Typography key={item.id}>
                                • {item.title} × {item.quantity}
                            </Typography>
                        ))}
                        <Box sx={{ mt: 3 }}>
                            <Stepper
                                activeStep={
                                    steps.indexOf(order.status) >= 0
                                        ? steps.indexOf(order.status)
                                        : 0
                                }
                                alternativeLabel
                            >
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Button
                            variant="outlined"
                            sx={{ mt: 3 }}
                            onClick={() => downloadInvoice(order)}
                        >
                            Download Invoice
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
