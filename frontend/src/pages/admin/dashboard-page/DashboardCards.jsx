import React from "react";

export default function DashboardCards({ stats }) {
  const cards = [
    {
      title: "Total Branches",
      value: stats.totalBranches || 0,
      icon: "bi bi-building",
      color: "#4fc3f7",
      bg: "rgba(79, 195, 247, 0.1)",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers || 0,
      icon: "bi bi-people",
      color: "#66bb6a",
      bg: "rgba(102, 187, 106, 0.1)",
    },
    {
      title: "Total Accounts",
      value: stats.totalAccounts || 0,
      icon: "bi bi-wallet2",
      color: "#ffb74d",
      bg: "rgba(255, 183, 77, 0.1)",
    },
    {
      title: "Total Balance",
      value: `₹${(stats.totalBalance || 0).toLocaleString()}`,
      icon: "bi bi-cash-stack",
      color: "#4fc3f7",
      bg: "rgba(79, 195, 247, 0.1)",
    },
    {
      title: "Today's Deposit",
      value: `₹${(stats.todayDeposit || 0).toLocaleString()}`,
      icon: "bi bi-arrow-down-circle",
      color: "#66bb6a",
      bg: "rgba(102, 187, 106, 0.1)",
    },
    {
      title: "Today's Withdraw",
      value: `₹${(stats.todayWithdraw || 0).toLocaleString()}`,
      icon: "bi bi-arrow-up-circle",
      color: "#ef5350",
      bg: "rgba(239, 83, 80, 0.1)",
    },
    {
      title: "Managers",
      value: stats.totalManagers || 0,
      icon: "bi bi-person-badge",
      color: "#ce93d8",
      bg: "rgba(206, 147, 216, 0.1)",
    },
    {
      title: "Tellers",
      value: stats.totalTellers || 0,
      icon: "bi bi-person-workspace",
      color: "#ffb74d",
      bg: "rgba(255, 183, 77, 0.1)",
    },
  ];

  return (
    <div className="row g-3">
      {cards.map((card, index) => (
        <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-secondary small fw-semibold text-uppercase">
                  {card.title}
                </span>
                <div
                  className="rounded-3 p-2"
                  style={{ background: card.bg, color: card.color }}
                >
                  <i className={card.icon}></i>
                </div>
              </div>
              <h3 className="text-white fw-bold mb-1">{card.value}</h3>
              <span className="text-secondary small">{card.title}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}