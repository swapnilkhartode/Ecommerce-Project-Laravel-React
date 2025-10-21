import React, { useState, useEffect, useRef ,useContext} from "react";
import { Card } from "react-bootstrap";
import API from "../api/api.jsx";
import { AuthContext } from "../context/AuthContext"; // import context

function EditProfile() {

  const { user, login } = useContext(AuthContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const successRef = useRef(null);

  // Fetch user data on component load
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await API.get("/user");
      const user = response.data.user;
      
      setForm({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email))
        newErrors.email = "Invalid email address";
    }

    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";

    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await API.post("/updateprofile", form); // send JSON directly
      const updatedUser = response.data.user; // assuming your API returns the updated user
    const token = localStorage.getItem("token"); // keep the same token
    login(updatedUser, token);

    if (successRef.current) {
      successRef.current.style.display = "block";
      successRef.current.innerText = response.data.message;
    }

    setErrors({});
  } catch (error) {
    alert(error);
    if (error.response?.status === 422) {
      const backendErrors = error.response.data.errors;
      const formattedErrors = {};
      for (const key in backendErrors) {
        if (backendErrors.hasOwnProperty(key)) {
          formattedErrors[key] = backendErrors[key][0];
        }
      }
      setErrors(formattedErrors);
    } else {
      console.error("Update profile error:", error);
    }
  }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{
        minHeight: "90vh",
        background: "linear-gradient(to right, #eef2f3, #d9e4ec)",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <Card
        className="p-4 shadow border-0 w-100"
        style={{ maxWidth: "500px", borderRadius: "12px" }}
      >
        <h2 className="mb-3 text-center fw-bold text-dark">Edit Profile</h2>

        {/* Success message */}
        <div
          ref={successRef}
          style={{ display: "none" }}
          className="alert alert-success text-center"
        ></div>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            <label htmlFor="firstName">First Name</label>
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="text"
              id="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="form-floating mb-3">
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
            />
            <label htmlFor="mobile">Mobile Number</label>
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile}</div>
            )}
          </div>

          {/* Submit */}
          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-dark btn-lg">
              Update Profile
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EditProfile;
