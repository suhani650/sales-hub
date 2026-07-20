import { FaSearch, FaDownload, FaUndo, FaCalendarAlt } from "react-icons/fa";

export default function CampaignFilters({
  filters,
  setFilters,
  onExport,
  onReset,
}) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        {/* Search */}

        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-white/40" />

          <input
            type="text"
            placeholder="Search Campaign"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 text-white placeholder-white/40 outline-none focus:border-indigo-400"
          />
        </div>

        {/* Campaign Type */}

        <select
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
        >
          <option className="bg-[#0B1225]" value="">
            All Campaign Types
          </option>
          <option className="bg-[#0B1225]" value="EMAIL">
            Email Campaign
          </option>
          <option className="bg-[#0B1225]" value="SMS">
            SMS Campaign
          </option>
          <option className="bg-[#0B1225]" value="COUPON">
            Coupon Campaign
          </option>
          <option className="bg-[#0B1225]" value="PUSH">
            Push Notification
          </option>
        </select>

        {/* Status */}

        <select
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
        >
          <option className="bg-[#0B1225]" value="">
            All Status
          </option>
          <option className="bg-[#0B1225]" value="DRAFT">
            Draft
          </option>
          <option className="bg-[#0B1225]" value="SCHEDULED">
            Scheduled
          </option>
          <option className="bg-[#0B1225]" value="ACTIVE">
            Active
          </option>
          <option className="bg-[#0B1225]" value="COMPLETED">
            Completed
          </option>
          <option className="bg-[#0B1225]" value="PAUSED">
            Paused
          </option>
        </select>

        {/* Audience */}

        <select
          value={filters.audience}
          onChange={(e) => updateFilter("audience", e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-indigo-400"
        >
          <option className="bg-[#0B1225]" value="">
            Audience Segment
          </option>
          <option className="bg-[#0B1225]" value="ALL">
            All Customers
          </option>
          <option className="bg-[#0B1225]" value="VIP">
            VIP Customers
          </option>
          <option className="bg-[#0B1225]" value="LOYAL">
            Loyal Customers
          </option>
          <option className="bg-[#0B1225]" value="NEW">
            New Customers
          </option>
          <option className="bg-[#0B1225]" value="INACTIVE">
            Inactive Customers
          </option>
        </select>

        {/* Start Date */}

        <div className="relative">
          <FaCalendarAlt className="absolute left-4 top-4 text-white/40" />

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => updateFilter("startDate", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 text-white outline-none focus:border-indigo-400 [color-scheme:dark]"
          />
        </div>

        {/* End Date */}

        <div className="relative">
          <FaCalendarAlt className="absolute left-4 top-4 text-white/40" />

          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => updateFilter("endDate", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 text-white outline-none focus:border-indigo-400 [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Actions */}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10"
        >
          <FaUndo />
          Reset
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 px-5 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-pink-500"
        >
          <FaDownload />
          Export Campaigns
        </button>
      </div>
    </div>
  );
}
