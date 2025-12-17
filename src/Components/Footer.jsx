import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>Meraki College</h3>
          <p>
            Building future-ready professionals through innovation and world
            class education.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Support</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📍 Vellore, Tamil Nadu</p>
          <p>📧 info@meraki.com</p>
          <p>📞 +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Meraki College of Innovation</p>
      </div>
    </footer>
  );
}

export default Footer;
