import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./abra.css";

export default function Signin({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Make API call to authenticate user
      const response = await axios.post("https://hopsital-management-system-backend.onrender.com/api/login", {
        email: form.email,
        password: form.password,
        role: form.role, // Ensure the backend accepts and validates this
      });

      // On successful login, save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Call the onLogin function passed as prop to update the login state
      onLogin(response.data.user);

      // Redirect to the dashboard (role-based)
      setTimeout(() => {
        if (response.data.user.role === "front-desk") {
          navigate("/dashboard"); // Redirect to the front-desk dashboard
        } else if (response.data.user.role === "back-desk") {
          navigate("/dashboard"); // Redirect to the back-desk dashboard
        } else if (response.data.user.role === "doctor") {
          navigate("/dashboard"); // Redirect to the doctor dashboard
        } else {
          // Fallback if role is unrecognized
          setError("Unrecognized role.");
        }
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
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
