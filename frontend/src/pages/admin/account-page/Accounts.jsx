import React from "react";
import {
  BsWallet2,
  BsBank,
  BsCreditCard2Front,
  BsFileEarmarkText
} from "react-icons/bs";
import "./accounts.css";
import CustomerTable from "../customers-page/CustomerTable";

export default function AdminAccounts() {
  const stats = [
    {
      title: "Total Accounts",
      value: "25,846",
      growth: "+8.5% from last month",
      icon: <BsWallet2 />,
      bg: "#1D4ED8",
      color: "#3B82F6"
    },
    {
      title: "Savings Accounts",
      value: "14,250",
      growth: "+12.3% from last month",
      icon: <BsBank />,
      bg: "#166534",
      color: "#22C55E"
    },
    {
      title: "Current Accounts",
      value: "8,540",
      growth: "+6.7% from last month",
      icon: <BsCreditCard2Front />,
      bg: "#B45309",
      color: "#F59E0B"
    },
    {
      title: "Loan Accounts",
      value: "3,056",
      growth: "+4.2% from last month",
      icon: <BsFileEarmarkText />,
      bg: "#6D28D9",
      color: "#8B5CF6"
    }
  ];

  return (
    <div className="accounts-page">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h2 className="accounts-title">Accounts</h2>
          <p className="accounts-breadcrumb">
            Dashboard <span>›</span> Accounts
          </p>
        </div>

        {/* <button className="btn create-account-btn">
          Export in excel
        </button> */}
      </div>

      <div className="row g-4">
        {stats.map((item, index) => (
          <div className="col-xl-3 col-lg-6 col-md-6 col-12" key={index}>
            <div className="account-stat-card">
              <div
                className="account-icon"
                style={{
                  background: `${item.color}20`,
                  color: item.color
                }}
              >
                {item.icon}
              </div>

              <div className="account-content">
                <p className="account-label">{item.title}</p>
                <h3 className="account-value">{item.value}</h3>

                <div className="account-growth">
                  <span className="growth-up">▲</span>
                  <span>{item.growth}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <CustomerTable/>
      </div>
    </div>
  );
}