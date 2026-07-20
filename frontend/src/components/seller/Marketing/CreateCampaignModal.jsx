import { useEffect, useState } from "react";
import {
  FaTimes,
  FaEnvelope,
  FaSms,
  FaGift,
  FaBell,
  FaPaperPlane,
  FaSave,
  FaSpinner,
} from "react-icons/fa";

const EMPTY_FORM = {
  name: "",
  campaignType: "EMAIL",
  audienceType: "ALL",
  subject: "",
  content: "",
  scheduledAt: "",
};

export default function CreateCampaignModal({
  open,
  onClose,
  onSaveDraft,
  onLaunch,
  editingCampaign = null,
  submitting = false,
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  // Load the campaign being edited (or reset to a blank form) whenever the
  // modal opens / the target campaign changes.
  useEffect(() => {
    if (!open) return;

    if (editingCampaign) {
      setForm({
        name: editingCampaign.name || "",
        campaignType: editingCampaign.campaignType || "EMAIL",
        audienceType: editingCampaign.audienceType || "ALL",
        subject: editingCampaign.subject || "",
        content: editingCampaign.content || "",
        scheduledAt: editingCampaign.scheduledAt
          ? editingCampaign.scheduledAt.slice(0, 16)
          : "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [open, editingCampaign]);

  if (!open) return null;

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const campaignIcons = {
    EMAIL: <FaEnvelope />,
    SMS: <FaSms />,
    COUPON: <FaGift />,
    PUSH: <FaBell />,
  };

  const buildPayload = (status) => ({
    ...form,
    scheduledAt: form.scheduledAt
      ? new Date(form.scheduledAt).toISOString()
      : null,
    status,
  });

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={submitting ? undefined : onClose}
      />

      {/* Modal */}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0B1225] text-white shadow-2xl">
          {/* Header */}

          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0B1225]/95 p-6 backdrop-blur-xl">
            <div>
              <h2 className="text-2xl font-bold">
                {editingCampaign ? "Edit Campaign" : "Create Campaign"}
              </h2>

              <p className="text-white/60">
                Build and launch marketing campaigns
              </p>
            </div>

            <button
              onClick={onClose}
              disabled={submitting}
              className="text-xl text-white/60 transition hover:text-white disabled:opacity-40"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}

          <div className="space-y-6 p-6">
            {/* Campaign Name */}

            <div>
              <label className="mb-2 block font-medium text-white/80">
                Campaign Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-white/30 outline-none focus:border-indigo-400"
                placeholder="Enter campaign name"
              />
            </div>

            {/* Campaign Type */}

            <div>
              <label className="mb-2 block font-medium text-white/80">
                Campaign Type
              </label>

              <div className="grid gap-4 md:grid-cols-4">
                {["EMAIL", "SMS", "COUPON", "PUSH"].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField("campaignType", type)}
                    className={`
                      flex flex-col items-center gap-3 rounded-2xl border p-4 transition
                      ${
                        form.campaignType === type
                          ? "border-indigo-400 bg-indigo-500/20"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }
                    `}
                  >
                    <div className="text-2xl text-indigo-300">
                      {campaignIcons[type]}
                    </div>

                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Audience */}

            <div>
              <label className="mb-2 block font-medium text-white/80">
                Audience Segment
              </label>

              <select
                value={form.audienceType}
                onChange={(e) => updateField("audienceType", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-400"
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
            </div>

            {/* Subject */}

            {form.campaignType !== "SMS" && (
              <div>
                <label className="mb-2 block font-medium text-white/80">
                  Subject / Title
                </label>

                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-white/30 outline-none focus:border-indigo-400"
                />
              </div>
            )}

            {/* Content */}

            <div>
              <label className="mb-2 block font-medium text-white/80">
                Campaign Content
              </label>

              <textarea
                rows="8"
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-white/30 outline-none focus:border-indigo-400"
                placeholder="Write campaign content..."
              />
            </div>

            {/* Schedule */}

            <div>
              <label className="mb-2 block font-medium text-white/80">
                Schedule Campaign
              </label>

              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => updateField("scheduledAt", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-400 [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Footer */}

          <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 p-6">
            <button
              onClick={() => onSaveDraft?.(buildPayload("DRAFT"))}
              disabled={submitting || !form.name}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? <FaSpinner className="animate-spin" /> : <FaSave />}
              Save Draft
            </button>

            <button
              onClick={() => onLaunch?.(buildPayload("ACTIVE"))}
              disabled={submitting || !form.name}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 px-5 py-3 font-semibold text-white transition hover:from-indigo-500 hover:to-pink-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
              {editingCampaign ? "Save & Launch" : "Launch Campaign"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
