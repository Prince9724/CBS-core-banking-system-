import React from "react";
import "./dashboardcard.css";

export default function DashboardCards() {
  const cards = [
    {
      title: "Total Branches",
      value: "3",
      subtitle: "Active Branches",
      icon: "bi-bank2",
      bg: "#DDE9FE",
      color: "#2563EB",
    },
    {
      title: "Total Customers",
      value: "20,142",
      subtitle: "this week",
      growth: "+120",
      icon: "bi-people-fill",
      bg: "#CFF2D3",
      color: "#22C55E",
      growthType: "up",
    },
    {
      title: "Total Accounts",
      value: "22,589",
      subtitle: "this week",
      growth: "+150",
      icon: "bi-wallet2",
      bg: "#E6DBFB",
      color: "#7C3AED",
      growthType: "up",
    },
    {
      title: "Total Deposits",
      value: "₹700.45 Cr",
      subtitle: "All Branches",
      icon: "bi-currency-rupee",
      bg: "#FDECCD",
      color: "#F59E0B",
    },
    {
      title: "Today's Transactions",
      value: "1,248",
      subtitle: "Total Txn Amount",
      right: "₹10.25 Cr",
      growth: "+12.5%",
      icon: "bi-arrow-right",
      bg: "#DDE9FE",
      color: "#2563EB",
      growthType: "up",
    },
    {
      title: "Today's Deposits",
      value: "₹6.25 Cr",
      subtitle: "Total 356 Deposits",
      growth: "+8.4%",
      icon: "bi-arrow-down",
      bg: "#E0F4E1",
      color: "#22C55E",
      growthType: "up",
    },
    {
      title: "Today's Withdrawals",
      value: "₹4.00 Cr",
      subtitle: "Total 492 Withdrawals",
      growth: "-3.2%",
      icon: "bi-arrow-up",
      bg: "#F7D5CF",
      color: "#EF4444",
      growthType: "down",
    },
  ];

  return (
    <div className="dashboard-details-grid">
      {cards.map((card, index) => (
        <div key={index} className="dashboard-stat-card">
          <div
            className="dashboard-icon"
            style={{ background: card.bg, color: card.color }}
          >
            <i className={`bi ${card.icon}`}></i>
          </div>

          <div className="dashboard-info">
            <p className="dashboard-label">{card.title}</p>

            <div className="dashboard-value-row">
              <h2 className="dashboard-value">{card.value}</h2>

              {card.growth && (
                <span
                  className={
                    card.growthType === "down"
                      ? "growth-down"
                      : "growth-up"
                  }
                >
                  {card.growth}
                </span>
              )}
            </div>

            <div className="dashboard-sub">
              <span className="sub-text">{card.subtitle}</span>
              {card.right && <span className="sub-right">{card.right}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}