import {
  FaUsers,
  FaUserTag,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaRobot,
  FaSyncAlt,
  FaChartLine,
  FaPlus,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Audiences",
    value: "182",
    icon: <FaUsers />,
    color: "bg-blue-500",
  },
  {
    title: "Customers",
    value: "2.84M",
    icon: <FaUserTag />,
    color: "bg-green-500",
  },
  {
    title: "Dynamic Segments",
    value: "46",
    icon: <FaChartLine />,
    color: "bg-purple-500",
  },
  {
    title: "Sync Status",
    value: "100%",
    icon: <FaSyncAlt />,
    color: "bg-orange-500",
  },
];

const audiences = [
  {
    name: "VIP Customers",
    size: "182K",
    type: "Purchase Based",
    engagement: "94%",
    status: "Active",
  },
  {
    name: "Cart Abandonment",
    size: "48K",
    type: "Behavioral",
    engagement: "71%",
    status: "Dynamic",
  },
  {
    name: "Festival Buyers",
    size: "640K",
    type: "Seasonal",
    engagement: "83%",
    status: "Active",
  },
  {
    name: "High Value Orders",
    size: "28K",
    type: "Premium",
    engagement: "97%",
    status: "Growing",
  },
];

const aiSuggestions = [
  "Customers inactive for 30 days",
  "Purchased more than ₹10,000",
  "Viewed product 3+ times",
  "Frequent mobile shoppers",
];

export default function AudienceManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-3xl border p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FaUsers className="text-blue-600 text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Audience Management</h2>

              <p className="text-gray-500">
                Enterprise Customer Segmentation Platform
              </p>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaPlus />
            Create Audience
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border p-5">
            <div
              className={`${item.color} w-12 h-12 rounded-xl text-white flex items-center justify-center text-xl`}
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
        {/* Audience List */}

        <div className="xl:col-span-2 bg-white rounded-3xl border">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Audience Segments</h3>
          </div>

          <div className="divide-y">
            {audiences.map((audience) => (
              <div key={audience.name} className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{audience.name}</h4>

                    <p className="text-gray-500 mt-1">{audience.type}</p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {audience.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5">
                  <Metric label="Audience Size" value={audience.size} />

                  <Metric label="Engagement" value={audience.engagement} />

                  <Metric label="Growth" value="+18%" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}

        <div className="space-y-6">
          {/* AI */}

          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 text-white">
            <div className="flex items-center gap-3">
              <FaRobot className="text-2xl" />

              <h3 className="text-xl font-bold">AI Audience Builder</h3>
            </div>

            <div className="space-y-4 mt-6">
              {aiSuggestions.map((item) => (
                <div
                  key={item}
                  className="flex justify-between border-b border-white/20 pb-2"
                >
                  <span>{item}</span>

                  <FaPlay />
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}

          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold mb-5">Segment Categories</h3>

            <Action icon={<FaShoppingBag />} text="Purchase History" />

            <Action icon={<FaMapMarkerAlt />} text="Location Based" />

            <Action icon={<FaUserTag />} text="Customer Tags" />

            <Action icon={<FaSyncAlt />} text="Real-time Sync" />
          </div>

          {/* Analytics */}

          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold mb-5">Audience Analytics</h3>

            <Metric label="Average Growth" value="+22%" />

            <Metric label="Retention" value="91%" />

            <Metric label="Campaign Success" value="86%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 mt-3">
      <p className="text-sm text-gray-500">{label}</p>

      <h4 className="text-xl font-bold mt-2">{value}</h4>
    </div>
  );
}

function Action({ icon, text }) {
  return (
    <button className="w-full flex items-center gap-3 border rounded-xl p-3 mb-3 hover:bg-blue-50 transition">
      <span className="text-blue-600">{icon}</span>

      {text}
    </button>
  );
}
