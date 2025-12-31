import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
    Paper,
    Alert,
    Chip,
    Button
} from "@mui/material";
import {
    School as SchoolIcon,
    Class as ClassIcon,
    Business as BusinessIcon,
    Person as PersonIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CourseRegistrationSection = ({ studentDept, onEnroll }) => {
    const [available, setAvailable] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/api/student/available-courses")
            .then(res => setAvailable(res.data))
            .catch(err => console.error("Available courses error", err));
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            setLoading(true);
            await api.post("/api/student/enroll-course", { courseId });
            alert("Enrolled Successfully!");
            onEnroll(); // Trigger refresh
        } catch (err) {
            alert("Enrollment Failed");
        } finally {
            setLoading(false);
        }
    };

    if (available.length === 0) return null;

    return (
        <Paper sx={{ mt: 4, p: 3, bgcolor: "#f5f5f5" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Available for Registration ({studentDept})
            </Typography>
            <Grid container spacing={3}>
                {available.map(course => (
                    <Grid item xs={12} sm={6} md={4} key={course._id}>
                        <Card sx={{ border: "1px solid #1976d2" }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{course.name}</Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>{course.description}</Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => handleEnroll(course._id)}
                                    disabled={loading}
                                >
                                    Enroll Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default function StudentDashboard() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api
            .get("/api/student/dashboard")
            .then((res) => setStudent(res.data))
            .catch((err) => {
                console.error(err);
                setError("Failed to load dashboard");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const InfoCard = ({ icon, title, value, color }) => (
        <Card sx={{ height: "100%", boxShadow: 2, borderRadius: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Box sx={{ p: 1, borderRadius: "50%", bgcolor: `${color}.light`, color: `${color}.main`, mr: 2 }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" color="textSecondary" fontWeight="bold">
                        {title.toUpperCase()}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            {/* NAVBAR */}
            {/* TITLE BAR / WELCOME SECTION */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Dashboard
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Overview of your academic status
                </Typography>
            </Box>

            {/* CONTENT */}
            <Box sx={{ px: 3, pb: 4 }}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <>
                        {/* WELCOME */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h4" fontWeight="bold">
                                Welcome, {student.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {student.department} Department | Roll No: {student.rollNo}
                            </Typography>
                        </Box>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <InfoCard
                                    title="My Department"
                                    value={student.department}
                                    icon={<BusinessIcon />}
                                    color="info"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <InfoCard
                                    title="Enrolled Courses"
                                    value={student.courses.length}
                                    icon={<ClassIcon />}
                                    color="success"
                                />
                            </Grid>
                        </Grid>

                        {/* ENROLLED COURSES LIST */}
                        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                            My Courses
                        </Typography>
                        <Grid container spacing={3}>
                            {student.courses.length === 0 ? (
                                <Grid item xs={12}>
                                    <Alert severity="info">You are not enrolled in any courses yet.</Alert>
                                </Grid>
                            ) : (
                                student.courses.map((course) => (
                                    <Grid item xs={12} sm={6} md={4} key={course._id}>
                                        <Card sx={{ height: "100%", boxShadow: 3, transition: "0.3s", "&:hover": { transform: "translateY(-5px)" } }}>
                                            <CardContent>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                                    <Chip label={course.department} size="small" color="primary" variant="outlined" />
                                                </Box>
                                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                    {course.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {course.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            )}
                        </Grid>

                        {/* COURSE REGISTRATION SECTION */}
                        <CourseRegistrationSection studentDept={student.department} onEnroll={() => window.location.reload()} />
                    </>
                )}
            </Box>
        </Box>
    );
}
