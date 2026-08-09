import React from "react";
import "./depositbranches.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { Line } from "react-chartjs-2";

export default function DepositChart() {
  const options = {
    interaction: {
      mode: "index",
      intersect: false,
    },
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Deposit Overview",
        font: {
          size: 20,
          weight: "bold",
        },
      },

      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "#212529",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: false,

        grid: {
          color: "",
        },
      },
    },

    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

    datasets: [
      {
        label: "Deposits",
        data: [12000, 18000, 15000, 21000, 24000, 22000, 28000],

        borderColor: "#0d6efd",
        borderWidth: 4,

        pointRadius: 5,
        pointHoverRadius: 10,

        pointBackgroundColor: "#0d6efd",
        pointHoverBackgroundColor: "#fff",

        pointBorderWidth: 3,
        pointHoverBorderWidth: 4,

        fill: true,

        tension: 0.5,

        cubicInterpolationMode: "monotone",
      },
    ],
  };
  return (
    <div className="chart-card shadow-sm p-4 mt-5" style={{ height: "450px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Left Side */}
        <div>
          <h4 className="fw-bold mb-0">
            Deposit Overview
            <span className="text-secondary fs-6 ms-2">(All Branches)</span>
          </h4>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-2">
          <select className="form-select border border-secondary" style={{ width: "180px" }}>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
            <option>Custom Date</option>
          </select>

          {/* Hidden for now (just UI) */}
          {/* <input
            type="date"
            
            className="form-control "
            style={{ width: "160px" }}
          />

          <span className="fw-semibold">to</span>

          <input
            type="date"
            className="form-control visually-hidden"
            style={{ width: "160px" }}
          /> */}
        </div>
      </div>
      <Line data={data} />
    </div>
  );
}
