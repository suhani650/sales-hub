import {
  FaChartLine,
  FaRupeeSign,
  FaBullseye,
  FaUsers,
  FaEnvelope,
  FaSms,
  FaBell,
  FaGlobe,
  FaMobileAlt,
  FaRobot,
  FaArrowUp,
} from "react-icons/fa";

const analyticsCards = [
  {
    title: "Campaign ROI",
    value: "428%",
    growth: "+18%",
    color: "bg-green-500",
    icon: <FaChartLine />,
  },
  {
    title: "Revenue",
    value: "₹12.48 Cr",
    growth: "+24%",
    color: "bg-blue-500",
    icon: <FaRupeeSign />,
  },
  {
    title: "Conversions",
    value: "28,420",
    growth: "+11%",
    color: "bg-purple-500",
    icon: <FaBullseye />,
  },
  {
    title: "Audience",
    value: "3.82M",
    growth: "+16%",
    color: "bg-orange-500",
    icon: <FaUsers />,
  },
];

const channels = [
  {
    channel: "Email",
    icon: <FaEnvelope />,
    engagement: "48%",
    revenue: "₹3.2 Cr",
    roi: "420%",
  },
  {
    channel: "SMS",
    icon: <FaSms />,
    engagement: "34%",
    revenue: "₹2.1 Cr",
    roi: "368%",
  },
  {
    channel: "Push",
    icon: <FaBell />,
    engagement: "63%",
    revenue: "₹5.8 Cr",
    roi: "492%",
  },
];

const geo = [
  {
    country: "India",
    users: "2.8M",
    revenue: "₹8.4 Cr",
  },
  {
    country: "UAE",
    users: "420K",
    revenue: "₹1.6 Cr",
  },
  {
    country: "Singapore",
    users: "180K",
    revenue: "₹84L",
  },
];

export default function CampaignAnalytics() {
  return (
    <div className="space-y-6">
      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {analyticsCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-3xl border p-6 shadow-sm"
          >
            <div className="flex justify-between">
              <div
                className={`${card.color} w-14 h-14 rounded-2xl text-white flex items-center justify-center text-2xl`}
              >
                {card.icon}
              </div>

              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <FaArrowUp />

                {card.growth}
              </span>
            </div>

            <p className="text-gray-500 mt-5">{card.title}</p>

            <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Main */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Channels */}

        <div className="xl:col-span-2 bg-white rounded-3xl border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Channel Analytics</h2>
          </div>

          <div className="divide-y">
            {channels.map((item) => (
              <div key={item.channel} className="p-6">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="font-bold">{item.channel}</h3>

                      <p className="text-gray-500">ROI {item.roi}</p>
                    </div>
                  </div>

                  <span className="text-green-600 font-bold">
                    {item.revenue}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex justify-between mb-2">
                    <span>Engagement</span>

                    <span>{item.engagement}</span>
                  </div>

                  <div className="h-3 rounded-full bg-gray-200">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{
                        width: item.engagement,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI */}

        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-6 text-white">
          <div className="flex items-center gap-3">
            <FaRobot className="text-3xl" />

            <h2 className="text-2xl font-bold">AI Insights</h2>
          </div>

          <div className="space-y-5 mt-8">
            <Insight label="Highest ROI" value="Push Campaign" />

            <Insight label="Best Audience" value="Returning Customers" />

            <Insight label="Conversion" value="28.4%" />

            <Insight label="Forecast" value="₹14.8 Cr" />
          </div>
        </div>
      </div>

      {/* Geography */}

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaGlobe className="text-blue-600" />

            <h2 className="text-xl font-bold">Geographic Analytics</h2>
          </div>

          <div className="space-y-5">
            {geo.map((country) => (
              <div
                key={country.country}
                className="flex justify-between border-b pb-3"
              >
                <span>{country.country}</span>

                <div className="text-right">
                  <p className="font-semibold">{country.users}</p>

                  <p className="text-green-600">{country.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaMobileAlt className="text-purple-600" />

            <h2 className="text-xl font-bold">Device Analytics</h2>
          </div>

          <div className="space-y-5">
            <Device device="Android" value="62%" />

            <Device device="iOS" value="28%" />

            <Device device="Desktop" value="10%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Insight({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Device({ device, value }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{device}</span>
        <span>{value}</span>
      </div>

      <div className="h-3 rounded-full bg-gray-200">
        <div
          className="bg-purple-600 h-3 rounded-full"
          style={{ width: value }}
        />
      </div>
    </div>
  );
}
