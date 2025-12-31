import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/image.png";
import "./Auth.css";
import Antigravity from "../Components/Antigravity";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [selectedRole, setSelectedRole] = useState("student");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trimStart();

    setForm((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: regex[name].test(trimmedValue) ? "" : `Invalid ${name}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!form.email || !form.password) {
      setApiError("Email and password are required");
      return;
    }

    if (errors.email || errors.password) {
      setApiError("Fix validation errors");
      return;
    }

    try {
      const res = await api.post("/api/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const { token, user } = res.data;

      // ROLE CHECK
      if (user.role !== selectedRole) {
        setApiError(`This account belongs to ${user.role}, not ${selectedRole}`);
        return;
      }

      // SAVE SESSION
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);

      // REDIRECT
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "faculty") {
        navigate("/faculty");
      } else if (user.role === "student") {
        navigate("/student");
      } else {
        navigate("/");
      }


    } catch (err) {
      setApiError(
        err.response?.data?.message || "Unable to login. Try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <Antigravity />
      <div className="auth-card">
        <img src={logo} alt="College Logo" className="auth-logo" />

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your Meraki portal</p>

        <div className="role-switch">
          <button
            type="button"
            className={selectedRole === "student" ? "role-btn active" : "role-btn"}
            onClick={() => setSelectedRole("student")}
          >
            Student
          </button>

          <button
            type="button"
            className={selectedRole === "admin" ? "role-btn active" : "role-btn"}
            onClick={() => setSelectedRole("admin")}
          >
            Admin
          </button>

          <button
            type="button"
            className={selectedRole === "faculty" ? "role-btn active" : "role-btn"}
            onClick={() => setSelectedRole("faculty")}
          >
            Faculty
          </button>

        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="auth-error">{errors.email}</span>}
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="auth-error">{errors.password}</span>
            )}
          </div>

          {apiError && <p className="auth-error">{apiError}</p>}

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-secondary">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </p>

        <div className="auth-links">
          <Link to="/" className="auth-secondary-link">Back to Home</Link>
          <span className="divider">|</span>
          <Link to="/admissions" className="auth-secondary-link">Apply for Admission</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
