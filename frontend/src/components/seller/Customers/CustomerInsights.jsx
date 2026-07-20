import {
  FaUserCircle,
  FaBrain,
  FaChartLine,
  FaRupeeSign,
  FaHeart,
  FaRobot,
  FaExclamationTriangle,
  FaBullseye,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";

export default function CustomerInsights() {
  const customer = {
    name: "Rahul Sharma",
    segment: "VIP",
    clv: "₹84,200",
    orders: 38,
    revenue: "₹1.24L",
    loyalty: "Platinum",
    churnRisk: "Low",
    engagement: "94%",
    intent: "92%",
  };

  const timeline = [
    {
      date: "16 Jul",
      activity: "Purchased Apple AirPods Pro",
    },
    {
      date: "14 Jul",
      activity: "Opened Summer Sale Email",
    },
    {
      date: "12 Jul",
      activity: "Added Smart Watch to Wishlist",
    },
    {
      date: "10 Jul",
      activity: "Reward Points Redeemed",
    },
    {
      date: "08 Jul",
      activity: "Support Ticket Closed",
    },
  ];

  const recommendations = [
    "Offer Premium Membership Upgrade",
    "Recommend Smart Watch Bundle",
    "Send Festival Cashback Coupon",
    "Invite to Early Access Sale",
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Customer 360 Intelligence</h2>

        <p className="text-gray-500 mt-2">
          AI Powered Customer Profile & Revenue Intelligence
        </p>
      </div>

      {/* Customer Profile */}

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-white border rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUserCircle className="text-4xl text-blue-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold">{customer.name}</h3>

              <p className="text-gray-500">{customer.segment} Customer</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <ProfileItem title="Lifetime Value" value={customer.clv} />

            <ProfileItem title="Orders" value={customer.orders} />

            <ProfileItem title="Revenue" value={customer.revenue} />

            <ProfileItem title="Loyalty" value={customer.loyalty} />
          </div>
        </div>

        <div className="lg:col-span-2 grid md:grid-cols-3 gap-5">
          <InsightCard
            title="Buying Intent"
            value={customer.intent}
            icon={<FaHeart />}
          />

          <InsightCard
            title="Engagement"
            value={customer.engagement}
            icon={<FaChartLine />}
          />

          <InsightCard
            title="Churn Risk"
            value={customer.churnRisk}
            icon={<FaExclamationTriangle />}
          />

          <InsightCard title="AI Score" value="98/100" icon={<FaBrain />} />

          <InsightCard
            title="Predicted CLV"
            value="₹1.2L"
            icon={<FaRupeeSign />}
          />

          <InsightCard
            title="Revenue Opportunity"
            value="₹28K"
            icon={<FaBullseye />}
          />
        </div>
      </div>

      {/* Timeline */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaClock className="text-blue-600" />

          <h3 className="text-xl font-bold">Customer Timeline</h3>
        </div>

        <div className="space-y-4">
          {timeline.map((item) => (
            <div
              key={item.activity}
              className="flex gap-4 border-l-4 border-blue-500 pl-4"
            >
              <div className="font-semibold text-blue-600">{item.date}</div>

              <div>{item.activity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="text-xl font-bold">Next Best Action AI</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {recommendations.map((action) => (
            <div
              key={action}
              className="border rounded-xl p-5 flex items-center gap-3"
            >
              <FaUserCheck className="text-green-600" />

              {action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ title, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{title}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}

function InsightCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-blue-600 text-3xl">{icon}</div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}
