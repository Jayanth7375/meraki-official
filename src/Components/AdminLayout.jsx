import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔒 PROTECT ADMIN ROUTES
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    // CLEAR SESSION
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-wrapper">
      {/* TOP NAVBAR */}
      <header className="admin-topbar">
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <h2>Admin Panel</h2>
      </header>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <h3 className="sidebar-title">Admin Menu</h3>

        <Link to="/admin" className="side-link" onClick={() => setOpen(false)}>
          📊 Dashboard
        </Link>

        <Link
          to="/admin/staff"
          className="side-link"
          onClick={() => setOpen(false)}
        >
          👨‍🏫 Manage Staff
        </Link>

        <Link
          to="/admin/courses"
          className="side-link"
          onClick={() => setOpen(false)}
        >
          📚 Manage Courses
        </Link>

        <Link
          to="/admin/departments"
          className="side-link"
          onClick={() => setOpen(false)}
        >
          🏛 Manage Departments
        </Link>

        <Link
          to="/admin/pages"
          className="side-link"
          onClick={() => setOpen(false)}
        >
          📝 Manage Pages
        </Link>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">{children}</main>
    </div>
  );
}
