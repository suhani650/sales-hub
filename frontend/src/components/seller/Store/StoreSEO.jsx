import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaMobileAlt,
  FaDesktop,
  FaSave,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";

import {
  useGetSellerProfileQuery,
  useUpdateSEOMutation,
} from "../../../services/vendorApi";

/* ===========================================================
   SEO settings are stored as JSON on the vendor record (same
   pattern as socialLinks / policies) and saved for real through
   PUT /seller/profile/seo.

   The original mockup's "Indexed Pages", "Organic Traffic" and
   "Keywords Ranking" tiles need a search-console / analytics
   integration this project doesn't have, so — same as elsewhere
   in this codebase — they've been replaced with numbers that are
   actually derivable from the saved fields (title/description
   length, keyword count, checklist completeness) instead of
   invented traffic figures.
=========================================================== */

const DEFAULT_SEO = {
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  canonicalUrl: "",
  robots: "index,follow",
  sitemap: true,
};

export default function StoreSEO() {
  const [seo, setSeo] = useState(DEFAULT_SEO);
  const [saveState, setSaveState] = useState("idle"); // idle | saved | error

  const { data: vendor, isLoading: vendorLoading } = useGetSellerProfileQuery();
  const [updateSEO, { isLoading: isSaving }] = useUpdateSEOMutation();

  useEffect(() => {
    if (vendor?.seo) {
      setSeo((prev) => ({ ...DEFAULT_SEO, ...vendor.seo }));
    } else if (vendor && !vendor.seo) {
      // Nothing saved yet — seed sensible defaults from the store profile
      // instead of leaving fields blank.
      setSeo((prev) => ({
        ...prev,
        metaTitle:
          prev.metaTitle ||
          `${vendor.storeName || "Your Store"} | Official Store`,
        metaDescription: prev.metaDescription || vendor.description || "",
        canonicalUrl: prev.canonicalUrl || vendor.website || "",
      }));
    }
  }, [vendor]);

  const updateField = (field, value) => {
    setSaveState("idle");
    setSeo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSave() {
    try {
      await updateSEO({ seo }).unwrap();
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (error) {
      console.error("Save SEO failed:", error);
      setSaveState("error");
    }
  }

  const keywordCount = useMemo(
    () =>
      seo.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean).length,
    [seo.keywords],
  );

  const checklist = useMemo(
    () => [
      { text: "Meta Title Configured", done: Boolean(seo.metaTitle?.trim()) },
      {
        text: "Meta Description Added",
        done: Boolean(seo.metaDescription?.trim()),
      },
      { text: "Keywords Optimized", done: keywordCount >= 3 },
      { text: "Canonical URL Set", done: Boolean(seo.canonicalUrl?.trim()) },
      { text: "Robots Meta Active", done: Boolean(seo.robots) },
      { text: "Sitemap Enabled", done: Boolean(seo.sitemap) },
    ],
    [seo, keywordCount],
  );

  const seoScore = Math.round(
    (checklist.filter((c) => c.done).length / checklist.length) * 100,
  );

  const isLoading = vendorLoading;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">SEO Management</h2>

          <p className="text-white/60 mt-2">Optimize your store visibility</p>
        </div>

        <div className="flex items-center gap-3">
          {saveState === "saved" && (
            <span className="flex items-center gap-2 text-sm text-emerald-400">
              <FaCheckCircle /> Saved
            </span>
          )}
          {saveState === "error" && (
            <span className="text-sm text-red-400">Save failed, try again</span>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-3 flex items-center gap-2 font-semibold transition hover:from-pink-600 hover:to-purple-700 disabled:opacity-60"
          >
            {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            Save SEO
          </button>
        </div>
      </div>

      {/* SEO Score */}

      <div className="grid lg:grid-cols-4 gap-5">
        <ScoreCard title="SEO Score" value={`${seoScore}/100`} />

        <ScoreCard
          title="Meta Title Length"
          value={`${seo.metaTitle.length} chars`}
          hint="Ideal: 50–60"
        />

        <ScoreCard
          title="Description Length"
          value={`${seo.metaDescription.length} chars`}
          hint="Ideal: 150–160"
        />

        <ScoreCard title="Keywords" value={keywordCount} />
      </div>

      {/* SEO Settings */}

      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
      >
        <h3 className="text-xl font-bold mb-6 text-white">SEO Settings</h3>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-xl bg-white/10"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="font-medium block mb-2 text-white/80">
                Meta Title
              </label>

              <input
                value={seo.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none focus:border-pink-500/50"
              />
            </div>

            <div>
              <label className="font-medium block mb-2 text-white/80">
                Meta Description
              </label>

              <textarea
                rows="4"
                value={seo.metaDescription}
                onChange={(e) => updateField("metaDescription", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none focus:border-pink-500/50"
              />
            </div>

            <div>
              <label className="font-medium block mb-2 text-white/80">
                Keywords
              </label>

              <textarea
                rows="3"
                value={seo.keywords}
                onChange={(e) => updateField("keywords", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none focus:border-pink-500/50"
              />
            </div>

            <div>
              <label className="font-medium block mb-2 text-white/80">
                Canonical URL
              </label>

              <input
                value={seo.canonicalUrl}
                onChange={(e) => updateField("canonicalUrl", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none focus:border-pink-500/50"
              />
            </div>

            <div>
              <label className="font-medium block mb-2 text-white/80">
                Robots Meta
              </label>

              <select
                value={seo.robots}
                onChange={(e) => updateField("robots", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none focus:border-pink-500/50"
              >
                <option className="bg-[#0B1225]">index,follow</option>
                <option className="bg-[#0B1225]">noindex,nofollow</option>
                <option className="bg-[#0B1225]">index,nofollow</option>
                <option className="bg-[#0B1225]">noindex,follow</option>
              </select>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4">
              <div>
                <h4 className="font-semibold text-white">Sitemap.xml</h4>

                <p className="text-white/50 text-sm">
                  Enable automatic sitemap generation
                </p>
              </div>

              <input
                type="checkbox"
                checked={seo.sitemap}
                onChange={(e) => updateField("sitemap", e.target.checked)}
                className="h-5 w-5 accent-pink-500"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* SERP Preview */}

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <div className="flex items-center gap-3 mb-5 text-white">
            <FaDesktop />
            <h3 className="font-bold text-lg">Google Search Preview</h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-white p-5">
            <h4 className="text-blue-700 text-xl font-medium">
              {seo.metaTitle || "Your store's meta title"}
            </h4>

            <p className="text-green-700 text-sm mt-1">
              {seo.canonicalUrl || "https://yourstore.com"}
            </p>

            <p className="text-gray-600 mt-3">
              {seo.metaDescription ||
                "Your store's meta description will appear here."}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <div className="flex items-center gap-3 mb-5 text-white">
            <FaMobileAlt />
            <h3 className="font-bold text-lg">Mobile SERP Preview</h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-white p-5 max-w-sm">
            <h4 className="text-blue-700 text-lg font-medium">
              {seo.metaTitle || "Your store's meta title"}
            </h4>

            <p className="text-green-700 text-xs mt-1">
              {seo.canonicalUrl || "https://yourstore.com"}
            </p>

            <p className="text-gray-600 text-sm mt-2">
              {seo.metaDescription ||
                "Your store's meta description will appear here."}
            </p>
          </div>
        </motion.div>
      </div>

      {/* SEO Checklist */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h3 className="font-bold text-xl mb-5 text-white">
          SEO Health Checklist
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {checklist.map((item) => (
            <ChecklistItem key={item.text} text={item.text} done={item.done} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ title, value, hint }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xl text-white mb-3">
        <FaChartLine />
      </div>

      <p className="text-white/60">{title}</p>

      <h3 className="text-3xl font-black mt-2 text-white">{value}</h3>

      {hint && <p className="text-white/30 text-xs mt-1">{hint}</p>}
    </motion.div>
  );
}

function ChecklistItem({ text, done }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
      {done ? (
        <FaCheckCircle className="text-emerald-400" />
      ) : (
        <FaTimesCircle className="text-white/25" />
      )}
      <span className={done ? "text-white" : "text-white/40"}>{text}</span>
    </div>
  );
}
