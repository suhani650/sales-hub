import { useState } from "react";
import {
  FaUsers,
  FaBullseye,
  FaCrown,
  FaRobot,
  FaChartPie,
  FaSyncAlt,
  FaPlus,
  FaTrash,
  FaTimes,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import {
  useGetAudienceOverviewQuery,
  usePreviewAudienceSegmentMutation,
  useCreateAudienceSegmentMutation,
  useDeleteAudienceSegmentMutation,
} from "../../../services/vendorApi";

const formatINR = (value) => {
  const n = Number(value || 0);
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)} L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
};

const formatCount = (value) => {
  const n = Number(value || 0);
  if (n >= 1_00_000) return `${(n / 1_00_000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
};

const CRITERIA_TYPES = [
  { value: "PURCHASE_FREQUENCY", label: "Purchase Frequency" },
  { value: "REVENUE_RANGE", label: "Revenue Range" },
  { value: "LOYALTY_TIER", label: "Loyalty Tier" },
];

const REVENUE_RANGES = [
  { value: "0-5000", label: "₹0 – ₹5,000" },
  { value: "5001-20000", label: "₹5,001 – ₹20,000" },
  { value: "20001-50000", label: "₹20,001 – ₹50,000" },
  { value: "50001+", label: "₹50,001+" },
];

const LOYALTY_TIERS = ["BRONZE", "SILVER", "GOLD", "VIP"];

const emptyForm = {
  name: "",
  description: "",
  criteriaType: "PURCHASE_FREQUENCY",
  criteriaValue: "",
};

export default function AudienceSegmentation() {
  const { data, isLoading, isError } = useGetAudienceOverviewQuery();
  const [previewSegment, { data: preview, isLoading: previewing }] =
    usePreviewAudienceSegmentMutation();
  const [createSegment, { isLoading: creating }] =
    useCreateAudienceSegmentMutation();
  const [deleteSegment] = useDeleteAudienceSegmentMutation();

  const [showBuilder, setShowBuilder] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const stats = data?.stats;
  const segments = data?.segments ?? [];
  const analytics = data?.analytics;
  const insights = data?.insights;

  const updateField = (key, value) => {
    setForm((f) => ({
      ...f,
      [key]: value,
      ...(key === "criteriaType" ? { criteriaValue: "" } : {}),
    }));
  };

  const handlePreview = async () => {
    setFormError("");
    if (!form.criteriaValue) {
      setFormError("Choose a filter value to preview the segment.");
      return;
    }
    try {
      await previewSegment({
        criteriaType: form.criteriaType,
        criteriaValue: form.criteriaValue,
      }).unwrap();
    } catch {
      setFormError("Couldn't preview this segment.");
    }
  };

  const handleSave = async () => {
    setFormError("");
    if (!form.name.trim() || !form.criteriaValue) {
      setFormError("Segment name and a filter value are required.");
      return;
    }
    try {
      await createSegment({
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        criteriaType: form.criteriaType,
        criteriaValue: form.criteriaValue,
      }).unwrap();
      setForm(emptyForm);
      setShowBuilder(false);
    } catch (err) {
      setFormError(err?.data?.message || "Couldn't create this segment.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this custom segment?")) return;
    try {
      await deleteSegment(id).unwrap();
    } catch {
      alert("Couldn't delete this segment.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Audience Segmentation Center
            </h2>
            <p className="text-slate-400 mt-2">
              Live customer intelligence, built from your real orders and carts.
            </p>
          </div>

          <button
            onClick={() => setShowBuilder(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 duration-300"
          >
            <FaPlus />
            Create Segment
          </button>
        </div>
      </div>

      {isError ? (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-10 text-center text-red-400">
          Couldn't load audience segmentation data.
        </div>
      ) : (
        <>
          {/* KPI */}
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
            <StatCard
              title="Active Segments"
              value={isLoading ? "—" : stats?.activeSegments}
              icon={<FaUsers />}
            />
            <StatCard
              title="Auto Segments"
              value={isLoading ? "—" : stats?.autoSegments}
              icon={<FaSyncAlt />}
            />
            <StatCard
              title="Target Groups"
              value={isLoading ? "—" : stats?.targetGroups}
              icon={<FaBullseye />}
            />
            <StatCard
              title="Custom Segments"
              value={isLoading ? "—" : stats?.customSegments}
              icon={<FaCrown />}
            />
          </div>

          {/* Segment Table */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="font-bold text-xl text-white">
                Customer Segments
              </h3>
            </div>

            {isLoading ? (
              <div className="p-10 text-center text-slate-400">
                Loading segments…
              </div>
            ) : segments.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                No segments yet — create one above.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-[#111827]">
                  <tr className="text-slate-400 text-sm">
                    <th className="p-4 text-left">Segment</th>
                    <th className="p-4 text-left">Customers</th>
                    <th className="p-4 text-left">Revenue</th>
                    <th className="p-4 text-left">Growth</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {segments.map((segment) => (
                    <tr key={segment.id} className="border-t border-white/10">
                      <td className="p-4 font-medium text-white">
                        {segment.name}
                      </td>
                      <td className="p-4 text-slate-300">
                        {formatCount(segment.customers)}
                      </td>
                      <td className="p-4 text-emerald-400 font-semibold">
                        {formatINR(segment.revenue)}
                      </td>
                      <td className="p-4">
                        <GrowthBadge value={segment.growth} />
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            segment.type === "auto"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {segment.type === "auto" ? "Auto" : "Custom"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {segment.type === "custom" ? (
                          <button
                            onClick={() => handleDelete(segment.id)}
                            title="Delete segment"
                            className="w-9 h-9 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition inline-flex items-center justify-center"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        ) : (
                          <span className="text-slate-600 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Segment Analytics */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <div className="flex items-center gap-3 mb-5">
              <FaChartPie className="text-purple-400 text-2xl" />
              <h3 className="font-bold text-xl text-white">
                Segment Analytics
              </h3>
            </div>

            <div className="grid md:grid-cols-4 gap-5">
              <AnalyticsCard
                title="Reach"
                value={isLoading ? "—" : formatCount(analytics?.reach)}
              />
              <AnalyticsCard
                title="Conversions"
                value={isLoading ? "—" : formatCount(analytics?.conversions)}
              />
              <AnalyticsCard
                title="Retention"
                value={isLoading ? "—" : `${analytics?.retentionRate ?? 0}%`}
              />
              <AnalyticsCard
                title="LTV"
                value={isLoading ? "—" : formatINR(analytics?.ltv)}
              />
            </div>
          </div>

          {/* Insights */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <div className="flex items-center gap-3 mb-5">
              <FaRobot className="text-blue-400 text-2xl" />
              <h3 className="font-bold text-xl text-white">Segment Insights</h3>
            </div>

            <div className="grid md:grid-cols-4 gap-5">
              <InsightCard
                title="Top Segment"
                value={insights?.topSegment?.name || "—"}
                sub={
                  insights?.topSegment
                    ? formatINR(insights.topSegment.revenue)
                    : ""
                }
              />
              <InsightCard
                title="Fastest Growing"
                value={insights?.fastestGrowing?.name || "—"}
                sub={
                  insights?.fastestGrowing
                    ? `+${insights.fastestGrowing.growth}%`
                    : ""
                }
              />
              <InsightCard
                title="Revenue at Risk"
                value={formatINR(insights?.revenueAtRisk)}
                sub="Abandoned carts"
              />
              <InsightCard
                title="Retention Rate"
                value={`${insights?.retentionRate ?? 0}%`}
                sub="Repeat customers"
              />
            </div>
          </div>
        </>
      )}

      {/* Segment Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-white">
                Dynamic Segment Builder
              </h3>
              <button
                onClick={() => {
                  setShowBuilder(false);
                  setForm(emptyForm);
                  setFormError("");
                }}
                className="w-9 h-9 rounded-lg bg-white/5 text-slate-400 hover:text-white inline-flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Segment Name (e.g. Big Spenders)"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500 md:col-span-2"
              />

              <textarea
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={2}
                className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500 md:col-span-2"
              />

              <select
                value={form.criteriaType}
                onChange={(e) => updateField("criteriaType", e.target.value)}
                className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500"
              >
                {CRITERIA_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>

              {form.criteriaType === "PURCHASE_FREQUENCY" && (
                <input
                  type="number"
                  min="1"
                  placeholder="Minimum orders (e.g. 3)"
                  value={form.criteriaValue}
                  onChange={(e) => updateField("criteriaValue", e.target.value)}
                  className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500"
                />
              )}

              {form.criteriaType === "REVENUE_RANGE" && (
                <select
                  value={form.criteriaValue}
                  onChange={(e) => updateField("criteriaValue", e.target.value)}
                  className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="">Select a revenue range</option>
                  {REVENUE_RANGES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              )}

              {form.criteriaType === "LOYALTY_TIER" && (
                <select
                  value={form.criteriaValue}
                  onChange={(e) => updateField("criteriaValue", e.target.value)}
                  className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="">Select a loyalty tier</option>
                  {LOYALTY_TIERS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {formError && (
              <p className="text-red-400 text-sm mt-3">{formError}</p>
            )}

            {preview && !formError && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-[#111827] rounded-xl p-4 text-center">
                  <p className="text-slate-400 text-sm">Matching Customers</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {formatCount(preview.customers)}
                  </p>
                </div>
                <div className="bg-[#111827] rounded-xl p-4 text-center">
                  <p className="text-slate-400 text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">
                    {formatINR(preview.revenue)}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handlePreview}
                disabled={previewing}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-700 text-white font-semibold hover:bg-white/5 transition disabled:opacity-50"
              >
                <FaBullseye />
                {previewing ? "Previewing…" : "Preview Segment"}
              </button>
              <button
                onClick={handleSave}
                disabled={creating}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 duration-300 disabled:opacity-50"
              >
                <FaPlus />
                {creating ? "Saving…" : "Save Segment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GrowthBadge({ value }) {
  const n = Number(value || 0);
  const positive = n >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${
        positive ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {positive ? (
        <FaArrowUp className="text-xs" />
      ) : (
        <FaArrowDown className="text-xs" />
      )}
      {Math.abs(n)}%
    </span>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
      <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
        {icon}
      </div>
      <p className="text-slate-400 mt-4">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
    </div>
  );
}

function AnalyticsCard({ title, value }) {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-xl p-5 text-center">
      <h4 className="font-semibold text-slate-400">{title}</h4>
      <p className="text-2xl font-bold text-emerald-400 mt-3">{value}</p>
    </div>
  );
}

function InsightCard({ title, value, sub }) {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-xl p-5">
      <h4 className="font-semibold text-slate-400">{title}</h4>
      <p className="text-xl font-bold text-blue-400 mt-3 truncate">{value}</p>
      {sub && <p className="text-slate-500 text-sm mt-1">{sub}</p>}
    </div>
  );
}
