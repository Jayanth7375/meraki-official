import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Alert,
  Snackbar,
  CircularProgress
} from "@mui/material";
import { Save as SaveIcon, Event as EventIcon } from "@mui/icons-material";

const FacultyAttendance = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [day, setDay] = useState(new Date().toLocaleDateString("en-US", { weekday: "long" }));
  const [period, setPeriod] = useState(1); // Default Period 1
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "", open: false });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchStudents();
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/api/faculty/courses");
      setCourses(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load courses", open: true });
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/faculty/courses/${selectedCourse}/students`);
      setStudents(data);
      // Initialize attendance as 'present' for all
      const initialAttendance = {};
      data.forEach(s => {
        initialAttendance[s._id] = "present";
      });
      setAttendance(initialAttendance);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load students", open: true });
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    const dayName = new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" });
    setDay(dayName);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const submitAttendance = async () => {
    try {
      setLoading(true);
      const records = Object.keys(attendance).map((studentId) => ({
        studentId,
        status: attendance[studentId],
      }));

      await api.post("/api/faculty/attendance", {
        courseId: selectedCourse,
        date,
        day,
        period,
        records,
      });

      setMessage({ type: "success", text: "Attendance Saved Successfully!", open: true });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to save attendance", open: true });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present": return "success";
      case "absent": return "error";
      case "od": return "warning";
      default: return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* ... Title ... */}

      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Select Course</InputLabel>
              <Select
                value={selectedCourse}
                label="Select Course"
                onChange={e => setSelectedCourse(e.target.value)}
              >
                {courses.map(c => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name} ({c.department})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ... Date ... */}
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* PERIOD SELECTOR */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Period (Hour)</InputLabel>
              <Select
                value={period}
                label="Period (Hour)"
                onChange={(e) => setPeriod(e.target.value)}
              >
                {/* Dynamic Periods based on Course Credits */}
                {(() => {
                  const currentCourse = courses.find(c => c._id === selectedCourse);
                  const totalPeriods = currentCourse?.credits || 8; // Default to 8 if not set

                  return Array.from({ length: totalPeriods }, (_, i) => i + 1).map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ));
                })()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <Chip
              icon={<EventIcon />}
              label={day}
              color="primary"
              variant="outlined"
              sx={{ width: "100%", height: 56, fontSize: "1rem" }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* STUDENT LIST */}
      {selectedCourse && (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          {loading && <Box sx={{ p: 2, textAlign: "center" }}><CircularProgress /></Box>}

          {!loading && students.length === 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="textSecondary">No students found for this course.</Typography>
            </Box>
          )}

          {!loading && students.length > 0 && (
            <>
              <Table>
                <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell><strong>Roll No</strong></TableCell>
                    <TableCell><strong>Student Name</strong></TableCell>
                    <TableCell align="center"><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map(s => (
                    <TableRow key={s._id} hover>
                      <TableCell>{s.rollNo}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>{s.name[0]}</Avatar>
                        {s.name}
                      </TableCell>
                      <TableCell align="center">
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={attendance[s._id] || "present"}
                            onChange={e => handleStatusChange(s._id, e.target.value)}
                            sx={{
                              color: (theme) => theme.palette[getStatusColor(attendance[s._id] || "present")].main,
                              fontWeight: "bold"
                            }}
                          >
                            <MenuItem value="present" sx={{ color: "success.main" }}>Present</MenuItem>
                            <MenuItem value="absent" sx={{ color: "error.main" }}>Absent</MenuItem>
                            <MenuItem value="od" sx={{ color: "warning.main" }}>On Duty (OD)</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Box sx={{ p: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SaveIcon />}
                  onClick={submitAttendance}
                  sx={{ px: 4, borderRadius: 2 }}
                >
                  Save Attendance
                </Button>
              </Box>
            </>
          )}
        </TableContainer>
      )}

      {/* NOTIFICATIONS */}
      <Snackbar
        open={message.open}
        autoHideDuration={4000}
        onClose={() => setMessage({ ...message, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={message.type === "success" ? "success" : "error"} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FacultyAttendance;
