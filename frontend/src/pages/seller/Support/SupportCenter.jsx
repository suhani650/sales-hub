import { FaSearch, FaDownload, FaRobot, FaBell } from "react-icons/fa";

import SupportDashboard from "./SupportDashboard";

import TicketManagement from "../../../components/seller/Support/TicketManagement";
import LiveChatCenter from "../../../components/seller/Support/LiveChatCenter";
import KnowledgeBase from "../../../components/seller/Support/KnowledgeBase";
import AgentPerformance from "../../../components/seller/Support/AgentPerformance";
import SupportAnalytics from "../../../components/seller/Support/SupportAnalytics";

export default function SupportCenter() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Support Command Center</h1>

            <p className="text-gray-500 mt-2">
              Omni-Channel Customer Support & Service Operations Platform
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaDownload />
            Export Support Report
          </button>
        </div>
      </div>

      {/* Global Filters */}

      <div className="bg-white border rounded-2xl p-5">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search tickets, chats, agents..."
              className="w-full border rounded-xl pl-12 py-3"
            />
          </div>

          <select className="border rounded-xl p-3">
            <option>All Priorities</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>All Channels</option>
            <option>Chat</option>
            <option>Call</option>
            <option>Email</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Escalated</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      {/* Executive KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <ExecutiveCard title="Total Tickets" value="12,480" />

        <ExecutiveCard title="CSAT" value="94%" />

        <ExecutiveCard title="SLA Compliance" value="97%" />

        <ExecutiveCard title="Avg Response" value="18 Min" />
      </div>

      {/* AI Command Center */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h2 className="font-bold text-2xl">AI Support Command Center</h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-5">
          <InsightCard title="Escalation Risk" value="42 Tickets" />

          <InsightCard title="Automation Potential" value="68%" />

          <InsightCard title="Predicted CSAT" value="95%" />

          <InsightCard title="Agent Utilization" value="88%" />
        </div>
      </div>

      {/* Real-Time Alerts */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaBell className="text-orange-500 text-2xl" />

          <h2 className="font-bold text-2xl">Real-Time Alerts</h2>
        </div>

        <div className="space-y-3">
          <AlertItem text="12 Critical Tickets Require Immediate Attention" />
          <AlertItem text="4 SLA Breaches Detected" />
          <AlertItem text="Agent Queue Capacity Above 90%" />
          <AlertItem text="AI Recommended Escalation For 8 Tickets" />
        </div>
      </div>

      {/* Modules */}

      <SupportDashboard />

      <TicketManagement />

      <LiveChatCenter />

      <KnowledgeBase />

      <AgentPerformance />

      <SupportAnalytics />
    </div>
  );
}

function ExecutiveCard({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <p className="text-gray-500">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function InsightCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5">
      <h4 className="font-semibold">{title}</h4>

      <p className="text-2xl font-bold text-blue-600 mt-3">{value}</p>
    </div>
  );
}

function AlertItem({ text }) {
  return (
    <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
      {text}
    </div>
  );
}
