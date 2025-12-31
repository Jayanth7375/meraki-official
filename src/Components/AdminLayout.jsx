import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography, CssBaseline } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import "./AdminLayout.css"; // Keep mostly empty or cleanup if not needed, relying on MUI now

const drawerWidth = 260;

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // 🔒 PROTECT ADMIN ROUTES
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login", { replace: true });
  };

  const drawerContent = (
    <div className="admin-sidebar-content">
      {/* Use inline styles or creating a css class if prefered, ensuring consistency with others */}
      <h2 className="brand" style={{ padding: "20px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>MERAKI ADMIN</h2>
      <nav style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>

        {/* Changed Link to NavLink for active styling support if desired, using same class as others */}
        <NavLink to="/admin" end className="nav-item">📊 Dashboard</NavLink>
        <NavLink to="/admin/staff" className="nav-item">👨‍🏫 Manage Staff</NavLink>
        <NavLink to="/admin/courses" className="nav-item">📚 Manage Courses</NavLink>
        <NavLink to="/admin/departments" className="nav-item">🏛 Manage Departments</NavLink>
        <NavLink to="/admin/applications" className="nav-item">📄 Review Applications</NavLink>
        <NavLink to="/admin/queries" className="nav-item">💬 Queries | Messages</NavLink>
      </nav>

      <Box sx={{ marginTop: "auto", p: 2 }}>
        <button className="logout-btn" onClick={handleLogout} style={{ width: "100%" }}>🚪 Logout</button>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* MOBILE APP BAR - Different Color for Admin maybe? Or keep consistent */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: "none" },
          background: "#1e293b" // Darker for admin
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerContent={drawerContent}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: "64px", md: 0 },
          background: "#f1f5f9",
          minHeight: "100vh"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
