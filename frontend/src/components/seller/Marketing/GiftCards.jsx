import {
  FaGift,
  FaCreditCard,
  FaPalette,
  FaCalendarAlt,
  FaEnvelope,
  FaChartLine,
  FaRobot,
  FaPlus,
  FaPlay,
  FaRupeeSign,
} from "react-icons/fa";

const stats = [
  {
    title: "Gift Cards Sold",
    value: "12,480",
    icon: <FaGift />,
    color: "bg-pink-500",
  },
  {
    title: "Active Balance",
    value: "₹42.8L",
    icon: <FaCreditCard />,
    color: "bg-indigo-500",
  },
  {
    title: "Redeemed",
    value: "84%",
    icon: <FaChartLine />,
    color: "bg-green-500",
  },
  {
    title: "Revenue",
    value: "₹1.84Cr",
    icon: <FaRupeeSign />,
    color: "bg-emerald-500",
  },
];

const giftCards = [
  {
    name: "Birthday Gift Card",
    type: "Digital",
    balance: "₹500",
    redeemed: "72%",
    expiry: "30 Dec 2026",
    status: "Active",
  },
  {
    name: "Festival Gift Card",
    type: "Physical",
    balance: "₹1000",
    redeemed: "65%",
    expiry: "15 Jan 2027",
    status: "Running",
  },
  {
    name: "Premium Voucher",
    type: "Digital",
    balance: "₹2500",
    redeemed: "91%",
    expiry: "28 Feb 2027",
    status: "Popular",
  },
];

const designs = ["Birthday", "Festival", "Anniversary", "Premium", "Corporate"];

export default function GiftCards() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-3xl border p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">
              <FaGift className="text-pink-600 text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Gift Cards</h2>

              <p className="text-gray-500">Enterprise Gift Card Platform</p>
            </div>
          </div>

          <button className="bg-pink-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaPlus />
            Create Gift Card
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border p-5">
            <div
              className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl`}
            >
              {item.icon}
            </div>

            <p className="text-gray-500 mt-4">{item.title}</p>

            <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Main */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Gift Cards */}

        <div className="xl:col-span-2 bg-white rounded-3xl border">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Gift Card Inventory</h3>
          </div>

          <div className="divide-y">
            {giftCards.map((card) => (
              <div key={card.name} className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">{card.name}</h4>

                    <p className="text-gray-500 mt-1">{card.type}</p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm">
                    {card.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5">
                  <Metric label="Balance" value={card.balance} />

                  <Metric label="Redeemed" value={card.redeemed} />

                  <Metric label="Expiry" value={card.expiry} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}

        <div className="space-y-6">
          {/* AI */}

          <div className="bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 rounded-3xl text-white p-6">
            <div className="flex items-center gap-3">
              <FaRobot className="text-2xl" />

              <h3 className="text-xl font-bold">AI Insights</h3>
            </div>

            <div className="space-y-4 mt-6">
              <AIItem label="Top Seller" value="Birthday Card" />

              <AIItem label="Forecast Revenue" value="₹2.4Cr" />

              <AIItem label="Suggested Value" value="₹1000" />

              <AIItem label="Best Season" value="Festivals" />
            </div>
          </div>

          {/* Designs */}

          <div className="bg-white rounded-3xl border p-6">
            <div className="flex items-center gap-2 mb-5">
              <FaPalette className="text-pink-600" />

              <h3 className="font-bold">Card Designs</h3>
            </div>

            <div className="space-y-3">
              {designs.map((design) => (
                <div
                  key={design}
                  className="flex justify-between items-center border rounded-xl p-3"
                >
                  <span>{design}</span>

                  <button className="text-pink-600">
                    <FaPlay />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>

            <div className="space-y-3">
              <Action icon={<FaCreditCard />} text="Balance Management" />

              <Action icon={<FaCalendarAlt />} text="Expiry Tracking" />

              <Action icon={<FaEnvelope />} text="Email Delivery" />
            </div>
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

function AIItem({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Action({ icon, text }) {
  return (
    <button className="w-full flex items-center gap-3 border rounded-xl p-3 hover:bg-pink-50 transition">
      <span className="text-pink-600">{icon}</span>
      {text}
    </button>
  );
}
