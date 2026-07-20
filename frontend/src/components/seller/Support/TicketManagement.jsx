import { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaTicketAlt,
  FaUserTie,
  FaRobot,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function TicketManagement() {
  const [search, setSearch] = useState("");

  const tickets = [
    {
      id: "TKT-1001",
      subject: "Order Not Delivered",
      customer: "Rahul Sharma",
      priority: "High",
      status: "Open",
      agent: "Neha Singh",
      sla: "2 Hours",
    },
    {
      id: "TKT-1002",
      subject: "Refund Request",
      customer: "Priya Verma",
      priority: "Medium",
      status: "In Progress",
      agent: "Rohit Kumar",
      sla: "6 Hours",
    },
    {
      id: "TKT-1003",
      subject: "Payment Failed",
      customer: "Amit Patel",
      priority: "Critical",
      status: "Escalated",
      agent: "Anjali Gupta",
      sla: "30 Min",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Ticket Management Center</h2>

            <p className="text-gray-500 mt-2">
              Manage, Track & Resolve Customer Support Tickets
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaPlus />
            Create Ticket
          </button>
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <KpiCard title="Open Tickets" value="248" icon={<FaTicketAlt />} />

        <KpiCard title="Assigned Agents" value="24" icon={<FaUserTie />} />

        <KpiCard title="SLA Breaches" value="12" icon={<FaClock />} />

        <KpiCard
          title="Critical Tickets"
          value="18"
          icon={<FaExclamationTriangle />}
        />
      </div>

      {/* Search */}

      <div className="bg-white border rounded-2xl p-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 py-3"
          />
        </div>
      </div>

      {/* Ticket Table */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-xl font-bold">Ticket List</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Ticket ID</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Agent</th>
              <th className="p-4 text-left">SLA</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t">
                <td className="p-4">{ticket.id}</td>

                <td className="p-4">{ticket.subject}</td>

                <td className="p-4">{ticket.customer}</td>

                <td className="p-4">
                  <PriorityBadge value={ticket.priority} />
                </td>

                <td className="p-4">
                  <StatusBadge value={ticket.status} />
                </td>

                <td className="p-4">{ticket.agent}</td>

                <td className="p-4">{ticket.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Classification */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="font-bold text-xl">AI Ticket Classification</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          <AIBox title="Refund Requests" value="124" />

          <AIBox title="Shipping Issues" value="218" />

          <AIBox title="Payment Problems" value="84" />

          <AIBox title="Account Issues" value="42" />
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-3xl text-blue-600">{icon}</div>

      <p className="text-gray-500 mt-3">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function AIBox({ title, value }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <h4 className="font-semibold">{title}</h4>

      <p className="text-3xl font-bold text-blue-600 mt-3">{value}</p>
    </div>
  );
}

function PriorityBadge({ value }) {
  const colors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[value]}`}>
      {value}
    </span>
  );
}

function StatusBadge({ value }) {
  const colors = {
    Open: "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Escalated: "bg-red-100 text-red-700",
    Closed: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[value]}`}>
      {value}
    </span>
  );
}
