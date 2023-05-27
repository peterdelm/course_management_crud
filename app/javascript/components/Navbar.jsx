import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            Offcanvas
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <Link to="/" className="btn btn-lg custom-button" role="button">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/students"
                className="btn btn-lg custom-button"
                role="button"
              >
                List All Students
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/add_students"
                className="btn btn-lg custom-button"
                role="button"
              >
                Add New Students
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/courses"
                className="btn btn-lg custom-button"
                role="button"
              >
                List All Courses
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/add_courses"
                className="btn btn-lg custom-button"
                role="button"
              >
                Add New Courses
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/add_results"
                className="btn btn-lg custom-button"
                role="button"
              >
                Add Results
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/results"
                className="btn btn-lg custom-button"
                role="button"
              >
                List All Results
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
