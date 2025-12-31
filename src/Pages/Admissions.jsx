import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css"; // Reuse Auth styles + Custom

export default function Admissions() {
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        marks: "",
        cutoff: "",
    });

    const [status, setStatus] = useState({ type: "", message: "" });

    useEffect(() => {
        api.get("/api/departments") // Fetch departments
            .then(res => setDepartments(res.data))
            .catch(err => console.error("Failed to fetch departments", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });

        // Basic validation
        if (Object.values(form).some(val => val === "")) {
            setStatus({ type: "error", message: "Please fill all fields" });
            return;
        }

        try {
            await api.post("/api/applications", form);
            setStatus({ type: "success", message: "Application submitted successfully! Check your email." });
            setForm({ name: "", email: "", phone: "", department: "", marks: "", cutoff: "" });

            // Optional: Redirect after delay
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setStatus({ type: "error", message: err.response?.data?.message || "Submission failed" });
        }
    };

    return (
        <div className="auth-page static-bg">

            {/* Wider card for Admission form */}
            <div className="auth-card" style={{ maxWidth: "600px" }}>
                <h2 className="auth-title">Admissions Open</h2>
                <p className="auth-subtitle">Join us to shape your future. Apply now!</p>

                {status.message && (
                    <div className={`auth-error ${status.type === 'success' ? 'text-green-400' : ''}`}
                        style={{ color: status.type === 'success' ? '#4ade80' : '#fda4af', marginBottom: '15px' }}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="admission-form">
                    <div className="auth-field-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="auth-field">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="auth-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="auth-field-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="auth-field">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="9876543210"
                            />
                        </div>
                        <div className="auth-field">
                            <label>Department</label>
                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                className="auth-input" // Inherits style from Auth.css (global select style)
                            >
                                <option value="">Select Option</option>
                                {departments.map(d => (
                                    <option key={d._id} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="auth-field-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="auth-field">
                            <label>Marks Scored</label>
                            <input
                                type="text"
                                name="marks"
                                value={form.marks}
                                onChange={handleChange}
                                placeholder="e.g. 450/500"
                            />
                        </div>
                        <div className="auth-field">
                            <label>Cutoff Mark</label>
                            <input
                                type="number"
                                name="cutoff"
                                value={form.cutoff}
                                onChange={handleChange}
                                placeholder="e.g. 185"
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" style={{ marginTop: '20px' }}>
                        Submit Application
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/" className="auth-secondary-link">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
