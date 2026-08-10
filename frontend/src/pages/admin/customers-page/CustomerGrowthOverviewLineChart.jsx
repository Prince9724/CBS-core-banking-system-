import "./customergrowthLinechart.css";
import { Line } from "react-chartjs-2"; //this is for Line Chart
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

export default function CustomerGrowthOverview() {
  const data = {
    labels: [
      "Jan",
      "feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Customers",
        data: [
          6000, 8000, 11000, 14000, 17000, 21000, 25000, 26000, 28000, 30000,
          32000, 35000,
        ],
        orderColor: "#296cd8",
        backgroundColor: "rgba(59,130,246,.15)",
        borderColor: "#296cd8",
        borderWidth: 3,
        fill: true,
        tension: 0.45,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointBackgroundColor: "#0d5ddd",
      },
    ],
  };
  // Step 5: Options
  // Options tell Chart.js how to display the chart.
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#adb5bd",
        },
      },

      tooltip: {
        backgroundColor: "#2b3035",
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#adb5bd",
        },

        grid: {
          color: "#2e343a",
        },
      },

      y: {
        ticks: {
          color: "#adb5bd",
        },

        grid: {
          color: "#2e343a",
        },
      },
    },
  };
  return (
    <div className="line-chart-card">
      <div className="chart-header">
        <p className="fs-5">Customer Growth Overview</p>

        <select className="form-select">
          <option>This Year</option>
        </select>
      </div>

      <div className="line-chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
