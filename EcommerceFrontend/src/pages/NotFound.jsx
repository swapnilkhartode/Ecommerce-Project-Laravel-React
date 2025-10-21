import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/notfound.css";
import NotFoundImg from "../assets/images/notfound_page.png";

const NotFound = () => {
  return (
    <div className="notfound-wrapper bg-light-">
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      <div className="notfound-content fade-in">
        <div className="error-animation mb-4">
          <span className="digit">4</span>
          <span className="digit zero">0</span>
          <span className="digit">4</span>
        </div>
        <h1 className="error-title mb-2 fw-bold text-gradient display-4">
          Oops! Page Not Found
        </h1>
        <p className="error-description mb-4 fs-5 text-secondary">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="mb-5">
          <Link 
            to="/" 
            className="btn btn-primary btn-lg rounded-pill shadow d-flex justify-content-center align-items-center px-4"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
          >
            <i className="bi bi-house-door-fill me-2 fs-4"></i> Back to Home
          </Link>
        </div>


        {/* <div className="error-image-wrapper mt-5">
          <img src={NotFoundImg} alt="404 cartoon" className="img-fluid bounce hover-zoom" />
        </div> */}
      </div>
    </div>
  );
};

export default NotFound;
