import React, { useState } from "react";
import "../../assets/styles/footer.css";
import API from "../../api/api";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // new loading state

  const handleSubscribe = async () => {
    setMessage("");
    setError("");

    
    if (!email) {
      setError("Email is required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true); // start loader
      const res = await API.post("/subscribe-newsletter", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      if (err.response && err.response.data.errors?.email) {
        setError(err.response.data.errors.email[0]);
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container d-flex justify-content-between">
        <div>
          <h4 className="mb-3">LOGO</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5>Newsletter</h5>
          <div className="d-flex">
            <input
              type="email"
              placeholder="Email"
              className="form-control me-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} 
            />
            <button
              className="btn btn-danger"
              onClick={handleSubscribe}
              disabled={loading} 
            >
              {loading ? "Subscribing..." : "Subscribe"} 
            </button>
          </div>
          {(message || error) && (
            <div
              className="d-flex justify-content-between align-items-center mt-2 px-3 py-1 rounded text-white"
              style={{ backgroundColor: message ? "#28a745" : "#dc3545", fontSize: "0.9rem" }}
            >
              <span>{message || error}</span>
              <button
                onClick={() => {
                  message ? setMessage("") : setError("");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
          )}

          <div className="mt-3">
            <i className="bi bi-facebook me-3"></i>
            <i className="bi bi-twitter me-3"></i>
            <i className="bi bi-instagram me-3"></i>
            <i className="bi bi-google"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
