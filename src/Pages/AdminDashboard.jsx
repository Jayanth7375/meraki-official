import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import {
  People as PeopleIcon,
  Class as ClassIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Article as ArticleIcon
} from "@mui/icons-material";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    staffCount: 0,
    courseCount: 0,
    deptCount: 0,
    studentCount: 0,
  });

  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/api/admin/dashboard");
        setStats({
          staffCount: res.data.staffCount,
          courseCount: res.data.courseCount,
          deptCount: res.data.deptCount,
          studentCount: res.data.studentCount,
        });
        setActivities(res.data.activities || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
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
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Overview of the college management system
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Staff"
              value={stats.staffCount}
              icon={<PeopleIcon fontSize="large" />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Courses"
              value={stats.courseCount}
              icon={<ClassIcon fontSize="large" />}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Departments"
              value={stats.deptCount}
              icon={<BusinessIcon fontSize="large" />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Students"
              value={stats.studentCount}
              icon={<SchoolIcon fontSize="large" />}
              color="warning"
            />
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ArticleIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Recent Activity
                </Typography>
              </Box>
              {activities.length === 0 ? (
                <Typography color="textSecondary" variant="body2">
                  No recent activities recorded.
                </Typography>
              ) : (
                <List dense>
                  {activities.map((act, i) => (
                    <ListItem key={i} divider={i < activities.length - 1}>
                      <ListItemIcon>
                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />
                      </ListItemIcon>
                      <ListItemText primary={act} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </AdminLayout>
  );
}
