import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="dashboard-footer mt-5">

      <div className="">

        <div className="row d-flex justify-content-evenly">

          {/* Left */}
          <div className="col-lg-4 col-md-12 text-center text-lg-start">

            <p className="mb-0">
              © 2026 <strong>ABC Co-operative Bank</strong>
            </p>

          </div>

          {/* Center */}
          <div className="col-lg-4 col-md-12 text-center my-3 my-lg-0">

            <span className="footer-link">
              Privacy Policy
            </span>

            <span className="mx-3 text-secondary">|</span>

            <span className="footer-link">
              Terms
            </span>

            <span className="mx-3 text-secondary">|</span>

            <span className="footer-link">
              Support
            </span>

          </div>

          {/* Right */}
          <div className="col-lg-4 col-md-12 text-center text-lg-end">

            <small className="text-secondary">
              Version 1.0.0
            </small>

          </div>

        </div>

      </div>

    </footer>
  );
}