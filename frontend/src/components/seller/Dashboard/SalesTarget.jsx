import {
  FaBullseye,
  FaRupeeSign,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";

const targets = [
  {
    title: "Revenue Target",
    current: 850000,
    target: 1000000,
    icon: <FaRupeeSign />,
    color: "bg-green-500",
  },
  {
    title: "Orders Target",
    current: 850,
    target: 1000,
    icon: <FaShoppingBag />,
    color: "bg-blue-500",
  },
  {
    title: "Customers Target",
    current: 720,
    target: 1000,
    icon: <FaUsers />,
    color: "bg-purple-500",
  },
];

export default function SalesTarget() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <FaBullseye className="text-blue-600 text-xl" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Monthly Targets</h2>

          <p className="text-sm text-gray-500">July Performance</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {targets.map((item) => {
          const percentage = Math.round((item.current / item.target) * 100);

          return (
            <div key={item.title}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{item.title}</span>

                <span className="font-bold">{percentage}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Current :{item.current.toLocaleString()}</span>

                <span>Target :{item.target.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t p-5">
        <div className="flex justify-between">
          <span className="font-medium">Overall Achievement</span>

          <span className="font-bold text-green-600">85%</span>
        </div>
      </div>
    </div>
  );
}
