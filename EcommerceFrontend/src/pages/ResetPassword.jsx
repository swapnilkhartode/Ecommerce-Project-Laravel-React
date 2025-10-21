import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // field-level errors
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract token and email from query params
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const email = query.get("email");

  useEffect(() => {
    if (!token || !email) {
      setErrors({ api: "Invalid or expired reset link." });
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    // Field-level validation
    const newErrors = {};
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (password && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // disable button while submitting

    try {
      const response = await API.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: confirmPassword,
      });

      setMessage(response.data.message);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 3000); // redirect after 3s
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data?.message) {
        setErrors({ api: err.response.data.message });
      } else {
        setErrors({ api: "Server error. Please try again later." });
      }
    } finally {
      setLoading(false); // re-enable button
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{
        minHeight: "60vh",
        background: "linear-gradient(to right, #eef2f3, #d9e4ec)",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <div
        className="p-4 shadow border-0 w-100"
        style={{ maxWidth: "400px", borderRadius: "12px", background: "#fff" }}
      >
        <h2 className="mb-3 text-center fw-bold text-dark">Reset Password</h2>

        {/* API error */}
        {errors.api && <div className="alert alert-danger text-center">{errors.api}</div>}

        {/* Success message */}
        {message && <div className="alert alert-success text-center">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">New Password</label>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              id="confirmPassword"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>

          <p className="text-center mt-3 text-muted">
            Remembered your password?{" "}
            <a href="/login" className="fw-semibold text-dark">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
