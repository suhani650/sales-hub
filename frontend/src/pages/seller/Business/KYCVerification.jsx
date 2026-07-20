import { useState, useEffect } from "react";
import {
  FaIdCard,
  FaBuilding,
  FaFileUpload,
  FaCheckCircle,
  FaTrash,
  FaEye,
  FaShieldAlt,
  FaSave,
  FaPaperPlane,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

import { api } from "../../../lib/api.js";

const DOC_FIELDS = {
  pan: "pan",
  aadhaar: "aadhaar",
  gst: "gst",
  license: "businessLicense",
};

const STATUS_STYLE = {
  NOT_SUBMITTED: "text-slate-400",
  PENDING: "text-cyan-400",
  APPROVED: "text-green-400",
  VERIFIED: "text-green-400",
  REJECTED: "text-red-400",
};

function formatStatus(status) {
  if (!status) return "Not Submitted";
  return status
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

export default function KYCVerification() {
  // Newly chosen files, waiting to be uploaded
  const [panFile, setPanFile] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);

  // Already-saved document URLs, loaded from the backend
  const [savedDocs, setSavedDocs] = useState({
    pan: null,
    aadhaar: null,
    gst: null,
    license: null,
  });

  const [status, setStatus] = useState("NOT_SUBMITTED");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [banner, setBanner] = useState({ type: "", message: "" });

  // ---------- Load real KYC status + already-uploaded documents ----------
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await api.get("/seller/profile");
        const vendor = res?.data?.data ?? res?.data;
        if (cancelled || !vendor) return;

        setStatus(vendor.kycStatus || "NOT_SUBMITTED");
        setSavedDocs({
          pan: vendor.pan || null,
          aadhaar: vendor.aadhaar || null,
          gst: vendor.gst || null,
          license: vendor.businessLicense || null,
        });
      } catch (err) {
        if (!cancelled) {
          setBanner({
            type: "error",
            message: "Couldn't load your KYC status. Please refresh.",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Uploads any document that's still a local File object and returns a
  // plain URL, so both Save Draft and Submit can persist real files.
  const uploadDoc = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    const res = await api.post("/seller/uploads/single", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res?.data?.url || res?.data?.data?.url || null;
  };

  const saveDraft = async () => {
    setSavingDraft(true);
    setBanner({ type: "", message: "" });

    try {
      // No dedicated draft record exists on the backend yet, so a draft
      // save uploads any selected documents (so they aren't lost) without
      // submitting the KYC application itself.
      await Promise.all([
        uploadDoc(panFile),
        uploadDoc(aadhaarFile),
        uploadDoc(gstFile),
        uploadDoc(licenseFile),
      ]);

      setBanner({
        type: "success",
        message: "Documents saved. Submit when you're ready for review.",
      });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Could not save draft. Please try again.",
      });
    } finally {
      setSavingDraft(false);
    }
  };

  const submitKYC = async () => {
    setSubmitting(true);
    setBanner({ type: "", message: "" });

    try {
      const [panUrl, aadhaarUrl, gstUrl, licenseUrl] = await Promise.all([
        uploadDoc(panFile),
        uploadDoc(aadhaarFile),
        uploadDoc(gstFile),
        uploadDoc(licenseFile),
      ]);

      const payload = {
        // Keep whatever was already saved if nothing new was chosen this time
        pan: panUrl || savedDocs.pan || undefined,
        aadhaar: aadhaarUrl || savedDocs.aadhaar || undefined,
        gst: gstUrl || savedDocs.gst || undefined,
        businessLicense: licenseUrl || savedDocs.license || undefined,
      };

      const { data } = await api.post("/seller/profile/kyc", payload);
      const vendor = data?.data ?? data;

      setStatus(vendor?.kycStatus || "PENDING");
      setSavedDocs({
        pan: vendor?.pan || savedDocs.pan,
        aadhaar: vendor?.aadhaar || savedDocs.aadhaar,
        gst: vendor?.gst || savedDocs.gst,
        license: vendor?.businessLicense || savedDocs.license,
      });
      setPanFile(null);
      setAadhaarFile(null);
      setGstFile(null);
      setLicenseFile(null);

      setBanner({
        type: "success",
        message: "KYC documents submitted for verification.",
      });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Could not submit KYC. Please check your documents and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const removeLocalFile = (type) => {
    if (type === "pan") setPanFile(null);
    if (type === "aadhaar") setAadhaarFile(null);
    if (type === "gst") setGstFile(null);
    if (type === "license") setLicenseFile(null);
  };

  // Clears a document that's already saved on the server (sets it to null
  // via the same KYC endpoint, which also flips status back to PENDING
  // since the submitted document set just changed).
  const removeSavedDoc = async (type) => {
    setBanner({ type: "", message: "" });
    try {
      const field = DOC_FIELDS[type];
      const { data } = await api.post("/seller/profile/kyc", {
        pan: savedDocs.pan,
        aadhaar: savedDocs.aadhaar,
        gst: savedDocs.gst,
        businessLicense: savedDocs.license,
        [field]: null,
      });
      const vendor = data?.data ?? data;
      setStatus(vendor?.kycStatus || status);
      setSavedDocs((prev) => ({ ...prev, [type]: null }));
    } catch (err) {
      setBanner({
        type: "error",
        message: "Couldn't remove document. Please try again.",
      });
    }
  };

  const previewLocalFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    window.open(url);
  };

  const previewSavedDoc = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ---------- Real completion % — counts local selections + already-saved docs ----------
  const slots = [
    { key: "pan", file: panFile, saved: savedDocs.pan },
    { key: "aadhaar", file: aadhaarFile, saved: savedDocs.aadhaar },
    { key: "gst", file: gstFile, saved: savedDocs.gst },
    { key: "license", file: licenseFile, saved: savedDocs.license },
  ];
  const completedCount = slots.filter((s) => s.file || s.saved).length;
  const completionPct = Math.round((completedCount / slots.length) * 100);

  return (
    <div className="space-y-8 text-white">
      {/* HERO SECTION */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#0B1023] via-[#111936] to-[#1A1F4B] p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7c3aed40,transparent_40%)]"></div>

        <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm font-semibold border border-pink-500/20">
              Business Verification Portal
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-5">
              KYC Verification Center
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl">
              Upload and verify business documents to unlock premium seller
              benefits, higher order limits, and faster settlements.
            </p>
          </div>

          <div className="min-w-[280px] rounded-3xl bg-[#0B1023] border border-cyan-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-cyan-400 text-xl" />
              <h3 className="font-semibold">Verification Status</h3>
            </div>

            {loading ? (
              <div className="h-9 w-32 rounded-lg bg-white/10 animate-pulse" />
            ) : (
              <h2
                className={`text-3xl font-bold ${STATUS_STYLE[status] || "text-cyan-400"}`}
              >
                {formatStatus(status)}
              </h2>
            )}

            <div className="w-full h-3 bg-slate-800 rounded-full mt-5">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>

            <p className="text-sm text-slate-400 mt-3">
              {completionPct}% Documents Completed
            </p>
          </div>
        </div>
      </div>

      {/* DOCUMENTS GRID */}

      <div className="grid xl:grid-cols-2 gap-6">
        <DocumentCard
          title="PAN Card"
          subtitle="Permanent Account Number"
          icon={<FaIdCard className="text-white text-2xl" />}
          iconBg="from-cyan-500 to-blue-500"
          accent="cyan"
          file={panFile}
          savedUrl={savedDocs.pan}
          onSelect={(f) => setPanFile(f)}
          onPreviewLocal={() => previewLocalFile(panFile)}
          onPreviewSaved={() => previewSavedDoc(savedDocs.pan)}
          onRemoveLocal={() => removeLocalFile("pan")}
          onRemoveSaved={() => removeSavedDoc("pan")}
        />

        <DocumentCard
          title="Aadhaar Card"
          subtitle="Government Identity Verification"
          icon={<FaIdCard className="text-white text-2xl" />}
          iconBg="from-green-500 to-emerald-500"
          accent="green"
          file={aadhaarFile}
          savedUrl={savedDocs.aadhaar}
          onSelect={(f) => setAadhaarFile(f)}
          onPreviewLocal={() => previewLocalFile(aadhaarFile)}
          onPreviewSaved={() => previewSavedDoc(savedDocs.aadhaar)}
          onRemoveLocal={() => removeLocalFile("aadhaar")}
          onRemoveSaved={() => removeSavedDoc("aadhaar")}
        />

        <DocumentCard
          title="GST Certificate"
          subtitle="Business Tax Registration"
          icon={<FaBuilding className="text-white text-2xl" />}
          iconBg="from-orange-500 to-yellow-500"
          accent="orange"
          file={gstFile}
          savedUrl={savedDocs.gst}
          onSelect={(f) => setGstFile(f)}
          onPreviewLocal={() => previewLocalFile(gstFile)}
          onPreviewSaved={() => previewSavedDoc(savedDocs.gst)}
          onRemoveLocal={() => removeLocalFile("gst")}
          onRemoveSaved={() => removeSavedDoc("gst")}
        />

        <DocumentCard
          title="Business License"
          subtitle="Legal Registration Document"
          icon={<FaBuilding className="text-white text-2xl" />}
          iconBg="from-purple-500 to-pink-500"
          accent="purple"
          file={licenseFile}
          savedUrl={savedDocs.license}
          onSelect={(f) => setLicenseFile(f)}
          onPreviewLocal={() => previewLocalFile(licenseFile)}
          onPreviewSaved={() => previewSavedDoc(savedDocs.license)}
          onRemoveLocal={() => removeLocalFile("license")}
          onRemoveSaved={() => removeSavedDoc("license")}
        />
      </div>

      {/* STATUS BANNER */}

      {banner.message && (
        <div
          className={`rounded-2xl border p-4 flex items-center gap-3 ${
            banner.type === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {banner.type === "success" ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationTriangle />
          )}
          {banner.message}
        </div>
      )}

      {/* ACTION BUTTONS */}

      <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-wrap justify-end gap-4">
        <button
          onClick={saveDraft}
          disabled={savingDraft || submitting || loading}
          className="px-7 py-3 rounded-2xl border border-white/10 hover:bg-white/10 duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {savingDraft ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {savingDraft ? "Saving..." : "Save Draft"}
        </button>

        <button
          onClick={submitKYC}
          disabled={submitting || savingDraft || loading}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:scale-105 duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaPaperPlane />
          )}
          {submitting ? "Submitting..." : "Submit KYC"}
        </button>
      </div>
    </div>
  );
}

function DocumentCard({
  title,
  subtitle,
  icon,
  iconBg,
  accent,
  file,
  savedUrl,
  onSelect,
  onPreviewLocal,
  onPreviewSaved,
  onRemoveLocal,
  onRemoveSaved,
}) {
  const borderHover = {
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.2)]",
    green:
      "hover:border-green-400/40 hover:shadow-[0_0_35px_rgba(34,197,94,0.25)]",
    orange:
      "hover:border-orange-400/40 hover:shadow-[0_0_35px_rgba(249,115,22,0.25)]",
    purple:
      "hover:border-purple-400/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
  }[accent];

  const dashHover = {
    cyan: "hover:border-cyan-500/50",
    green: "hover:border-green-400/50",
    orange: "hover:border-orange-400/50",
    purple: "hover:border-purple-400/50",
  }[accent];

  const iconTint = {
    cyan: "text-cyan-400",
    green: "text-green-400",
    orange: "text-orange-400",
    purple: "text-purple-400",
  }[accent];

  return (
    <div
      className={`group rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 transition-all duration-500 ${borderHover}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div
            className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${iconBg} flex items-center justify-center shadow-lg`}
          >
            {icon}
          </div>

          <div>
            <h3 className="font-bold text-xl">{title}</h3>
            <p className="text-slate-400 text-sm">{subtitle}</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
          Required
        </span>
      </div>

      {!file && (
        <label
          className={`cursor-pointer block border-2 border-dashed border-white/10 ${dashHover} rounded-2xl p-8 text-center transition-all duration-300`}
        >
          <input
            type="file"
            hidden
            onChange={(e) => onSelect(e.target.files[0])}
          />
          <FaFileUpload className={`mx-auto text-4xl ${iconTint} mb-4`} />
          <h4 className="font-semibold">
            {savedUrl ? `Replace ${title}` : `Upload ${title}`}
          </h4>
          <p className="text-slate-400 text-sm mt-2">
            PDF, JPG or PNG (Max 10MB)
          </p>
        </label>
      )}

      {/* Newly selected local file, not yet uploaded */}
      {file && (
        <div className="mt-5 bg-slate-900/60 rounded-2xl border border-white/10 p-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <p className="font-semibold text-white">{file.name}</p>
              <p className="text-yellow-400 text-sm flex items-center gap-2">
                Ready to upload
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onPreviewLocal}
                className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center hover:scale-110 transition-all"
              >
                <FaEye />
              </button>
              <button
                onClick={onRemoveLocal}
                className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:scale-110 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Already saved on the server */}
      {!file && savedUrl && (
        <div className="mt-5 bg-slate-900/60 rounded-2xl border border-white/10 p-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <p className="font-semibold text-white">Document on file</p>
              <p className="text-green-400 text-sm flex items-center gap-2">
                <FaCheckCircle />
                Saved
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onPreviewSaved}
                className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center hover:scale-110 transition-all"
              >
                <FaEye />
              </button>
              <button
                onClick={onRemoveSaved}
                className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:scale-110 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
