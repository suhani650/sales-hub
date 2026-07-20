import { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaBell,
  FaRobot,
  FaDownload,
  FaCog,
  FaBolt,
  FaBullhorn,
  FaCircle,
} from "react-icons/fa";

export default function MarketingHeader() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">
      {/* Top */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        {/* Left */}

        <div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FaBullhorn className="text-blue-600 text-2xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Marketing Automation</h1>

              <p className="text-gray-500 mt-1">
                Manage campaigns, customers & AI powered marketing.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">
          <button className="relative p-3 rounded-xl border hover:bg-gray-100">
            <FaBell />

            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              8
            </span>
          </button>

          <button className="p-3 rounded-xl border hover:bg-gray-100">
            <FaRobot />
          </button>

          <button className="p-3 rounded-xl border hover:bg-gray-100">
            <FaCog />
          </button>

          <button className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700">
            <FaDownload />
            Export
          </button>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700">
            <FaPlus />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Bottom */}

      <div className="grid xl:grid-cols-4 gap-4 mt-8">
        {/* Search */}

        <div className="xl:col-span-2 relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search campaigns, emails, customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Date */}

        <input type="date" className="border rounded-xl px-4 py-3" />

        {/* Live */}

        <div className="flex items-center justify-between border rounded-xl px-4 py-3">
          <div>
            <p className="text-sm text-gray-500">Live Campaigns</p>

            <h3 className="font-bold text-lg">28 Running</h3>
          </div>

          <FaCircle className="text-green-500 animate-pulse" />
        </div>
      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-5 gap-4 mt-8">
        <QuickAction title="Email" value="New Campaign" />

        <QuickAction title="SMS" value="Broadcast" />

        <QuickAction title="Push" value="Notification" />

        <QuickAction title="Coupon" value="Generate" />

        <QuickAction title="Automation" value="Workflow" />
      </div>

      {/* AI Banner */}

      <div className="mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">AI Marketing Assistant</h2>

            <p className="mt-2 text-blue-100">
              AI recommends sending your next campaign today at{" "}
              <strong>7:30 PM</strong>
              for an estimated <strong>42% Open Rate</strong>.
            </p>
          </div>

          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold">
            View AI Suggestions
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ title, value }) {
  return (
    <button className="border rounded-2xl p-5 hover:border-blue-500 hover:bg-blue-50 transition">
      <FaBolt className="text-blue-600 text-xl mb-3" />

      <h4 className="font-semibold">{title}</h4>

      <p className="text-sm text-gray-500 mt-1">{value}</p>
    </button>
  );
}
