import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BranchChart({ branchData = [] }) {
  // ✅ Colors for branches
  const colors = [
    "#3B82F6", // Blue
    "#22C55E", // Green
    "#F59E0B", // Yellow
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#14B8A6", // Teal
    "#F97316", // Orange
  ];

  // ✅ Prepare data from props
  const labels = branchData.map((branch) => branch.name);
  const dataValues = branchData.map((branch) => branch.balance || 0);
  const backgroundColors = colors.slice(0, branchData.length);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#d1d5db",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            let value = context.parsed || 0;
            let total = context.dataset.data.reduce((a, b) => a + b, 0);
            let percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  // ✅ Empty state
  if (branchData.length === 0) {
    return (
      <div className="card bg-dark border-secondary h-100">
        <div className="card-body text-center py-5">
          <i className="bi bi-pie-chart fs-1 text-secondary d-block mb-3"></i>
          <h5 className="text-secondary">No branch data available</h5>
          <p className="text-secondary small">Add branches to see deposit distribution</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white fw-bold mb-0">
          <i className="bi bi-pie-chart me-2 text-primary"></i>
          Branch-wise Deposit
        </h5>
        <span className="badge bg-secondary">
          {branchData.length} Branches
        </span>
      </div>

      <div style={{ height: "300px" }}>
        <Doughnut data={data} options={options} />
      </div>

      {/* ✅ Branch Summary */}
      <div className="row g-2 mt-3">
        {branchData.slice(0, 4).map((branch, index) => (
          <div className="col-6" key={index}>
            <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-50 rounded-2 p-2 border border-secondary">
              <span
                className="rounded-circle d-inline-block"
                style={{
                  width: "10px",
                  height: "10px",
                  background: colors[index % colors.length],
                }}
              ></span>
              <div className="flex-grow-1">
                <small className="text-white d-block lh-1">{branch.name}</small>
                <small className="text-secondary">
                  ₹{branch.balance?.toLocaleString() || 0}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}