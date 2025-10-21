import React, { useState, useRef } from "react";
import { Card } from "react-bootstrap";
import API from "../api/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const successRef = useRef(""); // useRef for success message
  const [loading, setLoading] = useState(false); // track API call

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    successRef.current = ""; // clear previous success
    setLoading(true); // disable button

    // Frontend validation
    if (!email) {
      setErrors({ email: "Email is required" });
      setLoading(false);
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Invalid email format" });
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/forgot-password", { email });
      successRef.current = response.data.message;
      setEmail("");
      setErrors({});
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrors({ email: error.response.data.message || "Something went wrong" });
      } else {
        setErrors({ email: "Server error. Please try again later." });
      }
    } finally {
      setLoading(false); // re-enable button after response
    }

    // Optional: reset the form
    e.target.reset();
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
      <Card
        className="p-4 shadow border-0 w-100"
        style={{ maxWidth: "500px", borderRadius: "12px" }}
      >
        <h2 className="mb-3 text-center fw-bold text-dark">Forgot Password</h2>
        <p className="text-center text-muted mb-4">
          Enter your email address to reset your password
        </p>

        <form onSubmit={handleSubmit}>
          {/* Success Message */}
          {successRef.current && (
            <div className="alert alert-success text-center">
              {successRef.current}
            </div>
          )}

          {/* Email Input */}
          <div className="form-floating mb-3">
            <input
              type="text"
              id="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-2">
            <button
              type="submit"
              className="btn btn-dark btn-lg"
              disabled={loading} // disable button while loading
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          <p className="text-center mt-3 text-muted">
            Remembered your password?{" "}
            <a href="/login" className="fw-semibold text-dark">
              Login here
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default ForgotPassword;
