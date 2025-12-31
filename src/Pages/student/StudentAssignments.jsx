import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    Box, Typography, Paper, Grid, Card, CardContent, Chip
} from "@mui/material";

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const res = await api.get("/api/student/assignments");
            setAssignments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>My Assignments</Typography>
            <Grid container spacing={3}>
                {assignments.map((a) => (
                    <Grid item xs={12} md={6} key={a._id}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6" color="primary">
                                    {a.title}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    Course: {a.course?.name} | Due: {new Date(a.dueDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    {a.description}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Chip label={a.department} size="small" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {assignments.length === 0 && (
                    <Typography sx={{ p: 2 }}>No assignments due.</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default StudentAssignments;
