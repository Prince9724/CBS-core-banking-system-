import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./depositbranches.css"

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

    cutout: "65%",

    plugins: {
      legend: {
        position: "right",

        labels: {
          usePointStyle: true,

          pointStyle: "circle",

          // padding: 20,

          font: {
            size: 14,
          },
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹${context.raw} Cr`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-card shadow-sm " style={{ height: "450px", paddingTop:"68px"}}>
      <h5 className="">Branch Wise Deposit</h5>
      <Doughnut data={data} options={options} />
    </div>
  );
}
