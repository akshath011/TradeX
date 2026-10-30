import React from "react";
import { Link, NavLink } from "react-router-dom";

// "nav-active" is styled orange in index.css
const navClass = ({ isActive }) => "nav-link" + (isActive ? " nav-active" : "");

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="media/tradexx.png"
            style={{ width: "150px", height: "auto" }}
            alt="Logo"
          />
        </Link>

        <button
          className="navbar-toggler d-lg-block order-lg-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse flex-grow-1 order-lg-2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-row flex-wrap justify-content-center">
            <li className="nav-item">
              <a
                className="nav-link"
                href={process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001"}
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <NavLink className={navClass} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navClass} to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navClass} to="/pricing">
                Pricing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navClass} to="/support">
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;