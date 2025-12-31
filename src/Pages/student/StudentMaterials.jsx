import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";

const StudentMaterials = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await api.get("/api/student/materials");
            setMaterials(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Study Materials</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materials.map((m) => (
                            <TableRow key={m._id}>
                                <TableCell>{m.title}</TableCell>
                                <TableCell>{m.course?.name}</TableCell>
                                <TableCell>{m.description}</TableCell>
                                <TableCell>
                                    <a href={m.link} target="_blank" rel="noopener noreferrer"
                                        style={{ color: '#1976d2', fontWeight: 'bold' }}>
                                        View Resource
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudentMaterials;
