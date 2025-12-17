import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import "./Admin.css";

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

  return (
    <AdminLayout>
      <div className="dashboard-wrapper">
        <h1 className="dash-title">Admin Dashboard</h1>

        {loading && <p>Loading dashboard...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <>
            <div className="stats-row">
              <div className="stat-box">
                <h3>Staff</h3>
                <p>{stats.staffCount}</p>
              </div>

              <div className="stat-box">
                <h3>Courses</h3>
                <p>{stats.courseCount}</p>
              </div>

              <div className="stat-box">
                <h3>Departments</h3>
                <p>{stats.deptCount}</p>
              </div>

              <div className="stat-box">
                <h3>Students</h3>
                <p>{stats.studentCount}</p>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="section">
              <h2>📝 Recent Activities</h2>
              <div className="activity-box">
                {activities.length === 0 ? (
                  <p>No activity yet.</p>
                ) : (
                  activities.map((a, i) => <p key={i}>• {a}</p>)
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
