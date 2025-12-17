import "./Auth.css";
import logo from "../assets/image.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = email, 2 = otp
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/forgot-password", {
        email: email.trim(),
      });

      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.trim().length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/verify-otp", {
        email: email.trim(),
        otp: otp.trim(),
      });

      alert("OTP verified. You can now login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="College Logo" className="auth-logo" />

        {step === 1 && (
          <>
            <h2>Reset Password</h2>

            <input
              type="email"
              placeholder="Enter your email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="auth-error">{error}</p>}

            <button
              className="auth-btn"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <p className="auth-link">
              Back to{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Enter OTP</h2>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="auth-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />

            {error && <p className="auth-error">{error}</p>}

            <button
              className="auth-btn"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
