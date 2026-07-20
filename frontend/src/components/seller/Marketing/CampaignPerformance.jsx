import {
  FaEnvelope,
  FaSms,
  FaBell,
  FaMousePointer,
  FaChartLine,
  FaUsers,
  FaRobot,
  FaRupeeSign,
  FaArrowUp,
} from "react-icons/fa";

const kpis = [
  {
    title: "Open Rate",
    value: "46.8%",
    growth: "+6.2%",
    icon: <FaEnvelope />,
    color: "bg-blue-500",
  },
  {
    title: "Click Rate",
    value: "18.4%",
    growth: "+2.1%",
    icon: <FaMousePointer />,
    color: "bg-green-500",
  },
  {
    title: "Conversion",
    value: "9.8%",
    growth: "+1.8%",
    icon: <FaChartLine />,
    color: "bg-purple-500",
  },
  {
    title: "Revenue",
    value: "₹2.84 Cr",
    growth: "+18%",
    icon: <FaRupeeSign />,
    color: "bg-emerald-500",
  },
];

const channels = [
  {
    channel: "Email Marketing",
    sent: "184K",
    engagement: "42%",
    revenue: "₹84L",
    score: 94,
    icon: <FaEnvelope />,
  },
  {
    channel: "SMS Marketing",
    sent: "96K",
    engagement: "31%",
    revenue: "₹42L",
    score: 88,
    icon: <FaSms />,
  },
  {
    channel: "Push Notifications",
    sent: "228K",
    engagement: "58%",
    revenue: "₹1.12Cr",
    score: 97,
    icon: <FaBell />,
  },
];

const trends = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 68 },
  { month: "Mar", value: 71 },
  { month: "Apr", value: 77 },
  { month: "May", value: 84 },
  { month: "Jun", value: 91 },
];

export default function CampaignPerformance() {
  return (
    <div className="space-y-6">
      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {kpis.map((item) => (
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

              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <FaArrowUp />
                {item.growth}
              </div>
            </div>

            <p className="text-gray-500 mt-5">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Main */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Channel Performance */}

        <div className="xl:col-span-2 bg-white rounded-3xl border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Channel Performance</h2>
          </div>

          <div className="divide-y">
            {channels.map((item) => (
              <div key={item.channel} className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="font-bold">{item.channel}</h3>

                      <p className="text-sm text-gray-500">
                        {item.sent} Messages Sent
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-green-600">
                    {item.revenue}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-5 mt-5">
                  <Metric label="Engagement" value={item.engagement} />

                  <Metric label="Revenue" value={item.revenue} />

                  <Metric label="AI Score" value={`${item.score}%`} />
                </div>

                <div className="mt-5 h-3 rounded-full bg-gray-200">
                  <div
                    className="h-3 rounded-full bg-green-500"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI */}

        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 text-white">
          <div className="flex items-center gap-3">
            <FaRobot className="text-3xl" />

            <h2 className="text-2xl font-bold">AI Insights</h2>
          </div>

          <div className="space-y-5 mt-8">
            <Insight title="Best Channel" value="Push Notifications" />

            <Insight title="Highest CTR" value="18.4%" />

            <Insight title="Best Time" value="7:30 PM" />

            <Insight title="Predicted Revenue" value="₹3.2 Cr" />

            <Insight title="Recommendation" value="Increase Push Budget" />
          </div>
        </div>
      </div>

      {/* Trends */}

      <div className="bg-white rounded-3xl border p-6">
        <h2 className="text-xl font-bold mb-6">Performance Trend</h2>

        <div className="space-y-5">
          {trends.map((item) => (
            <div key={item.month} className="flex items-center gap-5">
              <div className="w-12 font-semibold">{item.month}</div>

              <div className="flex-1 h-3 rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-blue-600"
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>

              <div className="font-bold text-blue-600">{item.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <h4 className="font-bold text-lg mt-1">{value}</h4>
    </div>
  );
}

function Insight({ title, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-3">
      <span>{title}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
