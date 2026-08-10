import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./customerAnalyticsCharts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const valueLabelPlugin = {
  id: "valueLabel",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 12px Inter";

    chart.getDatasetMeta(0).data.forEach((bar, index) => {
      const value = chart.data.datasets[0].data[index];
      ctx.textAlign = "center";
      ctx.fillText(
        value.toLocaleString(),
        bar.x,
        bar.y - 10
      );
    });

    ctx.restore();
  },
};

export default function CustomerStatusBarChart() {
  const data = {
    labels: [
      "Verified KYC",
      "Pending KYC",
      "Blocked",
      "Dormant",
    ],
    datasets: [
      {
        data: [18420, 1235, 845, 1345],
        backgroundColor: [
          "#3B82F6",
          "#F59E0B",
          "#EF4444",
          "#9333EA",
        ],
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 70,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#2b3035",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#d1d5db",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#9ca3af",
          callback: (value) =>
            value >= 1000 ? `${value / 1000}K` : value,
        },
        grid: {
          color: "rgba(255,255,255,0.06)",
        },
      },
    },
  };

  return (
    <div className="analytics-card">
      <h5 className="analytics-title">
        Customer Status Overview
      </h5>

      <div className="analytics-chart">
        <Bar
          data={data}
          options={options}
          plugins={[valueLabelPlugin]}
        />
      </div>
    </div>
  );
}