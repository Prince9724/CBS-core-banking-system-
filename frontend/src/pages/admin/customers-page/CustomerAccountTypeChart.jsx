import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./customerAnalyticsCharts.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CustomerAccountTypeChart() {
  const data = {
    labels: [
      "Savings Account",
      "Current Account",
      "Fixed Deposit",
      "Loan Customers",
    ],
    datasets: [
      {
        data: [16802, 4652, 3100, 1291],
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#F59E0B",
          "#9333EA",
        ],
        borderWidth: 0,
        hoverOffset: 8,
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
            size: 13,
          },
        },
      },
      tooltip: {
        backgroundColor: "#2b3035",
      },
    },
  };

  return (
    <div className="analytics-card">
      <h5 className="analytics-title">
        Customers by Account Type
      </h5>

      <div className="analytics-chart">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}