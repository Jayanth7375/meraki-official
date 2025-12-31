import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/image.png";
import "./Auth.css";
import Antigravity from "../Components/Antigravity";

function Register() {
  const [role, setRole] = useState("student");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    department: "", // Added department
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // Fetch Departments on Mount
  useEffect(() => {
    api.get("/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Failed to fetch departments", err));
  }, []);

  const regex = {
    fname: /^[A-Za-z ]{3,}$/,
    lname: /^[A-Za-z ]{1,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9][0-9]{9}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ... same as before
    const trimmedValue = value.trimStart();

    setForm((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));

    // Confirm password validation
    if (name === "confirm") {
      setErrors((prev) => ({
        ...prev,
        confirm:
          trimmedValue !== form.password ? "Passwords do not match" : "",
      }));
      return;
    }

    if (regex[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: regex[name].test(trimmedValue)
          ? ""
          : `Invalid ${name}`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (Object.values(form).some((v) => v === "")) {
      setApiError("Please fill all fields");
      return;
    }

    // ... validation logic

    try {
      await api.post("/api/auth/register", {
        name: `${form.fname} ${form.lname}`.trim(),
        email: form.email,
        phone: form.phone,
        password: form.password,
        role,
        department: form.department, // Send department
      });

      alert(`✅ Registered successfully as ${role.toUpperCase()}`);
      navigate("/login");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <Antigravity />
      <div className="auth-card">
        {/* ... Logo, Title, Role Switch (same) ... */}
        <img src={logo} alt="College Logo" className="auth-logo" />
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Register to apply for Meraki programs</p>

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Register to apply for Meraki programs</p>

        {/* Role Selector Removed: Defaulting to Student */}

        <form onSubmit={handleSubmit} noValidate>
          {/* ... Name, Email, Phone fields (same) ... */}
          <div className="auth-field">
            <label>First Name</label>
            <input type="text" name="fname" value={form.fname} onChange={handleChange} />
            {errors.fname && <span className="auth-error">{errors.fname}</span>}
          </div>
          <div className="auth-field">
            <label>Last Name</label>
            <input type="text" name="lname" value={form.lname} onChange={handleChange} />
            {errors.lname && <span className="auth-error">{errors.lname}</span>}
          </div>
          <div className="auth-field">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="auth-error">{errors.email}</span>}
          </div>

          {/* DEPARTMENT DROPDOWN */}
          <div className="auth-field">
            <label>Department</label>
            <select name="department" value={form.department} onChange={handleChange} className="auth-input">
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d._id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="auth-field">
            <label>Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
            {errors.phone && <span className="auth-error">{errors.phone}</span>}
          </div>

          {/* ... Password fields (same) ... */}
          <div className="auth-field">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
            {errors.password && <span className="auth-error">{errors.password}</span>}
          </div>
          <div className="auth-field">
            <label>Confirm Password</label>
            <input type="password" name="confirm" value={form.confirm} onChange={handleChange} />
            {errors.confirm && <span className="auth-error">{errors.confirm}</span>}
          </div>

          {apiError && <p className="auth-error">{apiError}</p>}
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <p className="auth-secondary">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
