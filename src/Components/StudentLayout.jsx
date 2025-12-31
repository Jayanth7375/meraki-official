import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography, CssBaseline } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import "../Components/FacultyLayout.css"; // Reuse updated Faculty styles

const drawerWidth = 260;

export default function StudentLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const drawerContent = (
        <div className="faculty-sidebar-content">
            <h2 className="brand" style={{ padding: "20px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>MERAKI STUDENT</h2>
            <nav style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
                <NavLink to="/student" end className="nav-item">Dashboard</NavLink>
                <NavLink to="/student/attendance" className="nav-item">Attendance</NavLink>
                <NavLink to="/student/fees" className="nav-item">Fees</NavLink>
                <NavLink to="/student/assignments" className="nav-item">Assignments</NavLink>
                <NavLink to="/student/materials" className="nav-item">Study Material</NavLink>
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
                    display: { md: "none" },
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
                        Student Portal
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
                    background: "#f8fafc",
                    minHeight: "100vh"
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
