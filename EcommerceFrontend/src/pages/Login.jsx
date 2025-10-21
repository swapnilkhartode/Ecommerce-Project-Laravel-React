// src/components/Login.js
import React, { useState, useContext } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import API from "../api/api.jsx"; // your preconfigured axios
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/login.css";
import { AuthContext } from "../context/AuthContext"; // import context

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get login function from context

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // send login request
      const res = await API.post("/login", formData);

      // call context login → saves user, token, expiry
      login(res.data.user, res.data.token);

      // redirect
      navigate("/");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Login failed, please try again"
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Card className="login-card shadow p-4" style={{ width: "450px" }}>
        <h2 className="text-center login-title mb-2 text-dark">Login</h2>

        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              className="custom-input"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              className="custom-input"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100 login-button">
            Login
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link to="/forgot-password" className="forgot-link">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-2">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/register" className="forgot-link">
            Register Here
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
