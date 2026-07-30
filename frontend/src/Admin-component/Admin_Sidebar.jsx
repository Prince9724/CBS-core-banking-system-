import { Link } from "react-router";
import { useState } from "react";
import "./admin_Sidebar.css"
export default function Admin_Sidebar() {
  const [isActive, setActive] = useState("");
  return (
    <div>
      <>
        {/* <h1 className="visually">Sidebars examples</h1> */}
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark position-fixed rounded-5 border-secondary border-end"
          style={{ width: 280, height: "100vh" }}
        >
          <Link
            to={"/admin"}
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
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
                className={`nav-link   ${isActive === "dashboard" ? "active" : ""}`}
                aria-current="page"
                onClick={() => setActive("dashboard")}
              >
                <i
                  className={`bi bi-speedometer2 ${isActive === "dashboard" ? "bg-primary" : ""}`}
                />
                <span
                  className={`ms-2 ${isActive === "dashboard" ? "bg-primary" : ""}`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("branches")}
                className={`nav-link  ${isActive === "branches" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-buildings ${isActive === "branches" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "branches" ? "bg-primary" : ""}`}
                >
                  Branches
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("user")}
                className={`nav-link text-white ${isActive === "user" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-people ${isActive === "user" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "user" ? "bg-primary" : ""}`}
                >
                  Users & Roles
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("customer")}
                className={`nav-link text-white ${isActive === "customer" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-person-rolodex ${isActive === "customer" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "customer" ? "bg-primary" : ""}`}
                >
                  Customers
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("account")}
                className={`nav-link text-white ${isActive === "account" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-person-vcard ${isActive === "account" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "account" ? "bg-primary" : ""}`}
                >
                  Accounts
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("transection")}
                className={`nav-link text-white ${isActive === "transection" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-credit-card-2-back ${isActive === "transection" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "transection" ? "bg-primary" : ""}`}
                >
                  Transections
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("report")}
                className={`nav-link text-white ${isActive === "report" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-bar-chart-fill ${isActive === "report" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "report" ? "bg-primary" : ""}`}
                >
                  Reports
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("revenue")}
                className={`nav-link text-white ${isActive === "revenue" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-graph-up-arrow ${isActive === "revenue" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "revenue" ? "bg-primary" : ""}`}
                >
                  Revenue & PL
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("audit")}
                className={`nav-link text-white ${isActive === "audit" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-clipboard2-data-fill ${isActive === "audit" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "audit" ? "bg-primary" : ""}`}
                >
                  Audit Logs
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("setting")}
                className={`nav-link text-white ${isActive === "setting" ? "active" : ""}`}
              >
                <i
                  className={`bi bi-gear ${isActive === "setting" ? "bg-primary" : ""}`}
                ></i>
                <span
                  className={`ms-2 ${isActive === "setting" ? "bg-primary" : ""}`}
                >
                  Settings
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setActive("profile")}
                className={`nav-link text-white ${isActive === "profile" ? "active" : ""}`}
              >
                <i className={`bi bi-person-fill ${isActive === "profile" ? "bg-primary" : ""}`}></i>
                <span className={`ms-2 ${isActive === "profile" ? "bg-primary" : ""}`}>Profile</span>
              </Link>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <Link
              href="#"
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
