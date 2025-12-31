import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../assets/image.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")); // ✅ SAFE
  const role = user?.role;

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="logo-box">
          <img src={logo} alt="Meraki Logo" className="nav-logo" />
        </Link>

        {/* NAV LINKS */}
        <div className={`nav-links ${open ? "active" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>

          <div className="dropdown">
            <span className="dropbtn">Academics ▼</span>
            <div className="dropdown-content">
              <Link to="/academics/courses" onClick={() => setOpen(false)}>Courses</Link>
              <Link to="/academics/staff" onClick={() => setOpen(false)}>Staff</Link>
              <Link to="/academics/departments" onClick={() => setOpen(false)}>Departments</Link>
            </div>
          </div>

          <Link to="/admissions" onClick={() => setOpen(false)}>Admissions</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>

          {/* 🔥 ADMIN ONLY */}
          {role === "admin" && (
            <Link
              to="/admin/pages"
              className="admin-link"
              onClick={() => setOpen(false)}
            >
              Edit Pages
            </Link>
          )}

          {/* LOGIN BUTTON */}
          <Link to="/login" className="login-btn" onClick={() => setOpen(false)}>
            Login
          </Link>
        </div>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
