import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const cleanEmail = email.toLowerCase().trim();
        const user = users.find((u) => u.email === cleanEmail);
        if (!user) {
            setError("Email not found");
            return;
        }
        const token = Math.random().toString(36).substring(2);
        const resetData = {
            email: cleanEmail,
            token,
            expires: Date.now() + 5 * 60 * 1000,
        };
        localStorage.setItem("resetToken", JSON.stringify(resetData));
        navigate(`/reset/${token}`);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Forgot Password</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="auth-btn">
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}
