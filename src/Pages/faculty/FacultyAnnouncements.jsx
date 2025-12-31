import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import { Add as AddIcon, Campaign as CampaignIcon } from "@mui/icons-material";
import "./faculty.css";

const FacultyAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "", open: false });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await api.get("/api/faculty/announcements");
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      setLoading(true);
      await api.post("/api/faculty/announcements", { title, content });
      setMessage({ type: "success", text: "Announcement Posted!", open: true });
      setTitle("");
      setContent("");
      fetchAnnouncements();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to post", open: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="fade-in">
      <div className="page-header">
        <Typography variant="h4" className="gradient-text" sx={{ fontWeight: "bold", mb: 1 }}>
          📢 Announcements Board
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Broadcast updates to your department.
        </Typography>
      </div>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* CREATE FORM */}
        <Grid item xs={12} md={4}>
          <Card className="glass-card" sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <AddIcon color="primary" /> New Announcement
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.5)" }}
                />
                <TextField
                  fullWidth
                  label="Content"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.5)" }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    borderRadius: "20px",
                    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "white",
                    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Post Announcement"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* LIST */}
        <Grid item xs={12} md={8}>
          <div className="announcement-list">
            {announcements.map((a) => (
              <Card key={a._id} className="announcement-item slide-up" sx={{ mb: 2, position: "relative", overflow: "visible" }}>
                <Box sx={{ position: "absolute", top: -10, right: 20 }}>
                  <Chip label="New" color="secondary" size="small" />
                </Box>
                <CardContent>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                    {a.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: "block" }}>
                    {new Date(a.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {a.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {announcements.length === 0 && (
              <Box sx={{ textAlign: "center", mt: 5, opacity: 0.7 }}>
                <CampaignIcon sx={{ fontSize: 60, color: "#ccc" }} />
                <Typography>No announcements yet.</Typography>
              </Box>
            )}
          </div>
        </Grid>
      </Grid>
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

export default FacultyAnnouncements;
