import { useState } from "react";

import {
  FaPlay,
  FaPause,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaSms,
  FaGift,
  FaBell,
} from "react-icons/fa";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CampaignTable({
  campaigns = [],
  loading = false,
  onStart,
  onPause,
  onEdit,
  onDelete,
}) {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selected.length === campaigns.length) {
      setSelected([]);
    } else {
      setSelected(campaigns.map((item) => item.id));
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <h2 className="text-xl font-bold text-white">Campaigns</h2>

        <span className="text-sm text-white/50">
          {selected.length} Selected
        </span>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-white">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={
                    campaigns.length > 0 && selected.length === campaigns.length
                  }
                  onChange={toggleAll}
                />
              </th>

              <th className="p-4 text-left">Campaign</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Audience</th>
              <th className="p-4 text-left">Sent / Opens / Clicks</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-white/40">
                  Loading campaigns…
                </td>
              </tr>
            )}

            {!loading && campaigns.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-white/40">
                  No campaigns yet. Create one to get started.
                </td>
              </tr>
            )}

            {!loading &&
              campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(campaign.id)}
                      onChange={() => toggleSelect(campaign.id)}
                    />
                  </td>

                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{campaign.name}</p>
                      <p className="text-xs text-white/40">{campaign.id}</p>
                    </div>
                  </td>

                  <td className="p-4">
                    <CampaignType type={campaign.campaignType} />
                  </td>

                  <td className="p-4 font-medium">{campaign.audienceType}</td>

                  <td className="p-4 text-white/70">
                    {campaign.sentCount ?? 0} / {campaign.openCount ?? 0} /{" "}
                    {campaign.clickCount ?? 0}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={campaign.status} />
                  </td>

                  <td className="p-4 text-white/70">
                    {formatDate(campaign.createdAt)}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {campaign.status === "ACTIVE" ? (
                        <button
                          onClick={() => onPause?.(campaign)}
                          title="Pause"
                          className="rounded-lg bg-yellow-500/20 p-2 text-yellow-400 transition hover:bg-yellow-500/30"
                        >
                          <FaPause />
                        </button>
                      ) : (
                        <button
                          onClick={() => onStart?.(campaign)}
                          title="Activate"
                          className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400 transition hover:bg-emerald-500/30"
                        >
                          <FaPlay />
                        </button>
                      )}

                      <button
                        onClick={() => onEdit?.(campaign)}
                        title="Edit"
                        className="rounded-lg bg-blue-500/20 p-2 text-blue-400 transition hover:bg-blue-500/30"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => onDelete?.(campaign)}
                        title="Delete"
                        className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500/30"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-white/10 p-5">
        <p className="text-sm text-white/50">
          Showing {campaigns.length} of {campaigns.length} campaigns
        </p>
      </div>
    </div>
  );
}

function CampaignType({ type }) {
  const types = {
    EMAIL: {
      icon: <FaEnvelope />,
      color: "bg-blue-500/20 text-blue-400",
    },
    SMS: {
      icon: <FaSms />,
      color: "bg-green-500/20 text-green-400",
    },
    COUPON: {
      icon: <FaGift />,
      color: "bg-pink-500/20 text-pink-400",
    },
    PUSH: {
      icon: <FaBell />,
      color: "bg-orange-500/20 text-orange-400",
    },
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${types[type]?.color || "bg-white/10 text-white/60"}`}
    >
      {types[type]?.icon}
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const colors = {
    DRAFT: "bg-white/10 text-white/60",
    SCHEDULED: "bg-blue-500/20 text-blue-400",
    ACTIVE: "bg-emerald-500/20 text-emerald-400",
    COMPLETED: "bg-purple-500/20 text-purple-400",
    PAUSED: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status] || "bg-white/10 text-white/60"}`}
    >
      {status}
    </span>
  );
}
