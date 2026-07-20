import {
  FaBell,
  FaEnvelope,
  FaSms,
  FaMobileAlt,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUsers,
  FaBullhorn,
  FaChartBar,
  FaRobot,
  FaSave,
} from "react-icons/fa";

export default function NotificationPreferences() {
  const smartRules = [
    {
      title: "High Value Order Alert",
      status: true,
    },
    {
      title: "Failed Payment Alert",
      status: true,
    },
    {
      title: "Low Inventory Alert",
      status: true,
    },
    {
      title: "Marketing Campaign Alert",
      status: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Notification Preferences</h2>

        <p className="text-gray-500 mt-2">
          Manage communication channels, alerts and notification rules
        </p>
      </div>

      {/* Overview */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard icon={<FaBell />} title="Active Alerts" value="42" />

        <StatCard icon={<FaEnvelope />} title="Email Rules" value="18" />

        <StatCard icon={<FaMobileAlt />} title="Push Rules" value="14" />

        <StatCard icon={<FaRobot />} title="Smart Rules" value="10" />
      </div>

      {/* Communication Channels */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Communication Channels</h3>

        <div className="space-y-4">
          <ToggleRow
            icon={<FaEnvelope />}
            title="Email Notifications"
            enabled
          />

          <ToggleRow icon={<FaSms />} title="SMS Notifications" enabled />

          <ToggleRow
            icon={<FaMobileAlt />}
            title="Push Notifications"
            enabled
          />
        </div>
      </div>

      {/* Operational Alerts */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Operational Alerts</h3>

        <div className="space-y-4">
          <ToggleRow icon={<FaShoppingCart />} title="Order Alerts" enabled />

          <ToggleRow
            icon={<FaMoneyBillWave />}
            title="Payment Alerts"
            enabled
          />

          <ToggleRow icon={<FaUsers />} title="Team Notifications" enabled />
        </div>
      </div>

      {/* Marketing Preferences */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Marketing Preferences</h3>

        <div className="space-y-4">
          <ToggleRow
            icon={<FaBullhorn />}
            title="Campaign Performance Updates"
            enabled
          />

          <ToggleRow
            icon={<FaChartBar />}
            title="Weekly Marketing Reports"
            enabled
          />

          <ToggleRow icon={<FaBullhorn />} title="Promotion Suggestions" />
        </div>
      </div>

      {/* Smart Notification Rules */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-xl" />

          <h3 className="text-xl font-bold">Smart Notification Rules</h3>
        </div>

        <div className="space-y-4">
          {smartRules.map((rule) => (
            <div
              key={rule.title}
              className="flex justify-between items-center border rounded-xl p-4"
            >
              <span>{rule.title}</span>

              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  rule.status ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                {rule.status ? "Enabled" : "Disabled"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}

      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
          <FaSave />
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-3xl text-blue-600">{icon}</div>

      <p className="text-gray-500 mt-3">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function ToggleRow({ icon, title, enabled = false }) {
  return (
    <div className="flex justify-between items-center border rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="text-blue-600">{icon}</div>

        <span>{title}</span>
      </div>

      <button
        className={`px-4 py-2 rounded-lg text-white ${
          enabled ? "bg-green-600" : "bg-gray-400"
        }`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
}
