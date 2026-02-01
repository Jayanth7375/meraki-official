import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import "./Admin.css";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [course, setCourse] = useState("");
  const [deptId, setDeptId] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [credits, setCredits] = useState(4); // Default 4
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [courseRes, deptRes, staffRes] = await Promise.all([
        api.get("/api/courses"),
        api.get("/api/departments"),
        api.get("/api/staff"),
      ]);

      setCourses(courseRes.data);
      setDepartments(deptRes.data);
      setStaffList(staffRes.data); // Store all staff
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!course || !deptId) {
      alert("Fill all fields");
      return;
    }

    // Find department name from selected ID
    const selectedDept = departments.find(d => d._id === deptId);
    const departmentName = selectedDept ? selectedDept.name : "";

    if (!departmentName) {
      alert("Invalid Department Selected");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: course.trim(),
        department: departmentName,
        faculty: selectedFaculty || null,
        credits: parseInt(credits) || 4
      };

      if (editId) {
        await api.put(`/api/courses/${editId}`, payload);
      } else {
        await api.post("/api/courses", payload);
      }

      setCourse("");
      setDeptId("");
      setSelectedFaculty("");
      setCredits(4);
      setEditId(null);
      fetchInitialData();
    } catch (err) {
      console.error("Course submit error:", err);
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (c) => {
    setCourse(c.name);
    const dept = departments.find(d => d.name === c.department);
    setDeptId(dept ? dept._id : "");
    setSelectedFaculty(c.faculty || ""); // Populate Faculty
    setCredits(c.credits || 4);
    setEditId(c._id);
  };

  // Show ALL faculty (relaxed filter) to avoid "Empty" issues
  const availableFaculty = staffList;

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

          {/* FACULTY SELECTOR */}
          <select
            className="admin-input"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
          >
            <option value="">Assign Faculty (Optional)</option>
            {availableFaculty.map((s) => (
              <option key={s._id} value={s.user}> {/* Use User ID, not Staff ID */}
                {s.name} ({s.department}) {/* Show Dept in Label */}
              </option>
            ))}
          </select>

          {/* CREDITS INPUT */}
          <input
            className="admin-input"
            type="number"
            placeholder="Credits/Periods"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            min="1"
            max="10"
            style={{ width: "80px" }}
          />

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

        <div className="table-container">
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
                    <td>{c.department || "-"}</td>
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
      </div>
    </AdminLayout>
  );
}
