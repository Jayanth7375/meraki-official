import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  Chip
} from "@mui/material";
import { School, Person, Email, Work } from "@mui/icons-material";
import "./faculty.css";

const FacultyProfile = () => {
  const [stats, setStats] = useState({ totalCourses: 0, totalStudents: 0 });
  const name = localStorage.getItem("name") || "Faculty Member";
  const email = localStorage.getItem("email") || "faculty@meraki.edu";
  const role = "Senior Faculty";

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/api/faculty/dashboard");
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className="fade-in" sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Card className="glass-card slide-up" sx={{ maxWidth: 800, width: "100%", p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "primary.main",
              fontSize: "3rem",
              mb: 2,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
            }}
          >
            {name.charAt(0)}
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: "bold" }} className="gradient-text">
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>
            Department of Computer Science
          </Typography>
          <Chip label={role} color="primary" variant="outlined" size="small" />
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {/* INFO SECTION */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Contact Information
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Email color="action" />
              <Typography>{email}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Work color="action" />
              <Typography>Meraki College of Innovation</Typography>
            </Box>
          </Grid>

          {/* STATS SECTION */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Academic Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: "rgba(33, 150, 243, 0.1)", textAlign: "center", p: 2, boxShadow: "none", borderRadius: 3 }}>
                  <School color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>{stats.totalCourses}</Typography>
                  <Typography variant="caption" color="textSecondary">Active Courses</Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", textAlign: "center", p: 2, boxShadow: "none", borderRadius: 3 }}>
                  <Person color="success" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>{stats.totalStudents}</Typography>
                  <Typography variant="caption" color="textSecondary">Students Mentored</Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default FacultyProfile;
