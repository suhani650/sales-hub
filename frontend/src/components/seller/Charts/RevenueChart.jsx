import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

export default function RevenueChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
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
        label: "Revenue",

        data: [
          120000, 180000, 240000, 310000, 450000, 520000, 610000, 690000,
          760000, 810000, 870000, 950000,
        ],

        borderColor: "#16a34a",

        backgroundColor: "rgba(22,163,74,.12)",

        fill: true,

        tension: 0.4,

        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-semibold">Revenue Growth</h2>

          <p className="text-sm text-gray-500">Last 12 Months</p>
        </div>

        <h3 className="text-2xl font-bold text-green-600">₹9.5L</h3>
      </div>

      <Line data={data} options={options} />
    </div>
  );
}
