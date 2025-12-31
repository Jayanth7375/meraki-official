import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import "./Admin.css";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [dept, setDept] = useState("");
  const [code, setCode] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/departments");
      setDepartments(res.data);
    } catch (err) {
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!dept.trim()) {
      alert("Enter department name");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        // UPDATE
        await api.put(`/api/departments/${editId}`, {
          name: dept.trim(),
          code: code.trim(),
          description: dept.trim(),
        });
      } else {
        // CREATE
        await api.post("/api/departments", {
          name: dept.trim(),
          code: code.trim(),
          description: dept.trim(),
        });
      }

      setDept("");
      setEditId(null);
      fetchDepartments();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;

    try {
      setLoading(true);
      await api.delete(`/api/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (d) => {
    setDept(d.name);
    setCode(d.code);
    setEditId(d._id);
  };

  return (
    <AdminLayout>
      <h1 className="admin-title">Manage Departments</h1>

      {error && <p className="error-text">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="admin-card">
        <h2>{editId ? "Edit Department" : "Add Department"}</h2>

        <div className="input-row">
          <input
            className="admin-input"
            placeholder="Department Name"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Dept Code (e.g. CSE)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ marginLeft: "10px" }}
          />

          <button
            className="admin-btn"
            onClick={handleAddOrUpdate}
            disabled={loading}
          >
            {editId ? "Update Department" : "Add Department"}
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h2>Department List</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="2">No departments found</td>
              </tr>
            ) : (
              departments.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(d)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(d._id)}
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
