import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    Box, Typography, Paper, TextField, Button, Grid,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
    MenuItem
} from "@mui/material";

const FacultyMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newMaterial, setNewMaterial] = useState({
        title: "",
        description: "",
        courseId: "",
        link: "",
    });

    useEffect(() => {
        fetchCourses();
        fetchMaterials();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get("/api/faculty/courses");
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMaterials = async () => {
        try {
            const res = await api.get("/api/faculty/materials");
            setMaterials(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async () => {
        try {
            await api.post("/api/faculty/materials", newMaterial);
            alert("Material Uploaded!");
            setNewMaterial({ title: "", description: "", courseId: "", link: "" });
            fetchMaterials();
        } catch (err) {
            alert("Failed to upload material");
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Study Materials</Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Upload New Material</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth label="Title"
                            value={newMaterial.title}
                            onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            select fullWidth label="Select Course"
                            value={newMaterial.courseId}
                            onChange={(e) => setNewMaterial({ ...newMaterial, courseId: e.target.value })}
                        >
                            {courses.map(c => (
                                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth label="Link / URL"
                            value={newMaterial.link}
                            onChange={(e) => setNewMaterial({ ...newMaterial, link: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth multiline rows={2} label="Description"
                            value={newMaterial.description}
                            onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleAdd}>Upload Material</Button>
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((m) => (
                            <TableRow key={m._id}>
                                <TableCell>{m.title}</TableCell>
                                <TableCell>{m.course?.name}</TableCell>
                                <TableCell>
                                    <a href={m.link} target="_blank" rel="noopener noreferrer">View Resource</a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FacultyMaterials;
