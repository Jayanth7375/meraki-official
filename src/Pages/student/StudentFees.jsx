import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material";

const StudentFees = () => {
    const [fees, setFees] = useState([]);

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const res = await api.get("/api/student/fees");
            setFees(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Fee Status</Typography>
            <Grid container spacing={3}>
                {fees.map((f) => (
                    <Grid item xs={12} md={4} key={f._id}>
                        <Card sx={{ borderLeft: f.status === 'paid' ? '5px solid green' : '5px solid red' }}>
                            <CardContent>
                                <Typography variant="h6">{f.description}</Typography>
                                <Typography variant="h4" sx={{ my: 2 }}>
                                    ₹{f.amount}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Due: {new Date(f.dueDate).toLocaleDateString()}
                                </Typography>
                                <Chip
                                    label={f.status.toUpperCase()}
                                    color={f.status === 'paid' ? 'success' : 'error'}
                                    sx={{ mt: 1 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {fees.length === 0 && (
                    <Typography sx={{ p: 2 }}>No fee records found.</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default StudentFees;
