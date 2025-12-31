import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    Box, Typography, Paper, TextField, Button, Grid,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
    MenuItem
} from "@mui/material";

const FacultyAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newAssignment, setNewAssignment] = useState({
        title: "",
        description: "",
        courseId: "",
        dueDate: "",
    });

    useEffect(() => {
        fetchCourses();
        fetchAssignments();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get("/api/faculty/courses");
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAssignments = async () => {
        try {
            const res = await api.get("/api/faculty/assignments");
            setAssignments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async () => {
        try {
            await api.post("/api/faculty/assignments", newAssignment);
            alert("Assignment Added!");
            setNewAssignment({ title: "", description: "", courseId: "", dueDate: "" });
            fetchAssignments();
        } catch (err) {
            alert("Failed to add assignment");
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Manage Assignments</Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Add New Assignment</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth label="Title"
                            value={newAssignment.title}
                            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            select fullWidth label="Select Course"
                            value={newAssignment.courseId}
                            onChange={(e) => setNewAssignment({ ...newAssignment, courseId: e.target.value })}
                        >
                            {courses.map(c => (
                                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth type="date" label="Due Date" InputLabelProps={{ shrink: true }}
                            value={newAssignment.dueDate}
                            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth multiline rows={2} label="Description"
                            value={newAssignment.description}
                            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleAdd}>Post Assignment</Button>
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Due Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments.map((a) => (
                            <TableRow key={a._id}>
                                <TableCell>{a.title}</TableCell>
                                <TableCell>{a.course?.name}</TableCell>
                                <TableCell>{new Date(a.dueDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FacultyAssignments;
