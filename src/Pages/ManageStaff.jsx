import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress
} from "@mui/material";

export default function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const staffRes = await api.get("/api/staff"); // Correct endpoint from server.js
      const deptRes = await api.get("/api/departments");

      setStaffs(Array.isArray(staffRes.data) ? staffRes.data : []);
      setDepartments(Array.isArray(deptRes.data) ? deptRes.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load staff or departments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const { name, role, department, email, phone } = form;

    if (!name || !role || !department || !email || !phone) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await api.put(`/api/staff/${editId}`, form); // Fixed endpoint
      } else {
        await api.post("/api/staff", form); // Fixed endpoint
      }

      setForm({
        name: "",
        role: "",
        department: "",
        email: "",
        phone: "",
      });
      setEditId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setForm({
      name: s.name,
      role: s.role,
      department: s.department,
      email: s.email,
      phone: s.phone,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/api/staff/${id}`); // Fixed endpoint
      fetchData();
    } catch (err) {
      alert("Failed to delete staff");
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Manage Staff
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress sx={{ mb: 2 }} />}

      {/* FORM */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          {editId ? "Edit Staff" : "Add New Staff"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={form.department}
                label="Department"
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              >
                {departments.map((d) => (
                  <MenuItem key={d._id} value={d.code}>
                    {d.name} ({d.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 1 }}
            >
              {editId ? "Update Staff" : "Add Staff"}
            </Button>
            {editId && (
              <Button
                variant="text"
                onClick={() => {
                  setEditId(null);
                  setForm({ name: "", role: "", department: "", email: "", phone: "" });
                }}
                sx={{ mt: 1, ml: 1 }}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* LIST */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.default" }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No staff found
                </TableCell>
              </TableRow>
            ) : (
              staffs.map((s) => (
                <TableRow key={s._id} hover>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.role}</TableCell>
                  <TableCell>{s.department}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEdit(s)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(s._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
