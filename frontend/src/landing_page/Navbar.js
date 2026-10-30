import React from "react";
import { Link } from "react-router-dom";  

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
  className="nav-link active"
  href={process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001"}>
  Dashboard
</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/products">
                Products  
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;