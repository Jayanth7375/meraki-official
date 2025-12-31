import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography, CssBaseline } from "@mui/material"; // MUI Imports
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar"; // Import new Sidebar
import "./FacultyLayout.css";

const drawerWidth = 260;

export default function FacultyLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // DRAWER CONTENT (The Menu)
  const drawerContent = (
    <div className="faculty-sidebar-content">
      <h2 className="brand" style={{ padding: "20px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>MERAKI FACULTY</h2>
      <nav style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
        <NavLink to="/faculty" end className="nav-item">Dashboard</NavLink>
        <NavLink to="/faculty/courses" className="nav-item">Courses</NavLink>
        <NavLink to="/faculty/students" className="nav-item">Students</NavLink>
        <NavLink to="/faculty/attendance" className="nav-item">Attendance</NavLink>
        <NavLink to="/faculty/assignments" className="nav-item">Assignments</NavLink>
        <NavLink to="/faculty/materials" className="nav-item">Study Materials</NavLink>
        <NavLink to="/faculty/fees" className="nav-item">Manage Fees</NavLink>
        <NavLink to="/faculty/announcements" className="nav-item">Announcements</NavLink>
        <NavLink to="/faculty/profile" className="nav-item">Profile</NavLink>
      </nav>
      <Box sx={{ marginTop: "auto", p: 2 }}>
        <button className="logout-btn" onClick={logout} style={{ width: "100%" }}>Logout</button>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* MOBILE APP BAR */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: "none" }, // Hide on Desktop
          background: "#1e3a8a"
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
            Faculty Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR COMPONENT */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerContent={drawerContent}
      />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: "64px", md: 0 }, // Add margin top for AppBar on mobile
          background: "#f8fafc",
          minHeight: "100vh"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
