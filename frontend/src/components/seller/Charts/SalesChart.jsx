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

export default function SalesChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

    datasets: [
      {
        label: "Sales",

        data: [12, 19, 8, 17, 26, 32, 28],

        fill: true,

        borderColor: "#2563eb",

        backgroundColor: "rgba(37,99,235,.15)",

        tension: 0.4,

        pointRadius: 5,

        pointHoverRadius: 7,
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
      <div className="flex justify-between mb-5">
        <h2 className="text-xl font-semibold">Weekly Sales</h2>

        <select className="border rounded-lg px-3 py-2">
          <option>Weekly</option>

          <option>Monthly</option>

          <option>Yearly</option>
        </select>
      </div>

      <Line data={data} options={options} />
    </div>
  );
}
