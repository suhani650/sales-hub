import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCamera,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaSave,
  FaShieldAlt,
  FaPhoneAlt,
  FaGlobe,
  FaFileInvoice,
  FaUniversity,
  FaMapMarkerAlt,
  FaCity,
  FaIdCard,
  FaLink,
  FaCalendarAlt,
  FaStore,
  FaEdit,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaUpload,
  FaFileAlt,
  FaCheck,
  FaClock,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";

import { api } from "../../../lib/api.js";

/* -------------------------------------------------------------------- */
/*  Shared UI helpers — same visual language as the dashboard & profile */
/* -------------------------------------------------------------------- */

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wide mb-2">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-[#0B1225] border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed";

function Banner({ type, message }) {
  if (!message) return null;
  const isError = type === "error";
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 rounded-2xl px-5 py-4 mb-6 border ${
        isError
          ? "bg-red-500/10 border-red-500/30 text-red-300"
          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
      }`}
    >
      {isError ? <FaExclamationTriangle /> : <FaCheckCircle />}
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
}

function formatDate(d) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function SaveButton({ saving, label = "Save Changes" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type="submit"
      disabled={saving}
      className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow-lg transition-all disabled:opacity-60"
    >
      {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
      {saving ? "Saving…" : label}
    </motion.button>
  );
}

function SectionCard({ icon: Icon, iconColor, title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${iconColor}`}
        >
          <Icon size={22} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          {subtitle && <p className="text-white/50 text-sm mt-1">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

const TABS = [
  { key: "info", label: "Company Info", icon: FaBuilding },
  { key: "gst", label: "GST & Tax", icon: FaFileInvoice },
  { key: "bank", label: "Bank Details", icon: FaUniversity },
  { key: "address", label: "Address", icon: FaMapMarkerAlt },
  { key: "kyc", label: "KYC Documents", icon: FaIdCard },
  { key: "social", label: "Social Links", icon: FaLink },
];

/* -------------------------------------------------------------------- */
/*  Main Page                                                            */
/* -------------------------------------------------------------------- */

export default function CompanyProfile() {
  const logoInputRef = useRef(null);

  const [tab, setTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({ type: "", message: "" });
  const [vendor, setVendor] = useState(null);
  const [logo, setLogo] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [saving, setSaving] = useState({
    info: false,
    gst: false,
    bank: false,
    address: false,
    kyc: false,
    social: false,
  });

  const [info, setInfo] = useState({
    storeName: "",
    businessName: "",
    phone: "",
    description: "",
  });
  const [gst, setGst] = useState({ gstNumber: "", panNumber: "" });
  const [bank, setBank] = useState({
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });
  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [kyc, setKyc] = useState({ aadhaar: "", pan: "", gst: "" });
  const [social, setSocial] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    website: "",
  });

  /* ---------------------------- Load profile --------------------------- */

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const { data } = await api.get("/seller/profile");
        const v = data?.data ?? data;
        if (!mounted || !v) return;

        setVendor(v);
        setLogo(v.logo || "");

        setInfo({
          storeName: v.storeName || "",
          businessName: v.businessName || v.storeName || "",
          phone: v.phone || v.user?.phone || "",
          description: v.description || "",
        });
        setGst({ gstNumber: v.gstNumber || "", panNumber: v.panNumber || "" });
        setBank({
          accountHolder: v.accountHolder || "",
          accountNumber: v.accountNumber || "",
          ifscCode: v.ifscCode || "",
          bankName: v.bankName || "",
        });
        setAddress({
          address: v.address || "",
          city: v.city || "",
          state: v.state || "",
          pincode: v.pincode || "",
        });
        setKyc({
          aadhaar: v.aadhaar || "",
          pan: v.pan || "",
          gst: v.gst || v.gstNumber || "",
        });
        setSocial({
          facebook: v.socialLinks?.facebook || "",
          instagram: v.socialLinks?.instagram || "",
          twitter: v.socialLinks?.twitter || "",
          linkedin: v.socialLinks?.linkedin || "",
          youtube: v.socialLinks?.youtube || "",
          website: v.website || "",
        });
      } catch (err) {
        if (mounted) {
          setBanner({
            type: "error",
            message:
              err?.response?.data?.message ||
              "Couldn't reach the server to load your company profile.",
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const setBusy = (key, val) => setSaving((s) => ({ ...s, [key]: val }));

  /* ------------------------------ Handlers ------------------------------ */

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setBusy("info", true);
    setBanner({ type: "", message: "" });
    try {
      const { data } = await api.put("/seller/profile", info);
      const v = data?.data ?? data;
      if (v) setVendor((prev) => ({ ...prev, ...v }));
      setBanner({ type: "success", message: "Company information updated." });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to update company information.",
      });
    } finally {
      setBusy("info", false);
    }
  };

  const handleSaveGst = async (e) => {
    e.preventDefault();
    setBusy("gst", true);
    setBanner({ type: "", message: "" });
    try {
      const { data } = await api.put("/seller/profile/tax", gst);
      const v = data?.data ?? data;
      if (v) setVendor((prev) => ({ ...prev, ...v }));
      setBanner({ type: "success", message: "GST & tax details updated." });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message || "Failed to update GST & tax details.",
      });
    } finally {
      setBusy("gst", false);
    }
  };

  const handleSaveBank = async (e) => {
    e.preventDefault();
    setBusy("bank", true);
    setBanner({ type: "", message: "" });
    try {
      const { data } = await api.put("/seller/profile/bank", bank);
      const v = data?.data ?? data;
      if (v) setVendor((prev) => ({ ...prev, ...v }));
      setBanner({ type: "success", message: "Bank details updated." });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message || "Failed to update bank details.",
      });
    } finally {
      setBusy("bank", false);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setBusy("address", true);
    setBanner({ type: "", message: "" });
    try {
      const { data } = await api.put("/seller/profile", address);
      const v = data?.data ?? data;
      if (v) setVendor((prev) => ({ ...prev, ...v }));
      setBanner({ type: "success", message: "Address updated." });
    } catch (err) {
      setBanner({
        type: "error",
        message: err?.response?.data?.message || "Failed to update address.",
      });
    } finally {
      setBusy("address", false);
    }
  };

  const handleSubmitKyc = async (e) => {
    e.preventDefault();
    setBusy("kyc", true);
    setBanner({ type: "", message: "" });
    try {
      const { data } = await api.post("/seller/profile/kyc", kyc);
      const v = data?.data ?? data;
      if (v) setVendor((prev) => ({ ...prev, ...v }));
      setBanner({
        type: "success",
        message: "KYC documents submitted for verification.",
      });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message || "Failed to submit KYC documents.",
      });
    } finally {
      setBusy("kyc", false);
    }
  };

  const handleSaveSocial = async (e) => {
    e.preventDefault();
    setBusy("social", true);
    setBanner({ type: "", message: "" });
    try {
      await api.put("/seller/profile", {
        socialLinks: social,
        website: social.website,
      });
      setBanner({ type: "success", message: "Social links updated." });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message || "Failed to update social links.",
      });
    } finally {
      setBusy("social", false);
    }
  };

  /* ---------------------------- Logo upload ---------------------------- */

  const handleLogoClick = () => logoInputRef.current?.click();

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setLogo(previewUrl);
    setUploadingLogo(true);
    setBanner({ type: "", message: "" });

    try {
      const fd = new FormData();
      fd.append("image", file);

      const uploadRes = await api.post("/seller/uploads/single", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrl =
        uploadRes?.data?.url ||
        uploadRes?.data?.data?.url ||
        uploadRes?.data?.data?.path ||
        previewUrl;

      await api.put("/seller/profile/branding", { logo: uploadedUrl });

      setLogo(uploadedUrl);
      setBanner({ type: "success", message: "Company logo updated." });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message || "Couldn't upload logo right now.",
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleRemoveLogo = async () => {
    const previousLogo = logo;
    setLogo("");
    setUploadingLogo(true);
    setBanner({ type: "", message: "" });

    try {
      await api.put("/seller/profile/branding", { logo: null });
      setBanner({ type: "success", message: "Company logo removed." });
    } catch (err) {
      setLogo(previousLogo);
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message || "Couldn't remove the logo right now.",
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  /* ----------------------------- Derived data ---------------------------- */

  const status = vendor?.status || "PENDING";
  const kycStatus = vendor?.kycStatus || "NOT_SUBMITTED";

  const completionFields = [
    info.storeName,
    info.phone,
    address.address,
    address.city,
    address.state,
    address.pincode,
    gst.gstNumber,
    bank.accountNumber,
    logo,
  ];
  const filledCount = completionFields.filter(Boolean).length;
  const completionPct = Math.round(
    (filledCount / completionFields.length) * 100,
  );

  const statusStyles = {
    APPROVED: "bg-emerald-500/20 text-emerald-400",
    PENDING: "bg-yellow-500/20 text-yellow-400",
    REJECTED: "bg-red-500/20 text-red-400",
  };

  /* ------------------------------- Render -------------------------------- */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-pink-600/30 blur-[180px]" />
        <div className="absolute right-0 top-20 h-[480px] w-[480px] rounded-full bg-indigo-600/30 blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-cyan-600/20 blur-[180px]" />
      </div>

      <div className="relative z-10 space-y-6 p-4 lg:p-6">
        {/* ================= HERO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-pink-500/20 px-5 py-2 text-pink-300">
                <FaBuilding />
                Business Profile
              </div>

              <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-black">
                Company Profile 🏢
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-white/70">
                Manage your business identity, tax, bank, address and KYC
                details — everything buyers and Nexora see about your store.
              </p>
            </div>

            {/* Logo + identity card, styled like the revenue hero card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[1px]"
            >
              <div className="w-full lg:w-[360px] rounded-3xl bg-[#0B1225] p-8">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                      {logo ? (
                        <img
                          src={logo}
                          alt="Company logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaBuilding className="text-white/90" size={36} />
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleLogoClick}
                      disabled={uploadingLogo}
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-lg disabled:opacity-60"
                      title="Change logo"
                    >
                      {uploadingLogo ? (
                        <FaSpinner className="animate-spin" size={12} />
                      ) : (
                        <FaCamera size={12} />
                      )}
                    </button>

                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />

                    {logo && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        disabled={uploadingLogo}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-xl bg-red-500 flex items-center justify-center shadow-lg disabled:opacity-60"
                        title="Remove logo"
                      >
                        <FaTrash size={10} />
                      </button>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl font-black truncate">
                      {loading ? "Loading…" : info.storeName || "Your Store"}
                    </h2>
                    <p className="mt-1 text-sm text-white/60 truncate flex items-center gap-2">
                      <FaPhoneAlt className="text-pink-400 shrink-0" />{" "}
                      {info.phone || "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${
                      statusStyles[status] || statusStyles.PENDING
                    }`}
                  >
                    <FaShieldAlt />
                    {status}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-1.5 text-xs font-bold text-indigo-300">
                    <FaIdCard />
                    KYC: {kycStatus.replace("_", " ")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= QUICK INFO STRIP ================= */}
        <div className="grid gap-7 xl:grid-cols-4 md:grid-cols-2">
          {[
            {
              title: "Profile Completion",
              value: `${completionPct}%`,
              icon: FaCheck,
              color: "from-pink-500 to-red-500",
            },
            {
              title: "Verification Status",
              value: status,
              icon: FaShieldAlt,
              color: "from-indigo-500 to-blue-500",
            },
            {
              title: "KYC Status",
              value: kycStatus.replace("_", " "),
              icon: FaIdCard,
              color: "from-cyan-500 to-sky-500",
            },
            {
              title: "Registered Since",
              value: formatDate(vendor?.createdAt),
              icon: FaCalendarAlt,
              color: "from-orange-500 to-yellow-500",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -8, scale: 1.03 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}
                >
                  <Icon size={26} />
                </div>

                <p className="mt-8 text-white/60">{item.title}</p>
                <h2 className="mt-2 text-xl font-black truncate">
                  {item.value}
                </h2>
              </motion.div>
            );
          })}
        </div>

        <Banner type={banner.type} message={banner.message} />

        {/* ================= TABS ================= */}
        <div className="flex flex-wrap gap-3">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                  active
                    ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                    : "border border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <Icon /> {t.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-16 flex items-center justify-center gap-3 text-white/60">
            <FaSpinner className="animate-spin" size={20} /> Loading company
            profile…
          </div>
        ) : (
          <>
            {/* ================= COMPANY INFO ================= */}
            {tab === "info" && (
              <form onSubmit={handleSaveInfo}>
                <SectionCard
                  icon={FaBuilding}
                  iconColor="from-indigo-500 to-blue-500"
                  title="Company Information"
                  subtitle="Basic identity of your business."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Store Name" icon={<FaStore />}>
                      <input
                        className={inputClass}
                        value={info.storeName}
                        onChange={(e) =>
                          setInfo({ ...info, storeName: e.target.value })
                        }
                        placeholder="Your store name"
                      />
                    </Field>
                    <Field
                      label="Registered Business Name"
                      icon={<FaBuilding />}
                    >
                      <input
                        className={inputClass}
                        value={info.businessName}
                        onChange={(e) =>
                          setInfo({ ...info, businessName: e.target.value })
                        }
                        placeholder="Legal / registered business name"
                      />
                    </Field>
                    <Field label="Phone Number" icon={<FaPhoneAlt />}>
                      <input
                        className={inputClass}
                        value={info.phone}
                        onChange={(e) =>
                          setInfo({ ...info, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                      />
                    </Field>
                    <Field label="Website" icon={<FaGlobe />}>
                      <input
                        className={inputClass}
                        value={social.website}
                        onChange={(e) =>
                          setSocial({ ...social, website: e.target.value })
                        }
                        placeholder="https://yourstore.com"
                      />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Company Description" icon={<FaEdit />}>
                        <textarea
                          rows={4}
                          className={inputClass}
                          value={info.description}
                          onChange={(e) =>
                            setInfo({ ...info, description: e.target.value })
                          }
                          placeholder="Tell buyers about your business…"
                        />
                      </Field>
                    </div>
                  </div>
                  <div className="flex justify-end mt-8">
                    <SaveButton saving={saving.info} />
                  </div>
                </SectionCard>
              </form>
            )}

            {/* ================= GST & TAX ================= */}
            {tab === "gst" && (
              <form onSubmit={handleSaveGst}>
                <SectionCard
                  icon={FaFileInvoice}
                  iconColor="from-orange-500 to-yellow-500"
                  title="GST & Tax Details"
                  subtitle="Used for invoicing and tax compliance."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="GST Number" icon={<FaFileInvoice />}>
                      <input
                        className={inputClass}
                        value={gst.gstNumber}
                        onChange={(e) =>
                          setGst({ ...gst, gstNumber: e.target.value })
                        }
                        placeholder="22AAAAA0000A1Z5"
                      />
                    </Field>
                    <Field label="PAN Number" icon={<FaIdCard />}>
                      <input
                        className={inputClass}
                        value={gst.panNumber}
                        onChange={(e) =>
                          setGst({ ...gst, panNumber: e.target.value })
                        }
                        placeholder="ABCDE1234F"
                      />
                    </Field>
                  </div>
                  <div className="flex justify-end mt-8">
                    <SaveButton saving={saving.gst} />
                  </div>
                </SectionCard>
              </form>
            )}

            {/* ================= BANK DETAILS ================= */}
            {tab === "bank" && (
              <form onSubmit={handleSaveBank}>
                <SectionCard
                  icon={FaUniversity}
                  iconColor="from-cyan-500 to-sky-500"
                  title="Bank Details"
                  subtitle="Payouts and settlements are sent to this account."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Account Holder Name" icon={<FaIdCard />}>
                      <input
                        className={inputClass}
                        value={bank.accountHolder}
                        onChange={(e) =>
                          setBank({ ...bank, accountHolder: e.target.value })
                        }
                        placeholder="Name as per bank records"
                      />
                    </Field>
                    <Field label="Bank Name" icon={<FaUniversity />}>
                      <input
                        className={inputClass}
                        value={bank.bankName}
                        onChange={(e) =>
                          setBank({ ...bank, bankName: e.target.value })
                        }
                        placeholder="e.g. HDFC Bank"
                      />
                    </Field>
                    <Field label="Account Number" icon={<FaUniversity />}>
                      <input
                        className={inputClass}
                        value={bank.accountNumber}
                        onChange={(e) =>
                          setBank({ ...bank, accountNumber: e.target.value })
                        }
                        placeholder="XXXXXXXXXXXX"
                      />
                    </Field>
                    <Field label="IFSC Code" icon={<FaUniversity />}>
                      <input
                        className={inputClass}
                        value={bank.ifscCode}
                        onChange={(e) =>
                          setBank({ ...bank, ifscCode: e.target.value })
                        }
                        placeholder="HDFC0001234"
                      />
                    </Field>
                  </div>
                  <div className="flex justify-end mt-8">
                    <SaveButton saving={saving.bank} />
                  </div>
                </SectionCard>
              </form>
            )}

            {/* ================= ADDRESS ================= */}
            {tab === "address" && (
              <form onSubmit={handleSaveAddress}>
                <SectionCard
                  icon={FaMapMarkerAlt}
                  iconColor="from-pink-500 to-red-500"
                  title="Business Address"
                  subtitle="Used for shipping, invoices and verification."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Field label="Full Address" icon={<FaMapMarkerAlt />}>
                        <textarea
                          rows={3}
                          className={inputClass}
                          value={address.address}
                          onChange={(e) =>
                            setAddress({ ...address, address: e.target.value })
                          }
                          placeholder="Street, area, landmark"
                        />
                      </Field>
                    </div>
                    <Field label="City" icon={<FaCity />}>
                      <input
                        className={inputClass}
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        placeholder="New Delhi"
                      />
                    </Field>
                    <Field label="State" icon={<FaMapMarkerAlt />}>
                      <input
                        className={inputClass}
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        placeholder="Delhi"
                      />
                    </Field>
                    <Field label="Pincode" icon={<FaMapMarkerAlt />}>
                      <input
                        className={inputClass}
                        value={address.pincode}
                        onChange={(e) =>
                          setAddress({ ...address, pincode: e.target.value })
                        }
                        placeholder="110001"
                      />
                    </Field>
                  </div>
                  <div className="flex justify-end mt-8">
                    <SaveButton saving={saving.address} />
                  </div>
                </SectionCard>
              </form>
            )}

            {/* ================= KYC DOCUMENTS ================= */}
            {tab === "kyc" && (
              <form onSubmit={handleSubmitKyc}>
                <SectionCard
                  icon={FaIdCard}
                  iconColor="from-emerald-500 to-green-600"
                  title="KYC Verification"
                  subtitle="Submit your identity documents for account verification."
                >
                  <div
                    className={`flex items-center gap-3 rounded-2xl px-5 py-4 mb-8 ${
                      kycStatus === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : kycStatus === "REJECTED"
                          ? "bg-red-500/10 text-red-300"
                          : "bg-yellow-500/10 text-yellow-300"
                    }`}
                  >
                    {kycStatus === "APPROVED" ? (
                      <FaCheckCircle />
                    ) : kycStatus === "REJECTED" ? (
                      <FaTimesCircle />
                    ) : (
                      <FaClock />
                    )}
                    <span className="text-sm font-semibold">
                      Current KYC status: {kycStatus.replace("_", " ")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Aadhaar Number" icon={<FaIdCard />}>
                      <input
                        className={inputClass}
                        value={kyc.aadhaar}
                        onChange={(e) =>
                          setKyc({ ...kyc, aadhaar: e.target.value })
                        }
                        placeholder="XXXX XXXX XXXX"
                      />
                    </Field>
                    <Field label="PAN Number" icon={<FaIdCard />}>
                      <input
                        className={inputClass}
                        value={kyc.pan}
                        onChange={(e) =>
                          setKyc({ ...kyc, pan: e.target.value })
                        }
                        placeholder="ABCDE1234F"
                      />
                    </Field>
                    <Field label="GST Number" icon={<FaFileAlt />}>
                      <input
                        className={inputClass}
                        value={kyc.gst}
                        onChange={(e) =>
                          setKyc({ ...kyc, gst: e.target.value })
                        }
                        placeholder="22AAAAA0000A1Z5"
                      />
                    </Field>
                  </div>

                  <div className="flex justify-end mt-8">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={saving.kyc}
                      className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold shadow-lg transition-all disabled:opacity-60"
                    >
                      {saving.kyc ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaUpload />
                      )}
                      {saving.kyc ? "Submitting…" : "Submit for Verification"}
                    </motion.button>
                  </div>
                </SectionCard>
              </form>
            )}

            {/* ================= SOCIAL LINKS ================= */}
            {tab === "social" && (
              <form onSubmit={handleSaveSocial}>
                <SectionCard
                  icon={FaLink}
                  iconColor="from-purple-500 to-indigo-500"
                  title="Social Links"
                  subtitle="Help customers find and trust your brand."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Facebook" icon={<FaFacebook />}>
                      <input
                        className={inputClass}
                        value={social.facebook}
                        onChange={(e) =>
                          setSocial({ ...social, facebook: e.target.value })
                        }
                        placeholder="https://facebook.com/yourstore"
                      />
                    </Field>
                    <Field label="Instagram" icon={<FaInstagram />}>
                      <input
                        className={inputClass}
                        value={social.instagram}
                        onChange={(e) =>
                          setSocial({ ...social, instagram: e.target.value })
                        }
                        placeholder="https://instagram.com/yourstore"
                      />
                    </Field>
                    <Field label="Twitter / X" icon={<FaTwitter />}>
                      <input
                        className={inputClass}
                        value={social.twitter}
                        onChange={(e) =>
                          setSocial({ ...social, twitter: e.target.value })
                        }
                        placeholder="https://x.com/yourstore"
                      />
                    </Field>
                    <Field label="LinkedIn" icon={<FaLinkedin />}>
                      <input
                        className={inputClass}
                        value={social.linkedin}
                        onChange={(e) =>
                          setSocial({ ...social, linkedin: e.target.value })
                        }
                        placeholder="https://linkedin.com/company/yourstore"
                      />
                    </Field>
                    <Field label="YouTube" icon={<FaYoutube />}>
                      <input
                        className={inputClass}
                        value={social.youtube}
                        onChange={(e) =>
                          setSocial({ ...social, youtube: e.target.value })
                        }
                        placeholder="https://youtube.com/@yourstore"
                      />
                    </Field>
                    <Field label="Website" icon={<FaGlobe />}>
                      <input
                        className={inputClass}
                        value={social.website}
                        onChange={(e) =>
                          setSocial({ ...social, website: e.target.value })
                        }
                        placeholder="https://yourstore.com"
                      />
                    </Field>
                  </div>
                  <div className="flex justify-end mt-8">
                    <SaveButton saving={saving.social} />
                  </div>
                </SectionCard>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
