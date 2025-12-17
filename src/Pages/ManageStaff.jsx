import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import "./Admin.css";

export default function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [staffRes, deptRes] = await Promise.all([
        api.get("/api/staffs"),
        api.get("/api/departments"),
      ]);

      setStaffs(staffRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      setError("Failed to load staff or departments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.role || !form.department) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await api.put(`/api/staffs/${editId}`, form);
      } else {
        await api.post("/api/staffs", form);
      }

      setForm({
        name: "",
        role: "",
        department: "",
        email: "",
        phone: "",
      });
      setEditId(null);

      fetchInitialData();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s) => {
    setForm({
      name: s.name,
      role: s.role,
      department: s.department,
      email: s.email || "",
      phone: s.phone || "",
    });
    setEditId(s._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    try {
      setLoading(true);
      await api.delete(`/api/staffs/${id}`);
      fetchInitialData();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="admin-title">Manage Staff</h1>

      {error && <p className="error-text">{error}</p>}
      {loading && <p>Loading...</p>}

      {/* FORM */}
      <div className="admin-card">
        <h2>{editId ? "Edit Staff" : "Add Staff"}</h2>

        <input
          className="admin-input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="admin-input"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <select
          className="admin-input"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          className="admin-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="admin-input"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button
          className="admin-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {editId ? "Update Staff" : "Add Staff"}
        </button>
      </div>

      {/* TABLE */}
      <div className="admin-card">
        <h2>Staff List</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.length === 0 ? (
              <tr>
                <td colSpan="4">No staff found</td>
              </tr>
            ) : (
              staffs.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.role}</td>
                  <td>{s.department}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
