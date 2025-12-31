import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Alert
} from "@mui/material";
import { Class as ClassIcon } from "@mui/icons-material";

const FacultyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/faculty/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Courses
      </Typography>

      {courses.length === 0 && !loading ? (
        <Alert severity="info">No courses assigned to you yet.</Alert>
      ) : (
        <Grid container spacing={3}>
          {courses.map(c => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={c._id}>
              <Card sx={{ height: "100%", boxShadow: 3, transition: "0.3s", "&:hover": { transform: "translateY(-5px)" } }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Chip icon={<ClassIcon />} label={c.department} color="primary" variant="outlined" />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {c.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {c.description || "No description provided."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FacultyCourses;
