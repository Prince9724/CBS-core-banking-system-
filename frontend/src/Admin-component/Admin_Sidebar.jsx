import { Link } from "react-router-dom";
import { useState } from "react";
import "./admin_Sidebar.css";
export default function Admin_Sidebar() {
  const [isActive, setActive] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false); //for sidebar hide
  return (
    <div>
      <>
        {/* <h1 className="visually">Sidebars examples</h1> */}
        <button
          className="btn btn-primary d-lg-none menu-btn"
          onClick={() => setShowSidebar(true)}
        >
          <i className="bi bi-list fs-4"></i>
        </button>
        <div
          className={`sidebar d-flex flex-column flex-shrink-0 
          p-3 text-bg-dark position-fixed  border-secondary
          border-end ${showSidebar ? "show-sidebar" : ""}`}
          style={{ width: 280, height: "100vh" }}
        >
          <button
            className="btn-close btn-close-white d-lg-none ms-auto mb-3"
            onClick={() => setShowSidebar(false)}
          ></button>
          <Link
            to={"/admin"}
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto
             text-white text-decoration-none"
          >
            <div className="d-flex">
              <i className="bi bi-bank  fs-3" />
              <div className="ms-3">
                <span className="">ABC Co-operative Bank</span>
                <span className="">Admin Dashboard</span>
              </div>
            </div>
          </Link>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                to={"/admin"}
                className={`nav-link text-white ${isActive === "dashboard" ? "active" : ""}`}
                aria-current="page"
                onClick={() => setActive("dashboard")}
              >
                <i className="bi bi-speedometer2" />
                <span className="ms-2">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"branches"}
                onClick={() => setActive("branches")}
                className={`nav-link text-white ${isActive === "branches" ? "active" : ""}`}
              >
                <i className="bi bi-buildings"></i>
                <span className="ms-2">Branches</span>
              </Link>
            </li>
            <li>
              <Link
                to={"users-roles"}
                onClick={() => setActive("user")}
                className={`nav-link text-white ${isActive === "user" ? "active" : ""}`}
              >
                <i className="bi bi-people"></i>
                <span className="ms-2">Users & Roles</span>
              </Link>
            </li>
            <li>
              <Link
              to={"customers"}
                onClick={() => setActive("customer")}
                className={`nav-link text-white ${isActive === "customer" ? "active" : ""}`}
              >
                <i className="bi bi-person-rolodex"></i>
                <span className="ms-2">Customers</span>
              </Link>
            </li>
            <li>
              <Link
              to={"accounts"}
                onClick={() => setActive("account")}
                className={`nav-link text-white ${isActive === "account" ? "active" : ""}`}
              >
                <i className="bi bi-person-vcard"></i>
                <span className="ms-2">Accounts</span>
              </Link>
            </li>
            <li>
              <Link
              to={"transaction"}
                onClick={() => setActive("transection")}
                className={`nav-link text-white ${isActive === "transection" ? "active" : ""}`}
              >
                <i className="bi bi-credit-card-2-back"></i>
                <span className="ms-2">Transections</span>
              </Link>
            </li>
            <li>
              <Link
              to={"reports"}
                onClick={() => setActive("report")}
                className={`nav-link text-white ${isActive === "report" ? "active" : ""}`}
              >
                <i className="bi bi-bar-chart-fill"></i>
                <span className="ms-2">Reports</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("revenue")}
                className={`nav-link text-white ${isActive === "revenue" ? "active" : ""}`}
              >
                <i className="bi bi-graph-up-arrow"></i>
                <span className="ms-2">Revenue & PL</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("audit")}
                className={`nav-link text-white ${isActive === "audit" ? "active" : ""}`}
              >
                <i className="bi bi-clipboard2-data-fill"></i>
                <span className="ms-2">Audit Logs</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("setting")}
                className={`nav-link text-white ${isActive === "setting" ? "active" : ""}`}
              >
                <i className="bi bi-gear"></i>
                <span className="ms-2">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("profile")}
                className={`nav-link text-white ${isActive === "profile" ? "active" : ""}`}
              >
                <i className="bi bi-person-fill"></i>
                <span className="ms-2">Profile</span>
              </Link>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <Link
              to={"/branch"}
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width={32}
                height={32}
                className="rounded-circle me-2"
              />
              <strong>mdo</strong>
            </Link>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li>
                <Link className="dropdown-item">New project...</Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Profile
                </Link>
              </li>
              <li>{/* <hr className="dropdown-divider" />  */}</li>
              <li>
                <Link className="dropdown-item" href="#">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    </div>
  );
}
