import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DepositChart({ stats = {} }) {
  const { branchWiseData = [] } = stats;

  const colors = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

  const labels = branchWiseData.map((branch) => branch.name);
  const depositData = branchWiseData.map((branch) => branch.balance || 0);
  const customerData = branchWiseData.map((branch) => branch.customers || 0);
  const transactionData = branchWiseData.map((branch) => branch.transactions || 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Balance (₹)",
        data: depositData,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "#3B82F6",
        borderWidth: 2,
        borderRadius: 6,
      },
      {
        label: "Customers",
        data: customerData,
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "#22C55E",
        borderWidth: 2,
        borderRadius: 6,
      },
      {
        label: "Transactions",
        data: transactionData,
        backgroundColor: "rgba(245, 158, 11, 0.8)",
        borderColor: "#F59E0B",
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#d1d5db",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 16,
          font: { size: 12 },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#9ca3af" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#9ca3af" },
        beginAtZero: true,
      },
    },
  };

  if (branchWiseData.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-bar-chart fs-1 text-secondary d-block mb-3"></i>
        <h5 className="text-secondary">No data available</h5>
      </div>
    );
  }

  return (
    <div>
      <h5 className="text-white fw-bold mb-3">
        <i className="bi bi-bar-chart me-2 text-primary"></i>
        Branch Performance
      </h5>
      <div style={{ height: "280px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}