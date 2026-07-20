import {
  FaBullhorn,
  FaPlayCircle,
  FaClock,
  FaFileAlt,
  FaCheckCircle,
  FaArchive,
  FaUsers,
  FaRupeeSign,
  FaRobot,
  FaArrowUp,
} from "react-icons/fa";

const overviewCards = [
  {
    title: "Total Campaigns",
    value: 248,
    icon: <FaBullhorn />,
    color: "bg-blue-500",
  },
  {
    title: "Active",
    value: 42,
    icon: <FaPlayCircle />,
    color: "bg-green-500",
  },
  {
    title: "Scheduled",
    value: 18,
    icon: <FaClock />,
    color: "bg-yellow-500",
  },
  {
    title: "Draft",
    value: 14,
    icon: <FaFileAlt />,
    color: "bg-indigo-500",
  },
  {
    title: "Completed",
    value: 162,
    icon: <FaCheckCircle />,
    color: "bg-emerald-500",
  },
  {
    title: "Archived",
    value: 12,
    icon: <FaArchive />,
    color: "bg-gray-500",
  },
];

const recentCampaigns = [
  {
    name: "Summer Mega Sale",
    audience: "182K",
    revenue: "₹28.4L",
    status: "Running",
    score: 96,
  },
  {
    name: "Monsoon Cashback",
    audience: "92K",
    revenue: "₹14.8L",
    status: "Scheduled",
    score: 91,
  },
  {
    name: "Festival Launch",
    audience: "248K",
    revenue: "₹42.2L",
    status: "Completed",
    score: 98,
  },
];

export default function CampaignOverview() {
  return (
    <div className="space-y-6">
      {/* KPI */}

      <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {overviewCards.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl border p-6 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div
                className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl`}
              >
                {item.icon}
              </div>

              <span className="text-green-600 flex items-center gap-1 text-sm font-semibold">
                <FaArrowUp />
                12%
              </span>
            </div>

            <p className="text-gray-500 mt-5 text-sm">{item.title}</p>

            <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Overview */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Campaign Table */}

        <div className="xl:col-span-2 bg-white rounded-3xl border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Campaign Overview</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Campaign</th>
                  <th className="text-left p-4">Audience</th>
                  <th className="text-left p-4">Revenue</th>
                  <th className="text-left p-4">Health</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentCampaigns.map((campaign) => (
                  <tr key={campaign.name} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-semibold">{campaign.name}</td>

                    <td className="p-4">{campaign.audience}</td>

                    <td className="p-4 text-green-600 font-semibold">
                      {campaign.revenue}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{
                              width: `${campaign.score}%`,
                            }}
                          />
                        </div>

                        <span className="font-semibold">{campaign.score}%</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Summary */}

        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl text-white p-6">
          <div className="flex items-center gap-3">
            <FaRobot className="text-3xl" />

            <h3 className="text-2xl font-bold">AI Campaign Health</h3>
          </div>

          <div className="mt-8 space-y-5">
            <SummaryItem label="Health Score" value="96%" />

            <SummaryItem
              label="Audience Reach"
              value="2.4M"
              icon={<FaUsers />}
            />

            <SummaryItem
              label="Revenue"
              value="₹8.42Cr"
              icon={<FaRupeeSign />}
            />

            <SummaryItem
              label="Recommendation"
              value="Increase Push Campaigns"
            />
          </div>

          <button className="w-full mt-8 bg-white text-blue-700 py-3 rounded-xl font-semibold hover:bg-gray-100">
            View AI Report
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, icon }) {
  return (
    <div className="flex justify-between items-center border-b border-white/20 pb-3">
      <div className="flex items-center gap-2">
        {icon}

        <span>{label}</span>
      </div>

      <span className="font-bold">{value}</span>
    </div>
  );
}
