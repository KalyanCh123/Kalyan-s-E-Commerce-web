import { useState } from "react";
import { Box, Typography, Card, CardContent, Button, MenuItem, Select, Divider, } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Admin() {
    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem("orders")) || []);
    const updateStatus = (id, newStatus) => {
        const updated = orders.map((o) => o.id === id ? { ...o, status: newStatus } : o);
        setOrders(updated);
        localStorage.setItem("orders", JSON.stringify(updated));
    };
    const deleteOrder = (id) => {
        const updated = orders.filter((o) => o.id !== id);
        setOrders(updated);
        localStorage.setItem("orders", JSON.stringify(updated));
    };
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const chartData = [{ name: "Total Sales", value: totalSales },];

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Admin Dashboard
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
                Total Sales: ${totalSales}
            </Typography>
            <Box sx={{ width: "100%", height: 300, mb: 4 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
            <Divider sx={{ mb: 3 }} />
            {orders.map((order) => (
                <Card key={order.id} sx={{ mb: 3, borderRadius: 3 }}>
                    <CardContent>
                        <Typography fontWeight="bold">
                            {order.id}
                        </Typography>
                        <Typography>
                            {order.userEmail}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            Total: ${order.total}
                        </Typography>
                        <Select
                            value={order.status}
                            onChange={(e) =>
                                updateStatus(order.id, e.target.value)
                            }
                            sx={{ mr: 2 }}
                        >
                            <MenuItem value="Processing">Processing</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                        </Select>
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={() => deleteOrder(order.id)}
                        >
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ))}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5">Sales Analytics</Typography>
                <BarChart width={600} height={300} data={orders}>
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" />
                </BarChart>
            </Box>
        </Box>
    );
}
