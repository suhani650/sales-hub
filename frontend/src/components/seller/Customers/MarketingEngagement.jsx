import {
  FaEnvelope,
  FaSms,
  FaBell,
  FaBullseye,
  FaChartLine,
  FaUsers,
  FaRobot,
  FaRupeeSign,
} from "react-icons/fa";

export default function MarketingEngagement() {
  const campaigns = [
    {
      name: "Summer Sale Campaign",
      channel: "Email",
      sent: 25000,
      openRate: "42%",
      clickRate: "18%",
      revenue: "₹4.2L",
    },
    {
      name: "Festival Offer",
      channel: "SMS",
      sent: 18000,
      openRate: "68%",
      clickRate: "24%",
      revenue: "₹6.8L",
    },
    {
      name: "Cart Recovery",
      channel: "Push",
      sent: 12000,
      openRate: "72%",
      clickRate: "31%",
      revenue: "₹8.4L",
    },
  ];

  const aiInsights = [
    {
      title: "Highly Engaged Users",
      value: "5,420",
    },
    {
      title: "Likely To Purchase",
      value: "2,180",
    },
    {
      title: "Re-engagement Target",
      value: "860",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Marketing Engagement Center</h2>

        <p className="text-gray-500 mt-2">
          Campaign Performance, Audience Engagement & Revenue Attribution
        </p>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard title="Emails Sent" value="250K" icon={<FaEnvelope />} />

        <StatCard title="SMS Sent" value="180K" icon={<FaSms />} />

        <StatCard title="Push Notifications" value="96K" icon={<FaBell />} />

        <StatCard
          title="Attributed Revenue"
          value="₹24.8L"
          icon={<FaRupeeSign />}
        />
      </div>

      {/* Channel Analytics */}

      <div className="grid lg:grid-cols-4 gap-5">
        <ChannelCard
          title="Email Open Rate"
          value="42%"
          icon={<FaEnvelope />}
        />

        <ChannelCard title="SMS CTR" value="24%" icon={<FaSms />} />

        <ChannelCard title="Push CTR" value="31%" icon={<FaBell />} />

        <ChannelCard title="Audience Reach" value="82K" icon={<FaUsers />} />
      </div>

      {/* Campaign Performance */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-xl">Campaign Performance</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Campaign</th>
              <th className="p-4 text-left">Channel</th>
              <th className="p-4 text-left">Open Rate</th>
              <th className="p-4 text-left">CTR</th>
              <th className="p-4 text-left">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.name} className="border-t">
                <td className="p-4">{campaign.name}</td>

                <td className="p-4">{campaign.channel}</td>

                <td className="p-4 text-blue-600">{campaign.openRate}</td>

                <td className="p-4 text-purple-600">{campaign.clickRate}</td>

                <td className="p-4 text-green-600 font-semibold">
                  {campaign.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Insights */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="font-bold text-xl">AI Engagement Scoring</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {aiInsights.map((item) => (
            <div key={item.title} className="border rounded-xl p-5">
              <h4 className="font-bold">{item.title}</h4>

              <p className="text-3xl font-bold text-blue-600 mt-3">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Attribution */}

      <div className="grid md:grid-cols-3 gap-5">
        <RevenueCard title="Email Revenue" value="₹8.4L" />

        <RevenueCard title="SMS Revenue" value="₹6.8L" />

        <RevenueCard title="Push Revenue" value="₹9.6L" />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-3xl text-blue-600">{icon}</div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function ChannelCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="flex justify-center text-3xl text-purple-600">{icon}</div>

      <h4 className="font-bold mt-4">{title}</h4>

      <p className="text-gray-500 mt-2">{value}</p>
    </div>
  );
}

function RevenueCard({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <h4 className="font-bold">{title}</h4>

      <p className="text-3xl font-bold text-green-600 mt-3">{value}</p>
    </div>
  );
}
