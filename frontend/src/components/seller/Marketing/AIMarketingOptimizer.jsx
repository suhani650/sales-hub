import {
  FaRobot,
  FaBrain,
  FaChartLine,
  FaBullseye,
  FaMoneyBillWave,
  FaUsers,
  FaSyncAlt,
  FaGift,
  FaBolt,
  FaArrowUp,
  FaLightbulb,
  FaPlay,
} from "react-icons/fa";

const aiStats = [
  {
    title: "AI Score",
    value: "98%",
    icon: <FaBrain />,
    color: "bg-indigo-500",
    trend: "+8%",
  },
  {
    title: "Predicted Revenue",
    value: "₹18.4 Cr",
    icon: <FaChartLine />,
    color: "bg-green-500",
    trend: "+22%",
  },
  {
    title: "ROI Forecast",
    value: "524%",
    icon: <FaMoneyBillWave />,
    color: "bg-blue-500",
    trend: "+15%",
  },
  {
    title: "Campaign Success",
    value: "94%",
    icon: <FaBullseye />,
    color: "bg-purple-500",
    trend: "+12%",
  },
];

const recommendations = [
  {
    title: "Increase Push Budget",
    impact: "High",
    revenue: "+₹1.2 Cr",
    confidence: "96%",
  },
  {
    title: "Run Flash Sale at 8 PM",
    impact: "Very High",
    revenue: "+₹82 L",
    confidence: "98%",
  },
  {
    title: "Target VIP Customers",
    impact: "High",
    revenue: "+₹64 L",
    confidence: "93%",
  },
  {
    title: "Recover Abandoned Cart",
    impact: "Medium",
    revenue: "+₹38 L",
    confidence: "89%",
  },
];

const predictions = [
  {
    label: "Customer Lifetime Value",
    value: "₹14,280",
  },
  {
    label: "Churn Probability",
    value: "8%",
  },
  {
    label: "Best Marketing Channel",
    value: "Push Notifications",
  },
  {
    label: "Next Best Offer",
    value: "Buy 2 Get 1",
  },
];

export default function AIMarketingOptimizer() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 rounded-3xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaRobot className="text-3xl" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">AI Marketing Optimizer</h2>

              <p className="text-indigo-100 mt-2">
                Enterprise AI Decision Engine
              </p>
            </div>
          </div>

          <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <FaBolt />
            Run AI Analysis
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {aiStats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl border p-6 shadow-sm"
          >
            <div className="flex justify-between">
              <div
                className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
              >
                {item.icon}
              </div>

              <span className="text-green-600 flex items-center gap-1 font-semibold">
                <FaArrowUp />
                {item.trend}
              </span>
            </div>

            <p className="text-gray-500 mt-5">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Main */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Recommendations */}

        <div className="xl:col-span-2 bg-white rounded-3xl border">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">AI Recommendations</h3>
          </div>

          <div className="divide-y">
            {recommendations.map((item) => (
              <div key={item.title} className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>

                    <p className="text-gray-500 mt-1">
                      Confidence {item.confidence}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {item.impact}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5">
                  <Metric label="Revenue Impact" value={item.revenue} />

                  <Metric label="AI Score" value={item.confidence} />

                  <Metric label="Priority" value={item.impact} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Prediction */}

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white">
            <div className="flex items-center gap-3">
              <FaBrain className="text-3xl" />

              <h3 className="text-xl font-bold">AI Predictions</h3>
            </div>

            <div className="space-y-5 mt-6">
              {predictions.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between border-b border-white/20 pb-2"
                >
                  <span>{item.label}</span>

                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold mb-5">AI Actions</h3>

            <Action icon={<FaLightbulb />} text="Campaign Suggestions" />

            <Action icon={<FaMoneyBillWave />} text="Budget Optimizer" />

            <Action icon={<FaUsers />} text="Customer Lifetime Value" />

            <Action icon={<FaSyncAlt />} text="Churn Prediction" />

            <Action icon={<FaGift />} text="Next Best Offer" />

            <Action icon={<FaPlay />} text="Run AI Simulation" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <h4 className="text-xl font-bold mt-2">{value}</h4>
    </div>
  );
}

function Action({ icon, text }) {
  return (
    <button className="w-full flex items-center gap-3 border rounded-xl p-3 mb-3 hover:bg-indigo-50 transition">
      <span className="text-indigo-600">{icon}</span>
      {text}
    </button>
  );
}
