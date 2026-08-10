import { Line } from "react-chartjs-2"; //this is for Line Chart
import "./customerDoughnutchart.css";
import { Doughnut } from "react-chartjs-2"; //this is for cirlcle chart like doughnut
// step -3 now i have to register what kind of i am chart using.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement, //this is for doughnut chart
} from "chart.js";
//now we have register now.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement, //now i register to i want to use this
);

export default function CustomerByBranchChart() {
  const doughnutData = {
    labels: [
      "Surat Branch",
      "Delhi Branch",
      "Mumbai Branch",
      "Pune Branch",
      "Ahmedabad Branch",
    ],

    datasets: [
      {
        data: [6350, 5240, 4100, 3800, 6355],

        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#F59E0B",
          "#9333EA",
          "#06B6D4",
        ],

        borderWidth: 0,

        hoverOffset: 12,
      },
    ],
  };
  const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "68%",
  layout: {
    padding: 8,
  },
  plugins: {
    legend: {
      position: "right",
      align: "center",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 10,
        boxHeight: 10,
        padding: 18,
        color: "#d1d5db",
        font: {
          size: 13,
          weight: "500",
        },
      },
    },
    tooltip: {
      backgroundColor: "#2b3035",
    },
  },
};
  return (
    <>
      <div className="doughnut-card">
        <p className="chart-title fs-5">Customers by Branch</p>

        <div className="doughnut-box">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </>
  );
}
