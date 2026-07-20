import {
  FaBell,
  FaEnvelope,
  FaSms,
  FaMobileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

export default function NotificationHistory() {
  const notifications = [
    {
      id: "NTF-1001",
      type: "Email",
      title: "Summer Sale Campaign",
      recipients: 25000,
      delivered: "24,250",
      readRate: "48%",
      status: "Delivered",
    },
    {
      id: "NTF-1002",
      type: "SMS",
      title: "Festival Discount",
      recipients: 18000,
      delivered: "17,640",
      readRate: "72%",
      status: "Delivered",
    },
    {
      id: "NTF-1003",
      type: "Push",
      title: "Cart Reminder",
      recipients: 12000,
      delivered: "11,580",
      readRate: "68%",
      status: "Delivered",
    },
  ];

  const aiPredictions = [
    {
      title: "High Engagement",
      value: "4,820 Users",
    },
    {
      title: "Likely To Open",
      value: "8,240 Users",
    },
    {
      title: "Re-engagement Needed",
      value: "920 Users",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Notification Intelligence Center</h2>

        <p className="text-gray-500 mt-2">
          Notification Delivery, Read Rates & Engagement Analytics
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard title="Total Notifications" value="485K" icon={<FaBell />} />

        <StatCard title="Delivered" value="468K" icon={<FaCheckCircle />} />

        <StatCard title="Read Rate" value="62%" icon={<FaChartLine />} />

        <StatCard title="Failed" value="17K" icon={<FaTimesCircle />} />
      </div>

      {/* Channel Analytics */}

      <div className="grid lg:grid-cols-4 gap-5">
        <ChannelCard title="Email Logs" value="250K" icon={<FaEnvelope />} />

        <ChannelCard title="SMS Logs" value="180K" icon={<FaSms />} />

        <ChannelCard title="Push Logs" value="55K" icon={<FaMobileAlt />} />

        <ChannelCard title="Avg Read Rate" value="62%" icon={<FaBell />} />
      </div>

      {/* Notification Logs */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-xl">Notification History</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Recipients</th>
              <th className="p-4 text-left">Delivered</th>
              <th className="p-4 text-left">Read Rate</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {notifications.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.type}</td>
                <td className="p-4">{item.title}</td>
                <td className="p-4">{item.recipients}</td>
                <td className="p-4 text-green-600">{item.delivered}</td>
                <td className="p-4 text-blue-600">{item.readRate}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivery Analytics */}

      <div className="grid md:grid-cols-4 gap-5">
        <MetricCard title="Email Delivery" value="97%" />

        <MetricCard title="SMS Delivery" value="98%" />

        <MetricCard title="Push Delivery" value="96%" />

        <MetricCard title="Overall Success" value="97%" />
      </div>

      {/* AI Prediction */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-2xl text-blue-600" />

          <h3 className="font-bold text-xl">AI Engagement Prediction</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {aiPredictions.map((item) => (
            <div key={item.title} className="border rounded-xl p-5">
              <h4 className="font-semibold">{item.title}</h4>

              <p className="text-2xl font-bold text-blue-600 mt-3">
                {item.value}
              </p>
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

function ChannelCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="flex justify-center text-3xl text-purple-600">{icon}</div>

      <h4 className="font-bold mt-4">{title}</h4>

      <p className="text-gray-500 mt-2">{value}</p>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <h4 className="font-bold">{title}</h4>

      <p className="text-3xl font-bold text-green-600 mt-3">{value}</p>
    </div>
  );
}
