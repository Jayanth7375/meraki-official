import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Paper,
} from "@mui/material";

export default function FacultyFees() {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [formData, setFormData] = useState({
        studentId: "",
        amount: "",
        description: "",
        dueDate: "",
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        // Fetch courses on mount
        api.get("/api/faculty/courses").then((res) => setCourses(res.data));
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            // Fetch students for selected course
            api
                .get(`/api/faculty/courses/${selectedCourse}/students`)
                .then((res) => setStudents(res.data))
                .catch((err) => console.error(err));
        }
    }, [selectedCourse]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/faculty/fees", formData);
            setMessage({ type: "success", text: "Fee added successfully!" });
            setFormData({
                studentId: "",
                amount: "",
                description: "",
                dueDate: "",
            });
        } catch (err) {
            setMessage({
                type: "error",
                text: err.response?.data?.message || "Failed to add fee",
            });
        }
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Manage Student Fees
            </Typography>

            <Paper sx={{ p: 4, maxWidth: 600 }}>
                {message.text && (
                    <Alert severity={message.type} sx={{ mb: 2 }}>
                        {message.text}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    {/* COURSE SELECT */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Select Course</InputLabel>
                        <Select
                            value={selectedCourse}
                            label="Select Course"
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            {courses.map((c) => (
                                <MenuItem key={c._id} value={c._id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* STUDENT SELECT (Dependent on Course) */}
                    <FormControl fullWidth margin="normal" disabled={!selectedCourse}>
                        <InputLabel>Select Student</InputLabel>
                        <Select
                            name="studentId"
                            value={formData.studentId}
                            label="Select Student"
                            onChange={handleChange}
                        >
                            {students.map((s) => (
                                <MenuItem key={s._id} value={s._id}>
                                    {s.name} ({s.rollNo})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* AMOUNT */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Amount (₹)"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                    {/* DESCRIPTION */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description (e.g., Semester Fee)"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    {/* DUE DATE */}
                    <TextField
                        fullWidth
                        margin="normal"
                        // label="Due Date"
                        name="dueDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        helperText="Select due date"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 3 }}
                        fullWidth
                    >
                        Assign Fee
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
