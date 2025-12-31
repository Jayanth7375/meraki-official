import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from "@mui/material";

const StudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const res = await api.get("/api/student/attendance");
            setAttendance(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>My Attendance</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Period</TableCell> {/* Added Header */}
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendance.map((a) => (
                            <TableRow key={a._id}>
                                <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                                <TableCell>{a.courseId?.name || "Unknown Course"}</TableCell>
                                <TableCell>{a.period || "-"}</TableCell> {/* Added Cell */}
                                <TableCell>
                                    <Chip
                                        label={a.status}
                                        color={a.status === 'present' ? 'success' : 'error'} // Fixed case sensitivity
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudentAttendance;
