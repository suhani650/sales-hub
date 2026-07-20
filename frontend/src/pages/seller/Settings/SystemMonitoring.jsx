import { useState } from "react";
import {
  FaServer,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaWifi,
  FaSyncAlt,
  FaDownload,
  FaCheckCircle,
  FaArrowUp,
  FaCloud,
  FaDatabase,
} from "react-icons/fa";

const stats = [
  {
    title: "Server Health",
    value: "99.98%",
    growth: "+0.2%",
    color: "bg-green-500",
    icon: <FaServer />,
  },
  {
    title: "CPU Usage",
    value: "42%",
    growth: "-6%",
    color: "bg-blue-500",
    icon: <FaMicrochip />,
  },
  {
    title: "Memory Usage",
    value: "68%",
    growth: "+4%",
    color: "bg-purple-500",
    icon: <FaMemory />,
  },
  {
    title: "Disk Storage",
    value: "71%",
    growth: "+3%",
    color: "bg-orange-500",
    icon: <FaHdd />,
  },
];

export default function SystemMonitoring() {
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-800 via-indigo-700 to-cyan-700 text-white p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">System Monitoring</h1>
            <p className="mt-2 text-blue-100">
              Enterprise Infrastructure Monitoring Dashboard
            </p>
            <div className="mt-4 flex items-center gap-2">
              <FaCheckCircle className="text-green-300" />
              <span className="text-sm">All Systems Operational</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition ${
                autoRefresh ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              <FaSyncAlt className={autoRefresh ? "animate-spin" : ""} />
              {autoRefresh ? "Auto Refresh ON" : "Auto Refresh OFF"}
            </button>

            <button className="bg-white text-indigo-700 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-100 transition">
              <FaDownload />
              Export Logs
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-3xl border p-6 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <div
                className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
              >
                {item.icon}
              </div>
              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <FaArrowUp />
                {item.growth}
              </span>
            </div>
            <p className="text-gray-500 mt-5">{item.title}</p>
            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Health Overview */}
      <div className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border p-6">
          <h2 className="text-xl font-bold mb-6">Infrastructure Health</h2>
          <div className="space-y-5">
            <HealthRow
              icon={<FaServer />}
              title="Application Server"
              value="Healthy"
              color="text-green-600"
            />
            <HealthRow
              icon={<FaCloud />}
              title="Cloud Services"
              value="Running"
              color="text-green-600"
            />
            <HealthRow
              icon={<FaDatabase />}
              title="Database"
              value="Connected"
              color="text-green-600"
            />
            <HealthRow
              icon={<FaWifi />}
              title="Network"
              value="Stable"
              color="text-green-600"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2">Resource Usage</h2>
          <ProgressBar label="CPU Usage" value={42} color="bg-blue-500" />
          <ProgressBar label="Memory Usage" value={68} color="bg-purple-500" />
          <ProgressBar label="Disk Usage" value={71} color="bg-orange-500" />
          <ProgressBar label="Network Load" value={34} color="bg-green-500" />
        </div>
      </div>

      {/* Performance Dashboard */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="xl:col-span-2 bg-white rounded-3xl border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Live Performance</h2>
            <button className="text-indigo-600 font-semibold hover:underline">
              Last 24 Hours
            </button>
          </div>
          <div className="space-y-6">
            <ProgressBar label="CPU Load" value={42} color="bg-blue-500" />
            <ProgressBar
              label="Memory Consumption"
              value={68}
              color="bg-purple-500"
            />
            <ProgressBar
              label="Network Traffic"
              value={54}
              color="bg-cyan-500"
            />
            <ProgressBar label="Disk I/O" value={31} color="bg-orange-500" />
            <ProgressBar label="API Response" value={22} color="bg-green-500" />
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold">Active Alerts</h2>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
              3 Active
            </span>
          </div>
          <div className="space-y-4">
            <AlertCard title="High Memory Usage" level="Warning" />
            <AlertCard title="Backup Scheduled" level="Info" />
            <AlertCard title="Database Replication" level="Healthy" />
            <AlertCard title="SSL Certificate" level="Healthy" />
          </div>
        </div>
      </div>

      {/* Recent Activity & Error Logs */}
      <div className="grid xl:grid-cols-2 gap-6">
        {/* Activity */}
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Activities</h2>
            <button className="text-indigo-600 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <ActivityItem title="Database Backup Completed" time="5 min ago" />
            <ActivityItem title="API Cache Cleared" time="12 min ago" />
            <ActivityItem title="New Admin Login" time="28 min ago" />
            <ActivityItem title="Server Restart Finished" time="1 hour ago" />
            <ActivityItem title="Security Scan Completed" time="2 hours ago" />
          </div>
        </div>

        {/* Error Logs */}
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Error Logs</h2>
            <button className="text-red-600 hover:underline">View Logs</button>
          </div>
          <div className="space-y-4">
            <LogItem title="Timeout while syncing inventory" level="Medium" />
            <LogItem title="Payment webhook delayed" level="Low" />
            <LogItem title="SMTP retry successful" level="Resolved" />
            <LogItem title="CPU spike detected" level="High" />
          </div>
        </div>
      </div>

      {/* Enterprise Monitoring */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        <MonitorCard
          title="Cloud Services"
          value="Operational"
          icon={<FaCloud />}
          color="bg-sky-500"
        />
        <MonitorCard
          title="Database"
          value="Connected"
          icon={<FaDatabase />}
          color="bg-indigo-500"
        />
        <MonitorCard
          title="API Response"
          value="126 ms"
          icon={<FaServer />}
          color="bg-green-500"
        />
        <MonitorCard
          title="System Uptime"
          value="99.98%"
          icon={<FaCheckCircle />}
          color="bg-emerald-500"
        />
      </div>

      {/* Active Users & Security */}
      <div className="grid xl:grid-cols-2 gap-6">
        {/* Active Users */}
        <div className="bg-white rounded-3xl border p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Active Users</h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              1,284 Online
            </span>
          </div>
          <ProgressBar label="Web Users" value={78} color="bg-blue-500" />
          <ProgressBar label="Mobile Users" value={54} color="bg-green-500" />
          <ProgressBar label="Desktop Users" value={63} color="bg-purple-500" />
          <ProgressBar label="API Sessions" value={37} color="bg-cyan-500" />
        </div>

        {/* Security */}
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Security Events</h2>
            <span className="text-green-600 font-semibold">Protected</span>
          </div>
          <div className="space-y-4">
            <SecurityItem title="Firewall" status="Enabled" />
            <SecurityItem title="SSL Certificate" status="Valid" />
            <SecurityItem title="2FA Authentication" status="Enabled" />
            <SecurityItem title="Suspicious Logins" status="0 Today" />
            <SecurityItem title="Blocked Requests" status="126" />
          </div>
        </div>
      </div>

      {/* AI Health & Database */}
      <div className="grid xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2">AI Health Monitor</h2>
          <ProgressBar
            label="Prediction Engine"
            value={96}
            color="bg-indigo-500"
          />
          <ProgressBar label="AI Response" value={92} color="bg-green-500" />
          <ProgressBar
            label="Model Accuracy"
            value={98}
            color="bg-purple-500"
          />
          <ProgressBar
            label="Learning Queue"
            value={61}
            color="bg-orange-500"
          />
        </div>

        <div className="bg-white rounded-3xl border p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2">Database Monitoring</h2>
          <ProgressBar label="Connections" value={81} color="bg-blue-500" />
          <ProgressBar label="Query Speed" value={95} color="bg-green-500" />
          <ProgressBar label="Storage" value={72} color="bg-yellow-500" />
          <ProgressBar label="Replication" value={100} color="bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Helper Components
============================================================ */

function HealthRow({ icon, title, value, color }) {
  return (
    <div className="flex justify-between items-center border rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="text-indigo-600 text-xl">{icon}</div>
        <span className="font-medium">{title}</span>
      </div>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
}

function ProgressBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-sm text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function AlertCard({ title, level }) {
  const color =
    level === "Healthy"
      ? "text-green-600 bg-green-50 border-green-200"
      : level === "Warning"
        ? "text-yellow-600 bg-yellow-50 border-yellow-200"
        : "text-blue-600 bg-blue-50 border-blue-200";

  return (
    <div className={`rounded-xl p-4 border ${color}`}>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs uppercase tracking-wider font-bold">
          {level}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ title, time }) {
  return (
    <div className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
      <span className="text-gray-800 text-sm">{title}</span>
      <span className="text-gray-400 text-xs">{time}</span>
    </div>
  );
}

function LogItem({ title, level }) {
  const badge =
    level === "Resolved"
      ? "bg-green-100 text-green-700"
      : level === "High"
        ? "bg-red-100 text-red-700"
        : level === "Medium"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-blue-100 text-blue-700";

  return (
    <div className="flex justify-between items-center border rounded-xl p-4">
      <span className="text-gray-800 text-sm font-medium">{title}</span>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge}`}>
        {level}
      </span>
    </div>
  );
}

function MonitorCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-3xl border p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div
          className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
        >
          {icon}
        </div>
        <FaCheckCircle className="text-green-500 text-xl" />
      </div>
      <p className="text-gray-500 mt-5 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function SecurityItem({ title, status }) {
  return (
    <div className="flex justify-between items-center border rounded-xl p-4">
      <span className="font-medium text-sm text-gray-800">{title}</span>
      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
        {status}
      </span>
    </div>
  );
}
