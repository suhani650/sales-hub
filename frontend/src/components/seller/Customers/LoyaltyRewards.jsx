import {
  FaCrown,
  FaGift,
  FaCoins,
  FaChartLine,
  FaUsers,
  FaTicketAlt,
  FaBirthdayCake,
  FaRobot,
} from "react-icons/fa";

export default function LoyaltyRewards() {
  const tiers = [
    {
      name: "Silver",
      members: 8420,
      points: "420K",
      cashback: "2%",
      color: "bg-gray-100",
    },
    {
      name: "Gold",
      members: 3280,
      points: "780K",
      cashback: "5%",
      color: "bg-yellow-100",
    },
    {
      name: "Platinum",
      members: 920,
      points: "1.2M",
      cashback: "8%",
      color: "bg-purple-100",
    },
  ];

  const rewards = [
    {
      reward: "Coupon Redemption",
      redeemed: 2840,
      value: "₹8.2L",
    },
    {
      reward: "Birthday Rewards",
      redeemed: 920,
      value: "₹2.4L",
    },
    {
      reward: "Cashback Rewards",
      redeemed: 1820,
      value: "₹6.8L",
    },
  ];

  const aiInsights = [
    {
      title: "High Retention Customers",
      value: "84%",
    },
    {
      title: "Potential VIP Members",
      value: "1,240",
    },
    {
      title: "Reward Engagement",
      value: "72%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Loyalty & Rewards Intelligence</h2>

        <p className="text-gray-500 mt-2">
          Reward Programs, Retention & Customer Loyalty Analytics
        </p>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard title="Loyalty Members" value="12,620" icon={<FaUsers />} />

        <StatCard title="Reward Points" value="2.4M" icon={<FaCoins />} />

        <StatCard title="Retention Rate" value="84%" icon={<FaChartLine />} />

        <StatCard title="VIP Customers" value="920" icon={<FaCrown />} />
      </div>

      {/* Loyalty Tiers */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Loyalty Tiers</h3>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`${tier.color} rounded-2xl p-6 border`}
            >
              <h4 className="font-bold text-xl">{tier.name}</h4>

              <p className="mt-2">Members: {tier.members}</p>

              <p>Points: {tier.points}</p>

              <p>Cashback: {tier.cashback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Analytics */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-xl">Reward Redemption Analytics</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Reward Type</th>
              <th className="p-4 text-left">Redeemed</th>
              <th className="p-4 text-left">Value</th>
            </tr>
          </thead>

          <tbody>
            {rewards.map((item) => (
              <tr key={item.reward} className="border-t">
                <td className="p-4">{item.reward}</td>

                <td className="p-4">{item.redeemed}</td>

                <td className="p-4 text-green-600 font-semibold">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loyalty Benefits */}

      <div className="grid lg:grid-cols-3 gap-5">
        <BenefitCard
          icon={<FaTicketAlt />}
          title="Coupon Rewards"
          value="18.4K Issued"
        />

        <BenefitCard
          icon={<FaBirthdayCake />}
          title="Birthday Rewards"
          value="920 Claimed"
        />

        <BenefitCard
          icon={<FaGift />}
          title="Cashback Program"
          value="₹12.4L Distributed"
        />
      </div>

      {/* AI Insights */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="text-xl font-bold">AI Loyalty Insights</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {aiInsights.map((item) => (
            <div key={item.title} className="border rounded-xl p-5">
              <h4 className="font-semibold">{item.title}</h4>

              <p className="text-blue-600 text-xl font-bold mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CLV Impact */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">
          Customer Lifetime Value Impact
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <ImpactCard title="Average CLV" value="₹18,400" />

          <ImpactCard title="VIP CLV" value="₹84,200" />

          <ImpactCard title="Repeat Purchase" value="68%" />

          <ImpactCard title="Revenue Impact" value="₹2.8Cr" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-3xl text-yellow-500">{icon}</div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function BenefitCard({ icon, title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="text-3xl text-purple-600 flex justify-center">{icon}</div>

      <h4 className="font-bold mt-4">{title}</h4>

      <p className="text-gray-500 mt-2">{value}</p>
    </div>
  );
}

function ImpactCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <p className="text-gray-500">{title}</p>

      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
