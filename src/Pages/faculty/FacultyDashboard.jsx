import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert
} from "@mui/material";
import {
  Class as ClassIcon,
  People as PeopleIcon
} from "@mui/icons-material";

const FacultyDashboard = () => {
  const [data, setData] = useState({ totalCourses: 0, totalStudents: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/faculty/dashboard")
      .then(res => setData(res.data))
      .catch(err => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: "100%", boxShadow: 3, borderRadius: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", p: 3 }}>
        <Box sx={{ p: 1.5, borderRadius: "50%", bgcolor: `${color}.light`, color: `${color}.main`, mr: 2 }}>
          {icon}
        </Box>
        <Box>
          <Typography color="textSecondary" variant="body2" fontWeight="bold">
            {title.toUpperCase()}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Faculty Dashboard
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard
              title="My Courses"
              value={data.totalCourses}
              icon={<ClassIcon fontSize="large" />}
              color="primary"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard
              title="Enrolled Students"
              value={data.totalStudents}
              icon={<PeopleIcon fontSize="large" />}
              color="secondary"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FacultyDashboard;
