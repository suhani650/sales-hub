import {
  FaHistory,
  FaUserShield,
  FaLock,
  FaMoneyBillWave,
  FaBoxes,
  FaShoppingCart,
  FaGlobe,
  FaChartBar,
  FaDownload,
  FaFilter,
} from "react-icons/fa";

export default function AuditLogs() {
  const logs = [
    {
      id: "#AUD-1001",
      event: "User Login",
      category: "Security",
      user: "Admin User",
      date: "17 Jul 2026",
      status: "Success",
    },
    {
      id: "#AUD-1002",
      event: "Product Updated",
      category: "Inventory",
      user: "Inventory Manager",
      date: "16 Jul 2026",
      status: "Completed",
    },
    {
      id: "#AUD-1003",
      event: "Settlement Processed",
      category: "Finance",
      user: "Finance Manager",
      date: "15 Jul 2026",
      status: "Completed",
    },
    {
      id: "#AUD-1004",
      event: "Order Cancelled",
      category: "Orders",
      user: "Support Agent",
      date: "14 Jul 2026",
      status: "Completed",
    },
  ];

  const categories = [
    {
      title: "Security Events",
      icon: <FaLock />,
      value: "1,248",
    },
    {
      title: "Financial Actions",
      icon: <FaMoneyBillWave />,
      value: "842",
    },
    {
      title: "Inventory Changes",
      icon: <FaBoxes />,
      value: "5,420",
    },
    {
      title: "Order Activities",
      icon: <FaShoppingCart />,
      value: "12,840",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Audit & Compliance Center</h2>

            <p className="text-gray-500 mt-2">
              Monitor platform activity, compliance events and security logs
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaDownload />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        {categories.map((item) => (
          <div key={item.title} className="bg-white border rounded-2xl p-6">
            <div className="text-3xl text-blue-600">{item.icon}</div>

            <p className="text-gray-500 mt-3">{item.title}</p>

            <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaFilter className="text-blue-600" />

          <h3 className="text-xl font-bold">Advanced Filters</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <select className="border rounded-xl p-3">
            <option>All Categories</option>
            <option>Security</option>
            <option>Finance</option>
            <option>Inventory</option>
            <option>Orders</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>All Users</option>
          </select>

          <input type="date" className="border rounded-xl p-3" />

          <button className="bg-blue-600 text-white rounded-xl">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <div className="flex items-center gap-3">
            <FaHistory className="text-purple-600" />

            <h3 className="font-bold text-xl">Audit Logs</h3>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Event</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="p-4">{log.id}</td>

                <td className="p-4">{log.event}</td>

                <td className="p-4">{log.category}</td>

                <td className="p-4">{log.user}</td>

                <td className="p-4">{log.date}</td>

                <td className="p-4">
                  <StatusBadge value={log.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance Overview */}

      <div className="grid md:grid-cols-4 gap-5">
        <AuditCard
          icon={<FaUserShield />}
          title="User Activities"
          value="8,420"
        />

        <AuditCard icon={<FaLock />} title="Security Events" value="1,248" />

        <AuditCard icon={<FaGlobe />} title="Login History" value="4,825" />

        <AuditCard icon={<FaChartBar />} title="Compliance Score" value="99%" />
      </div>
    </div>
  );
}

function AuditCard({ icon, title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="flex justify-center text-3xl text-blue-600">{icon}</div>

      <h4 className="font-semibold mt-3">{title}</h4>

      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ value }) {
  const colors = {
    Success: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Failed: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[value]}`}>
      {value}
    </span>
  );
}
