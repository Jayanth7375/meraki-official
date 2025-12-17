import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import "./Admin.css";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [course, setCourse] = useState("");
  const [deptId, setDeptId] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [courseRes, deptRes] = await Promise.all([
        api.get("/api/courses"),
        api.get("/api/departments"),
      ]);

      setCourses(courseRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      setError("Failed to load courses or departments");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!course || !deptId) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await api.put(`/api/courses/${editId}`, {
          name: course.trim(),
          departmentId: deptId,
        });
      } else {
        await api.post("/api/courses", {
          name: course.trim(),
          departmentId: deptId,
        });
      }

      setCourse("");
      setDeptId("");
      setEditId(null);
      fetchInitialData();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (c) => {
    setCourse(c.name);
    setDeptId(c.departmentId?._id);
    setEditId(c._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      setLoading(true);
      await api.delete(`/api/courses/${id}`);
      fetchInitialData();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="admin-title">Manage Courses</h1>

      {error && <p className="error-text">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="admin-card">
        <h2>{editId ? "Edit Course" : "Add Course"}</h2>

        <div className="input-row">
          <input
            className="admin-input"
            placeholder="Course Name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <select
            className="admin-input"
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          <button
            className="admin-btn"
            onClick={handleAddOrUpdate}
            disabled={loading}
          >
            {editId ? "Update Course" : "Add Course"}
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h2>Course List</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="3">No courses found</td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.departmentId?.name || "-"}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c._id)}
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
