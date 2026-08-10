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
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "center",
      labels: {
        color: "#9ca3af",
        boxWidth: 24,
      },
    },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.06)" },
      ticks: { color: "#9ca3af" },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.06)" },
      ticks: { color: "#9ca3af" },
    },
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
  <div className="chart-card">
    <div className="chart-header">
      <p className="chart-title fs-5">
        Deposit Overview <span>(All Branches)</span>
      </p>

      <select className="form-select chart-filter">
        <option>This Month</option>
        <option>Last Month</option>
        <option>Last 3 Months</option>
        <option>Last 6 Months</option>
      </select>
    </div>

    <div className="chart-body">
      <Line data={data} options={options} />
    </div>
  </div>
);
}
