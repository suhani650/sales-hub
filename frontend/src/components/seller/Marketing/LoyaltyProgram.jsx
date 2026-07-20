import { useState } from "react";
import {
  FaGift,
  FaCrown,
  FaCoins,
  FaUsers,
  FaChartLine,
  FaPlus,
} from "react-icons/fa";

export default function LoyaltyProgram() {
  const [rewardRule, setRewardRule] = useState({
    event: "PURCHASE",
    points: 10,
    status: true,
  });

  const tiers = [
    {
      name: "Silver",
      minPoints: 0,
      benefits: "Basic Rewards",
      members: 8420,
    },
    {
      name: "Gold",
      minPoints: 500,
      benefits: "Priority Support",
      members: 3280,
    },
    {
      name: "Platinum",
      minPoints: 1500,
      benefits: "VIP Rewards",
      members: 920,
    },
  ];

  const rewards = [
    {
      id: 1,
      rule: "Purchase Reward",
      points: 10,
      status: "Active",
    },
    {
      id: 2,
      rule: "Referral Bonus",
      points: 100,
      status: "Active",
    },
    {
      id: 3,
      rule: "Birthday Reward",
      points: 250,
      status: "Scheduled",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Loyalty & Rewards Program</h2>

        <p className="text-gray-500 mt-2">
          Customer Retention & Rewards Management
        </p>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard title="Active Members" value="12.6K" icon={<FaUsers />} />

        <StatCard title="Points Issued" value="1.8M" icon={<FaCoins />} />

        <StatCard title="Reward Redemptions" value="18.4K" icon={<FaGift />} />

        <StatCard title="Retention Rate" value="84%" icon={<FaChartLine />} />
      </div>

      {/* Membership Tiers */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Membership Tiers</h3>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div key={tier.name} className="border rounded-2xl p-6">
              <FaCrown className="text-4xl text-yellow-500" />

              <h4 className="font-bold text-xl mt-4">{tier.name}</h4>

              <p className="text-gray-500 mt-2">Min Points: {tier.minPoints}</p>

              <p className="mt-2">{tier.benefits}</p>

              <p className="mt-4 font-semibold">
                Members: {tier.members.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Rule Builder */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Reward Rules Engine</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={rewardRule.event}
            onChange={(e) =>
              setRewardRule({
                ...rewardRule,
                event: e.target.value,
              })
            }
            className="border rounded-xl p-3"
          >
            <option value="PURCHASE">Purchase Reward</option>

            <option value="REFERRAL">Referral Reward</option>

            <option value="BIRTHDAY">Birthday Reward</option>

            <option value="REVIEW">Product Review</option>
          </select>

          <input
            type="number"
            value={rewardRule.points}
            onChange={(e) =>
              setRewardRule({
                ...rewardRule,
                points: e.target.value,
              })
            }
            className="border rounded-xl p-3"
            placeholder="Points"
          />

          <button className="bg-blue-600 text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2">
            <FaPlus />
            Save Rule
          </button>
        </div>
      </div>

      {/* Rewards Table */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-xl">Reward Rules</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Reward Type</th>

              <th className="p-4 text-left">Points</th>

              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {rewards.map((reward) => (
              <tr key={reward.id} className="border-t">
                <td className="p-4">{reward.rule}</td>

                <td className="p-4 font-semibold">{reward.points}</td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {reward.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loyalty Analytics */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Loyalty Analytics</h3>

        <div className="grid md:grid-cols-4 gap-4">
          <AnalyticsCard title="VIP Customers" value="920" />

          <AnalyticsCard title="Avg Reward Value" value="₹640" />

          <AnalyticsCard title="Points Redeemed" value="780K" />

          <AnalyticsCard title="Repeat Purchases" value="68%" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-blue-600 text-3xl">{icon}</div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function AnalyticsCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <p className="text-gray-500">{title}</p>

      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
