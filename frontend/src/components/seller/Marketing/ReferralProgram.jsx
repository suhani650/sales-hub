import { useState } from "react";
import {
  FaUsers,
  FaLink,
  FaGift,
  FaMoneyBillWave,
  FaTrophy,
  FaChartLine,
  FaEnvelope,
  FaCopy,
} from "react-icons/fa";

export default function ReferralProgram() {
  const [referralLink] = useState("https://sellerportal.com/ref/ABC123");

  const leaderboard = [
    {
      id: 1,
      name: "Rahul Sharma",
      referrals: 128,
      earnings: "₹18,400",
    },
    {
      id: 2,
      name: "Priya Verma",
      referrals: 94,
      earnings: "₹12,800",
    },
    {
      id: 3,
      name: "Amit Patel",
      referrals: 72,
      earnings: "₹9,600",
    },
  ];

  const campaigns = [
    {
      id: 1,
      name: "Refer & Earn Summer",
      conversions: 420,
      rewards: "₹84,000",
      status: "Active",
    },
    {
      id: 2,
      name: "VIP Referral Drive",
      conversions: 118,
      rewards: "₹42,000",
      status: "Running",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Referral & Affiliate Program</h2>

        <p className="text-gray-500 mt-2">
          Grow customers through referrals and affiliates
        </p>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard title="Total Referrals" value="8,420" icon={<FaUsers />} />

        <StatCard title="Conversions" value="2,180" icon={<FaChartLine />} />

        <StatCard title="Rewards Paid" value="₹8.4L" icon={<FaGift />} />

        <StatCard
          title="Affiliate Earnings"
          value="₹12.6L"
          icon={<FaMoneyBillWave />}
        />
      </div>

      {/* Referral Link */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Referral Link Generator</h3>

        <div className="flex gap-3">
          <input
            value={referralLink}
            readOnly
            className="flex-1 border rounded-xl p-3"
          />

          <button className="bg-blue-600 text-white px-5 rounded-xl flex items-center gap-2">
            <FaCopy />
            Copy
          </button>
        </div>
      </div>

      {/* Referral Campaigns */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-xl">Referral Campaigns</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Campaign</th>

              <th className="p-4 text-left">Conversions</th>

              <th className="p-4 text-left">Rewards</th>

              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t">
                <td className="p-4 font-medium">{campaign.name}</td>

                <td className="p-4">{campaign.conversions}</td>

                <td className="p-4 text-green-600 font-semibold">
                  {campaign.rewards}
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {campaign.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Referrers */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Top Referrers Leaderboard</h3>

        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <div
              key={user.id}
              className="flex justify-between items-center border rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <FaTrophy className="text-yellow-500 text-2xl" />

                <div>
                  <h4 className="font-semibold">
                    #{index + 1} {user.name}
                  </h4>

                  <p className="text-gray-500">{user.referrals} Referrals</p>
                </div>
              </div>

              <span className="font-bold text-green-600">{user.earnings}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Section */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Send Referral Invitations</h3>

        <div className="flex gap-3">
          <input
            placeholder="Enter Email Address"
            className="flex-1 border rounded-xl p-3"
          />

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaEnvelope />
            Send Invite
          </button>
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
