import React, { useState } from "react";
import axios from "axios";
import "./abra.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: form.email,
        password: form.password,
        role: form.role, // 👈 include role if backend accepts it
      });

      setSuccess(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-main">
      <div className="login-box-wrapper">
        <div className="login-left">
          <div className="login-left-content">
            <h2>Welcome!</h2>
            <p>Please sign in to continue.</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-card">
            <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="login-input"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login-input"
                value={form.password}
                onChange={handleChange}
                required
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="login-input"
                required
              >
                <option value="">Select Role</option>
                <option value="front-desk">Front Desk Employee</option>
                <option value="back-desk">Back Desk Employee</option>
                <option value="doctor">Doctor</option>
              </select>

              {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
              {success && <div style={{ color: "green", marginBottom: 10 }}>{success}</div>}
              <button className="login-submit-btn" type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
