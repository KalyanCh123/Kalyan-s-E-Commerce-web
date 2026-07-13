import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:gmail|yahoo|outlook|hotmail|icloud|protonmail)\.(com|in|co\.in)$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!trimmedPassword) {
      setError("Password is required");
      return;
    }
    const res = login(trimmedEmail, trimmedPassword);

    if (!res.success) {
      setError("Incorrect email or password. Please try again.");
      return;
    }
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🛍️</div>
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue shopping</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email-login"
              autoComplete="off"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
            />
          </div>
          <div className="input-group password-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password-login"
              autoComplete="new-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="forgot-row">
            <Link to="/forgot">Forgot Password?</Link>
          </div>
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <p className="switch-text">
          New here? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
