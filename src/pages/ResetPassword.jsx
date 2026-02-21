import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [currentTime] = useState(() => Date.now());
    const saved = JSON.parse(localStorage.getItem("resetToken"));
    let error = "";
    let valid = false;
    if (!saved) {
        error = "Invalid reset link";
    } else if (saved.token !== token) {
        error = "Invalid token";
    } else if (currentTime > saved.expires) {
        error = "Reset link expired";
    } else {
        valid = true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) => u.email === saved.email ? { ...u, password } : u);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("resetToken");
        alert("Password updated successfully!");
        navigate("/");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Password</h2>
                {error && <div className="error">{error}</div>}
                {valid && (
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="auth-btn">
                            Update Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
