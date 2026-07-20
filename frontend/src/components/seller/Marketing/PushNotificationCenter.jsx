import { useMemo, useState } from "react";
import {
  FaBell,
  FaUsers,
  FaBolt,
  FaMousePointer,
  FaChartLine,
  FaPlus,
  FaMagic,
  FaPlay,
  FaPause,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";

import {
  useGetCampaignsQuery,
  useGetMarketingOverviewQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} from "../../../services/vendorApi";

const EMPTY_FORM = {
  name: "",
  audienceType: "ALL",
  scheduledAt: "",
  content: "",
};

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PushNotificationCenter() {
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: campaignsData, isLoading: campaignsLoading } =
    useGetCampaignsQuery();
  const { data: overview } = useGetMarketingOverviewQuery();

  const [createCampaign, { isLoading: creating }] = useCreateCampaignMutation();
  const [updateCampaign] = useUpdateCampaignMutation();
  const [deleteCampaign] = useDeleteCampaignMutation();

  const pushCampaigns = useMemo(
    () => (campaignsData || []).filter((c) => c.campaignType === "PUSH"),
    [campaignsData],
  );

  const pushChannel = overview?.channelStats?.find((c) => c.channel === "PUSH");

  const statusCounts = useMemo(() => {
    return pushCampaigns.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});
  }, [pushCampaigns]);

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleAIGenerate = () => {
    const title = form.name || "your customers";
    updateField(
      "content",
      `Hey! Don't miss out — ${title} deal is live now. Tap to explore before it's gone. 🔥`,
    );
  };

  const handleSchedulePush = async () => {
    if (!form.name.trim()) return;

    const scheduledAt = form.scheduledAt
      ? new Date(form.scheduledAt).toISOString()
      : null;

    const status =
      scheduledAt && new Date(scheduledAt) > new Date()
        ? "SCHEDULED"
        : "ACTIVE";

    try {
      await createCampaign({
        name: form.name,
        campaignType: "PUSH",
        audienceType: form.audienceType,
        content: form.content || form.name,
        scheduledAt,
        status,
      }).unwrap();

      setForm(EMPTY_FORM);
    } catch (err) {
      alert(err?.data?.message || "Could not schedule notification.");
    }
  };

  const handleToggleStatus = async (campaign) => {
    try {
      await updateCampaign({
        id: campaign.id,
        status: campaign.status === "ACTIVE" ? "PAUSED" : "ACTIVE",
      }).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not update notification.");
    }
  };

  const handleDelete = async (campaign) => {
    if (!window.confirm(`Delete notification "${campaign.name}"?`)) return;
    try {
      await deleteCampaign(campaign.id).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not delete notification.");
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Push Notification Center</h2>

            <p className="mt-2 text-white/60">
              Real-Time Customer Engagement & Push Automation Platform
            </p>
          </div>

          <a
            href="#push-builder"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 px-5 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-pink-500"
          >
            <FaPlus />
            Create Notification
          </a>
        </div>
      </div>

      {/* KPI */}

      <div className="grid gap-5 xl:grid-cols-4 md:grid-cols-2">
        <StatCard
          title="Push Campaigns"
          value={pushCampaigns.length}
          icon={<FaBell />}
        />
        <StatCard
          title="Reach (Sent)"
          value={(pushChannel?.sent ?? 0).toLocaleString("en-IN")}
          icon={<FaUsers />}
        />
        <StatCard
          title="CTR"
          value={`${pushChannel?.clickRate ?? 0}%`}
          icon={<FaMousePointer />}
        />
        <StatCard
          title="Open Rate"
          value={`${pushChannel?.openRate ?? 0}%`}
          icon={<FaChartLine />}
        />
      </div>

      {/* Notification Builder */}

      <div
        id="push-builder"
        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <h3 className="mb-5 text-xl font-bold">Push Notification Builder</h3>

        <div className="grid gap-5 lg:grid-cols-2">
          <input
            type="text"
            placeholder="Notification Title"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-white/30 outline-none focus:border-indigo-400"
          />

          <select
            value={form.audienceType}
            onChange={(e) => updateField("audienceType", e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-400"
          >
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

          <input
            type="datetime-local"
            value={form.scheduledAt}
            onChange={(e) => updateField("scheduledAt", e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-400 [color-scheme:dark]"
          />

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-3 text-white/50">
            Leave schedule empty to send immediately
          </div>
        </div>

        <textarea
          rows="5"
          placeholder="Write Notification Message..."
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-white/30 outline-none focus:border-indigo-400"
        />

        <div className="mt-5 flex gap-3">
          <button
            onClick={handleAIGenerate}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-500"
          >
            <FaMagic />
            AI Generate
          </button>

          <button
            onClick={handleSchedulePush}
            disabled={creating || !form.name.trim()}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {creating && <FaSpinner className="animate-spin" />}
            Schedule Push
          </button>
        </div>
      </div>

      {/* Notification Table */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="border-b border-white/10 p-5">
          <h3 className="text-xl font-bold">Notification Campaigns</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="p-4 text-left">Campaign</th>
                <th className="p-4 text-left">Audience</th>
                <th className="p-4 text-left">Sent / Opens / Clicks</th>
                <th className="p-4 text-left">Scheduled</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {campaignsLoading && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/40">
                    Loading notifications…
                  </td>
                </tr>
              )}

              {!campaignsLoading && pushCampaigns.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/40">
                    No push notifications yet. Build one above.
                  </td>
                </tr>
              )}

              {!campaignsLoading &&
                pushCampaigns.map((item) => (
                  <tr key={item.id} className="border-t border-white/5">
                    <td className="p-4">{item.name}</td>

                    <td className="p-4 text-white/70">{item.audienceType}</td>

                    <td className="p-4 text-white/70">
                      {item.sentCount ?? 0} / {item.openCount ?? 0} /{" "}
                      {item.clickCount ?? 0}
                    </td>

                    <td className="p-4 text-white/70">
                      {formatDate(item.scheduledAt)}
                    </td>

                    <td className="p-4">
                      <StatusBadge value={item.status} />
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          title={
                            item.status === "ACTIVE" ? "Pause" : "Activate"
                          }
                          className={`rounded-lg p-2 transition ${
                            item.status === "ACTIVE"
                              ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                              : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          }`}
                        >
                          {item.status === "ACTIVE" ? <FaPause /> : <FaPlay />}
                        </button>

                        <button
                          onClick={() => handleDelete(item)}
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
      </div>

      {/* Status Breakdown */}

      <div className="grid gap-5 md:grid-cols-4">
        <AnalyticsCard
          title="Active"
          value={statusCounts.ACTIVE || 0}
          icon={<FaBolt />}
        />
        <AnalyticsCard
          title="Scheduled"
          value={statusCounts.SCHEDULED || 0}
          icon={<FaBell />}
        />
        <AnalyticsCard
          title="Paused"
          value={statusCounts.PAUSED || 0}
          icon={<FaPause />}
        />
        <AnalyticsCard
          title="Completed"
          value={statusCounts.COMPLETED || 0}
          icon={<FaChartLine />}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-3xl text-indigo-400">{icon}</div>
      <p className="mt-3 text-white/60">{title}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </div>
  );
}

function AnalyticsCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
      <div className="flex justify-center text-3xl text-purple-400">{icon}</div>
      <h4 className="mt-4 font-bold">{title}</h4>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ value }) {
  const colors = {
    DRAFT: "bg-white/10 text-white/60",
    SCHEDULED: "bg-blue-500/20 text-blue-400",
    ACTIVE: "bg-emerald-500/20 text-emerald-400",
    COMPLETED: "bg-purple-500/20 text-purple-400",
    PAUSED: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        colors[value] || "bg-white/10 text-white/60"
      }`}
    >
      {value}
    </span>
  );
}
