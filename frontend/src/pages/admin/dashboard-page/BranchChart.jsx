import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./depositbranches.css";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BranchChart() {
  const data = {
    labels: ["Delhi Branch", "Mumbai Branch", "Pune Branch"],

    datasets: [
      {
        data: [250.2, 230.15, 220.1],

        backgroundColor: ["#3B82F6", "#22C55E", "#F59E0B"],

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
  },
};

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h4 className="chart-title fs-5">Branch Wise Deposit</h4>
      </div>

      <div className="chart-body donut-body">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
