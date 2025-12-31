import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar
} from "@mui/material";

const FacultyStudents = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);

  // 1️⃣ Load faculty courses (ONCE)
  useEffect(() => {
    api
      .get("/api/faculty/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Courses error:", err));
  }, []);

  // 2️⃣ Load students ONLY AFTER course is selected
  useEffect(() => {
    if (!selectedCourse) return;

    api
      .get(`/api/faculty/courses/${selectedCourse}/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.error("Students error:", err));
  }, [selectedCourse]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Enrolled Students
      </Typography>

      {/* COURSE SELECT */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Select Course to View Students</InputLabel>
          <Select
            value={selectedCourse}
            label="Select Course to View Students"
            onChange={e => setSelectedCourse(e.target.value)}
          >
            {courses.map(course => (
              <MenuItem key={course._id} value={course._id}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* STUDENT LIST */}
      {selectedCourse && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Roll No</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">No students found for this course.</TableCell>
                </TableRow>
              ) : (
                students.map(student => (
                  <TableRow key={student._id} hover>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32 }}>{student.name[0]}</Avatar>
                      {student.name}
                    </TableCell>
                    <TableCell>{student.department}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default FacultyStudents;
