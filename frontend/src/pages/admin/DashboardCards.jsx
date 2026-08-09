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
      color: "#1253BE",
    },
    {
      title: "Total Customers",
      value: "20,142",
      subtitle: "+120 this week",
      icon: "bi-people-fill",
      bg: "#CFF2D3",
      color: "#22C55E",
    },
    {
      title: "Total Accounts",
      value: "22,589",
      subtitle: "+150 this week",
      icon: "bi-wallet2",
      bg: "#E6DBFB",
      color: "#7C3AED",
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
      icon: "bi-arrow-right",
      bg: "#DDE9FE",
      color: "#2563EB",
      growth: "↑ 12.5%",
      growthColor: "text-success",
    },
    {
      title: "Today's Deposits",
      value: "₹6.25 Cr",
      subtitle: "Total 356 Deposits",
      icon: "bi-arrow-down",
      bg: "#E0F4E1",
      color: "#22C55E",
      growth: "↑ 8.4%",
      growthColor: "text-success",
    },
    {
      title: "Today's Withdrawals",
      value: "₹4.00 Cr",
      subtitle: "Total 492 Withdrawals",
      icon: "bi-arrow-up",
      bg: "#f7d5cf",
      color: "#EF4444",
      growth: "↓ 3.2%",
      growthColor: "text-danger",
    },
  ];

  return (
    <div className="abcd">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={
              index < 4
                ? "col-xl-3 col-lg-6 col-md-6 col-12"
                : "col-xl-4 col-lg-6 col-12"
            }
          >
            <div className="dashboard-card border border-end-1 border-top-0 border-bottom-0 border-start-0 border-secondary shadow-sm h-100">
              <div className="card-body d-flex align-items-center">
                <div
                  className="icon-box me-3"
                  style={{
                    background: card.bg,
                    color: card.color,
                  }}
                >
                  <i
                    style={{ background: "transparent", color: card.color }}
                    className={`bi ${card.icon}`}
                  ></i>
                </div>

                <div className="flex-grow-1">
                  <small className="text-secondary fw-semibold">
                    {card.title}
                  </small>

                  <div className="d-flex align-items-center mt-1">
                    <h2 className="fw-bold mb-0">{card.value}</h2>

                    {card.growth && (
                      <span className={`ms-3 fw-semibold ${card.growthColor}`}>
                        {card.growth}
                      </span>
                    )}
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <small className="text-secondary">{card.subtitle}</small>

                    {card.right && (
                      <small className="text-secondary fw-semibold me-5">
                        {card.right}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
