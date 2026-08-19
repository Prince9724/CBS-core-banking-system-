import React from "react";
import { Link } from "react-router-dom";
import {
  BsBank,
  BsPersonFill,
  BsPeopleFill,
  BsCreditCard2Front,
  BsFileEarmarkTextFill,
  BsShieldCheck,
} from "react-icons/bs";

export default function QuickActions() {
  const actions = [
    { title: "Add Branch", icon: <BsBank />, color: "#3B82F6", link: "/admin/branches" },
    { title: "Add User", icon: <BsPersonFill />, color: "#22C55E", link: "/admin/users-roles" },
    { title: "Add Customer", icon: <BsPeopleFill />, color: "#9333EA", link: "/admin/customers" },
    { title: "Open Account", icon: <BsCreditCard2Front />, color: "#F59E0B", link: "/admin/accounts" },
    { title: "Reports", icon: <BsFileEarmarkTextFill />, color: "#EF4444", link: "/admin/reports" },
    { title: "Transactions", icon: <BsShieldCheck />, color: "#3B82F6", link: "/admin/transaction" },
  ];

  return (
    <div className="card bg-dark border-secondary h-100">
      <div className="card-body">
        <h5 className="fw-bold mb-3 text-white">
          <i className="bi bi-lightning me-2 text-warning"></i>
          Quick Actions
        </h5>

        <div className="row g-2">
          {actions.map((item, index) => (
            <div className="col-6" key={index}>
              <Link to={item.link} className="text-decoration-none d-block">
                <div className="card bg-dark border-secondary hover-card h-100">
                  <div className="card-body text-center py-3">
                    <div style={{ color: item.color }} className="fs-3">
                      {item.icon}
                    </div>
                    <span className="text-white small d-block mt-1">
                      {item.title}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <style>{`
          .hover-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .hover-card:hover {
            border-color: #0d6efd !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(13, 110, 253, 0.1);
          }
        `}</style>
      </div>
    </div>
  );
}