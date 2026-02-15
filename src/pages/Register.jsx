import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const res = register(email, password);
    if (!res.success) {
      setError(res.message);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" required onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" required onChange={(e) => setPassword(e.target.value)} />
          <label>Confirm Password:</label>
          <input type="password" required onChange={(e) => setConfirm(e.target.value)} />
          <button type="submit">Create Account</button>
        </form>
        <p> Already have account? <Link to="/">Login</Link> </p>
      </div>
    </div>
  );
}
