import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Navbar } from "react-bootstrap";
import "../../assets/styles/header.css";
import CartIcon from "../cart/CartIcon";
import { AuthContext } from "../../context/AuthContext";
import Navlink from "./Navlink";

function Header() {
  const { user, logout } = useContext(AuthContext);

  // ✅ Safely build display name
  const displayName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "";

  return (
    <header className="header shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="navbar-brand logo fw-bold">
            LOGO
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Search bar */}
            <div className="d-flex flex-grow-1 justify-content-center my-2 my-lg-0">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input form-control"
                  placeholder="Search"
                />
                <i className="bi bi-search search-icon"></i>
              </div>
            </div>

            {/* Right section */}
            <div className="d-flex align-items-center ms-lg-auto mt-2 mt-lg-0">
              <CartIcon />
              <a href="#" className="btn btn-dark me-2">
                EN
              </a>

              {/* If NOT logged in → show Login + Register */}
              {!user ? (
                <>
                  <Link to="/login" className="btn btn-dark me-2">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-dark me-2">
                    Register
                  </Link>
                </>
              ) : (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="dark" id="accountMenu">
                    👋 Welcome, {displayName || user.email}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="py-2" style={{ zIndex: 2000 }}>
                    {/* Account Section */}
                    <Dropdown.Item as={Link} to="/editprofile">
                      <i className="bi bi-person-circle me-2"></i> Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/addresses">
                      <i className="bi bi-geo-alt me-2"></i> Shipping Addresses
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/payment-methods">
                      <i className="bi bi-credit-card me-2"></i> Payment Methods
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    {/* Shopping Section */}
                    <Dropdown.Item as={Link} to="/orders">
                      <i className="bi bi-bag-check me-2"></i> My Orders
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/wishlist">
                      <i className="bi bi-heart me-2"></i> Wishlist
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/cart">
                      <i className="bi bi-cart3 me-2"></i> My Cart
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/returns">
                      <i className="bi bi-arrow-counterclockwise me-2"></i>{" "}
                      Returns & Refunds
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    
                    <Dropdown.Item as={Link} to="/track-order">
                      <i className="bi bi-truck me-2"></i> Track Order
                    </Dropdown.Item>
                    {/* Support Section */}
                    <Dropdown.Item as={Link} to="/support">
                      <i className="bi bi-headset me-2"></i> Help Center
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    {/*Banner Management */}
                    <Dropdown.Item as={Link} to="/banners">
                      <i className="bi bi-image me-2"></i> Manage Banners
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    {/* Logout */}
                    <Dropdown.Item onClick={logout} className="text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
          
        </div>
        
      </nav>
      <Navlink/>
    </header>
  );
}

export default Header;
