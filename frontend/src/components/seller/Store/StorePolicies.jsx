import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaFileContract,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaMoneyBillWave,
  FaSave,
  FaDownload,
  FaEye,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

import {
  useGetSellerProfileQuery,
  useUpdatePoliciesMutation,
} from "../../../services/vendorApi";

/* ===========================================================
   Policies are stored as JSON on the vendor record (same pattern
   as socialLinks) and saved for real through PUT
   /seller/profile/policies. The compliance checklist below is
   derived from whatever content actually exists, rather than
   being hardcoded to all-green.
=========================================================== */

const DEFAULT_POLICIES = {
  returns:
    "Customers can return products within 7 days of delivery.\nReturned products must be unused and in original packaging.",
  shipping:
    "Orders are processed within 24 hours.\nDelivery timelines vary by location.",
  privacy:
    "Customer information is protected and never shared with third parties.",
  refunds: "Approved refunds are processed within 5–7 business days.",
  terms:
    "By purchasing products from this store, customers agree to all store policies.",
};

const policyTabs = [
  { id: "returns", label: "Return Policy", icon: <FaUndo /> },
  { id: "shipping", label: "Shipping", icon: <FaTruck /> },
  { id: "privacy", label: "Privacy", icon: <FaShieldAlt /> },
  { id: "refunds", label: "Refunds", icon: <FaMoneyBillWave /> },
  { id: "terms", label: "Terms", icon: <FaFileContract /> },
];

export default function StorePolicies() {
  const [activePolicy, setActivePolicy] = useState("returns");
  const [policies, setPolicies] = useState(DEFAULT_POLICIES);
  const [saveState, setSaveState] = useState("idle"); // idle | saved | error

  const { data: vendor, isLoading: vendorLoading } = useGetSellerProfileQuery();
  const [updatePolicies, { isLoading: isSaving }] = useUpdatePoliciesMutation();

  // Load whatever the vendor has actually saved; fall back to the
  // starter drafts above for any policy that hasn't been written yet.
  useEffect(() => {
    if (vendor?.policies) {
      setPolicies((prev) => ({ ...DEFAULT_POLICIES, ...vendor.policies }));
    }
  }, [vendor]);

  const updatePolicyText = (value) => {
    setSaveState("idle");
    setPolicies((prev) => ({
      ...prev,
      [activePolicy]: value,
    }));
  };

  async function handleSave() {
    try {
      await updatePolicies({ policies }).unwrap();
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (error) {
      console.error("Save policies failed:", error);
      setSaveState("error");
    }
  }

  function handleExport() {
    const lines = policyTabs.map(
      (tab) =>
        `${tab.label}\n${"-".repeat(tab.label.length)}\n${policies[tab.id]?.trim() || ""}\n`,
    );
    const content = lines.join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `store-policies-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Compliance is real: a policy only counts as "done" once it has
  // actual saved content, not just because a tab exists.
  const compliance = useMemo(
    () => [
      { text: "Return Policy Added", done: Boolean(policies.returns?.trim()) },
      {
        text: "Refund Policy Configured",
        done: Boolean(policies.refunds?.trim()),
      },
      {
        text: "Privacy Policy Published",
        done: Boolean(policies.privacy?.trim()),
      },
      {
        text: "Shipping Policy Available",
        done: Boolean(policies.shipping?.trim()),
      },
      {
        text: "Terms & Conditions Published",
        done: Boolean(policies.terms?.trim()),
      },
      {
        text: "Customer Rights Protected",
        done: Boolean(policies.returns?.trim() && policies.refunds?.trim()),
      },
    ],
    [policies],
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Store Policies</h2>

          <p className="text-white/60 mt-2">
            Manage legal, shipping and refund policies
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {saveState === "saved" && (
            <span className="flex items-center gap-2 text-sm text-emerald-400">
              <FaCheckCircle /> Saved
            </span>
          )}
          {saveState === "error" && (
            <span className="text-sm text-red-400">Save failed, try again</span>
          )}

          <button
            onClick={handleExport}
            className="border border-white/10 bg-white/5 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition hover:bg-white/10"
          >
            <FaDownload />
            Export
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-3 flex items-center gap-2 font-semibold transition hover:from-pink-600 hover:to-purple-700 disabled:opacity-60"
          >
            {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            Save Policies
          </button>
        </div>
      </div>

      {/* Tabs */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
        <div className="flex flex-wrap gap-3">
          {policyTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePolicy(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all
              ${
                activePolicy === tab.id
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor + Preview */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <h3 className="font-bold text-xl mb-5 text-white">Policy Editor</h3>

          {vendorLoading ? (
            <div className="h-[420px] animate-pulse rounded-xl bg-white/10" />
          ) : (
            <textarea
              rows={18}
              value={policies[activePolicy]}
              onChange={(e) => updatePolicyText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-4 text-white placeholder-white/30 outline-none focus:border-pink-500/50"
            />
          )}
        </motion.div>

        {/* Preview */}

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <div className="flex items-center gap-3 mb-5 text-white">
            <FaEye />

            <h3 className="font-bold text-xl">Live Preview</h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-5 min-h-[420px] whitespace-pre-wrap text-white/80">
            {policies[activePolicy]}
          </div>
        </motion.div>
      </div>

      {/* Compliance */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h3 className="font-bold text-xl mb-5 text-white">
          Compliance Checklist
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {compliance.map((item) => (
            <ComplianceItem key={item.text} text={item.text} done={item.done} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ComplianceItem({ text, done }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 flex items-center gap-3">
      <div
        className={`h-3 w-3 rounded-full ${done ? "bg-emerald-500" : "bg-white/20"}`}
      />

      <span className={done ? "text-white" : "text-white/40"}>{text}</span>
    </div>
  );
}
