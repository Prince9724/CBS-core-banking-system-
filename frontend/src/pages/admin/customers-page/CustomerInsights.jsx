import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./analyticsCards.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "68%",
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: "#E5E7EB",
        usePointStyle: true,
        pointStyle: "circle",
        padding: 18,
        boxWidth: 10,
        boxHeight: 10
      }
    },
    tooltip: {
      backgroundColor: "#2b3035",
      titleColor: "#fff",
      bodyColor: "#fff"
    }
  }
};

const ageData = {
  labels: [
    "18 - 25 Years",
    "26 - 35 Years",
    "36 - 45 Years",
    "46 - 60 Years",
    "60+ Years"
  ],
  datasets: [
    {
      data: [12, 28, 30, 22, 8],
      backgroundColor: [
        "#3B82F6",
        "#22C55E",
        "#F59E0B",
        "#9333EA",
        "#06B6D4"
      ],
      borderWidth: 0
    }
  ]
};

const genderData = {
  labels: ["Male", "Female", "Other"],
  datasets: [
    {
      data: [56, 43, 1],
      backgroundColor: ["#3B82F6", "#22C55E", "#9333EA"],
      borderWidth: 0
    }
  ]
};

export default function CustomerInsights() {
  return (
    <div className="analytics-card">
      <div className="analytics-body">
        <div className="mb-4">
          <h4 className="analytics-title mb-3">Customers by Age Group</h4>
          <div className="chart-wrapper">
            <Doughnut data={ageData} options={commonOptions} />
          </div>
        </div>

        <hr className="analytics-divider" />

        <div className="mt-3">
          <h4 className="analytics-title mb-3">Gender Distribution</h4>
          <div className="chart-wrapper">
            <Doughnut data={genderData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}