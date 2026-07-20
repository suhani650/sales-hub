import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaHeart,
  FaGift,
  FaBell,
  FaSms,
  FaHeadset,
  FaRupeeSign,
} from "react-icons/fa";

export default function CustomerProfiles() {
  const customer = {
    id: "CUS-1001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    location: "Delhi, India",
    joined: "12 Jan 2025",
    loyalty: "Gold",
    lifetimeValue: "₹84,500",
    totalOrders: 24,
    wishlistItems: 18,
    rewards: 1240,
  };

  const orders = [
    {
      id: "ORD-1001",
      date: "12 Jul 2026",
      amount: "₹2,499",
      status: "Delivered",
    },
    {
      id: "ORD-1002",
      date: "08 Jul 2026",
      amount: "₹1,850",
      status: "Delivered",
    },
  ];

  const timeline = [
    {
      date: "12 Jul 2026",
      event: "Placed Order #ORD-1001",
    },
    {
      date: "10 Jul 2026",
      event: "Redeemed 200 Reward Points",
    },
    {
      date: "08 Jul 2026",
      event: "Opened Marketing Email",
    },
    {
      date: "05 Jul 2026",
      event: "Raised Support Ticket",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600">
            <FaUser />
          </div>

          <div>
            <h2 className="text-3xl font-bold">{customer.name}</h2>

            <p className="text-gray-500">Customer ID: {customer.id}</p>

            <span className="inline-block mt-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              {customer.loyalty} Member
            </span>
          </div>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard
          title="Lifetime Value"
          value={customer.lifetimeValue}
          icon={<FaRupeeSign />}
        />

        <StatCard
          title="Orders"
          value={customer.totalOrders}
          icon={<FaShoppingCart />}
        />

        <StatCard
          title="Wishlist"
          value={customer.wishlistItems}
          icon={<FaHeart />}
        />

        <StatCard
          title="Reward Points"
          value={customer.rewards}
          icon={<FaGift />}
        />
      </div>

      {/* Contact */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Contact Information</h3>

        <div className="grid md:grid-cols-2 gap-5">
          <InfoCard
            icon={<FaEnvelope />}
            label="Email"
            value={customer.email}
          />

          <InfoCard icon={<FaPhone />} label="Phone" value={customer.phone} />

          <InfoCard
            icon={<FaMapMarkerAlt />}
            label="Location"
            value={customer.location}
          />

          <InfoCard icon={<FaUser />} label="Joined" value={customer.joined} />
        </div>
      </div>

      {/* Engagement */}

      <div className="grid lg:grid-cols-4 gap-5">
        <EngagementCard
          icon={<FaEnvelope />}
          title="Email Engagement"
          value="48%"
        />

        <EngagementCard icon={<FaSms />} title="SMS Engagement" value="22%" />

        <EngagementCard
          icon={<FaBell />}
          title="Notifications"
          value="84 Opened"
        />

        <EngagementCard
          icon={<FaHeadset />}
          title="Support Tickets"
          value="6 Tickets"
        />
      </div>

      {/* Orders */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-xl">Order History</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.id}</td>

                <td className="p-4">{order.date}</td>

                <td className="p-4 text-green-600 font-semibold">
                  {order.amount}
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Timeline */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Customer Timeline</h3>

        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-500">{item.date}</p>

              <h4 className="font-medium">{item.event}</h4>
            </div>
          ))}
        </div>
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

function InfoCard({ icon, label, value }) {
  return (
    <div className="border rounded-xl p-4 flex gap-3 items-center">
      <div className="text-blue-600 text-xl">{icon}</div>

      <div>
        <p className="text-gray-500 text-sm">{label}</p>

        <h4 className="font-medium">{value}</h4>
      </div>
    </div>
  );
}

function EngagementCard({ icon, title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="text-3xl text-blue-600 flex justify-center">{icon}</div>

      <h4 className="font-semibold mt-3">{title}</h4>

      <p className="text-gray-500 mt-2">{value}</p>
    </div>
  );
}
