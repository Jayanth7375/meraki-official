import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/image.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // 🔄 SYNC AUTH STATE
  useEffect(() => {
    const syncAuth = () => {
      setRole(localStorage.getItem("role"));
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" className="logo-box" onClick={() => setOpen(false)}>
          <img src={logo} alt="Meraki Logo" className="nav-logo" />
        </Link>

        {/* NAV LINKS */}
        <div className={`nav-links ${open ? "active" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          <Link to="/privacy" onClick={() => setOpen(false)}>Privacy</Link>
          <Link to="/terms" onClick={() => setOpen(false)}>Terms</Link>

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

          {/* AUTH CTA */}
          {role ? (
            <button className="logout-link" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
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
