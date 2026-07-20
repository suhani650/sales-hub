import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaCamera,
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCity,
  FaFileInvoice,
  FaLock,
  FaSave,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaIdBadge,
  FaCalendarAlt,
  FaStore,
} from "react-icons/fa";

import { api } from "../../lib/api.js";
import { setUser } from "../../store/authSlice.js";

/* -------------------------------------------------------------------- */
/*  Small helpers                                                       */
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

/* -------------------------------------------------------------------- */
/*  Main Page                                                           */
/* -------------------------------------------------------------------- */

export default function Profile() {
  const dispatch = useDispatch();
  const authUser = useSelector((s) => s.auth.user);
  const fileInputRef = useRef(null);

  const [tab, setTab] = useState("profile"); // profile | security

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [banner, setBanner] = useState({ type: "", message: "" });

  const [vendor, setVendor] = useState(null);
  const [avatar, setAvatar] = useState("");

  const [form, setForm] = useState({
    storeName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
  });

  const [pwd, setPwd] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPwd, setShowPwd] = useState({
    cur: false,
    new: false,
    conf: false,
  });
  const [changingPwd, setChangingPwd] = useState(false);

  /* ---------------------------- Load profile --------------------------- */

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      setLoading(true);
      try {
        const { data } = await api.get("/seller/profile");
        const v = data?.data ?? data;
        if (!mounted || !v) return;

        setVendor(v);
        setAvatar(v.logo || v.user?.avatar || "");
        setForm({
          storeName: v.storeName || "",
          phone: v.phone || v.user?.phone || "",
          address: v.address || "",
          city: v.city || "",
          state: v.state || "",
          pincode: v.pincode || "",
          gstNumber: v.gstNumber || "",
        });
      } catch (err) {
        if (mounted) {
          setBanner({
            type: "error",
            message:
              err?.response?.data?.message ||
              "Couldn't reach the server to load your profile. Showing your last known account details.",
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      mounted = false;
    };
  }, []);

  /* ---------------------------- Save profile ---------------------------- */

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setBanner({ type: "", message: "" });
    try {
      const { data } = await api.put("/seller/profile", form);
      const v = data?.data ?? data;
      if (v) setVendor(v);
      setBanner({ type: "success", message: "Profile updated successfully." });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ---------------------------- Avatar upload ---------------------------- */

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optimistic local preview
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);
    setUploadingAvatar(true);
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

      setAvatar(uploadedUrl);
      setBanner({ type: "success", message: "Profile photo updated." });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Couldn't upload your photo right now. Please try again later.",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  /* ---------------------------- Change password --------------------------- */

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setBanner({ type: "", message: "" });

    if (!pwd.currentPassword || !pwd.newPassword || !pwd.confirmPassword) {
      setBanner({
        type: "error",
        message: "Please fill in all password fields.",
      });
      return;
    }
    if (pwd.newPassword.length < 8) {
      setBanner({
        type: "error",
        message: "New password must be at least 8 characters.",
      });
      return;
    }
    if (pwd.newPassword !== pwd.confirmPassword) {
      setBanner({
        type: "error",
        message: "New password and confirm password do not match.",
      });
      return;
    }

    setChangingPwd(true);
    try {
      await api.put("/seller/profile/password", {
        currentPassword: pwd.currentPassword,
        newPassword: pwd.newPassword,
      });
      setBanner({ type: "success", message: "Password changed successfully." });
      setPwd({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setBanner({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to change password. Check your current password.",
      });
    } finally {
      setChangingPwd(false);
    }
  };

  const displayName =
    vendor?.storeName ||
    authUser?.name ||
    authUser?.email?.split("@")[0] ||
    "Seller";
  const displayEmail = authUser?.email || vendor?.user?.email || "—";
  const displayRole = authUser?.role || "VENDOR";

  /* ------------------------------- Render -------------------------------- */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Ambient glow orbs — same treatment as the dashboard */}
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
                <FaUserCircle />
                My Account
              </div>

              <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-black">
                My Profile 👤
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-white/70">
                Manage your personal details, store contact info and account
                security — all from one place.
              </p>
            </div>

            {/* Avatar + identity card, styled like the revenue hero card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[1px]"
            >
              <div className="w-full lg:w-[360px] rounded-3xl bg-[#0B1225] p-8">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-white/90" size={44} />
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleAvatarClick}
                      disabled={uploadingAvatar}
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-lg disabled:opacity-60"
                      title="Change photo"
                    >
                      {uploadingAvatar ? (
                        <FaSpinner className="animate-spin" size={12} />
                      ) : (
                        <FaCamera size={12} />
                      )}
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl font-black truncate">
                      {loading ? "Loading…" : displayName}
                    </h2>
                    <p className="mt-1 text-sm text-white/60 truncate flex items-center gap-2">
                      <FaEnvelope className="text-pink-400 shrink-0" />{" "}
                      {displayEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-1.5 text-xs font-bold text-indigo-300">
                    <FaShieldAlt />
                    {String(displayRole).replace("_", " ")}
                  </span>
                  {vendor?.status && (
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${
                        vendor.status === "APPROVED"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      <FaCheckCircle />
                      {vendor.status}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= QUICK INFO STRIP ================= */}
        <div className="grid gap-7 xl:grid-cols-4 md:grid-cols-2">
          {[
            {
              title: "Store Name",
              value: vendor?.storeName || "—",
              icon: FaStore,
              color: "from-pink-500 to-red-500",
            },
            {
              title: "Account Role",
              value: String(displayRole).replace("_", " "),
              icon: FaIdBadge,
              color: "from-indigo-500 to-blue-500",
            },
            {
              title: "Store Status",
              value: vendor?.status || "—",
              icon: FaShieldAlt,
              color: "from-cyan-500 to-sky-500",
            },
            {
              title: "Member Since",
              value: formatDate(vendor?.createdAt || authUser?.createdAt),
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
        <div className="flex gap-4">
          <button
            onClick={() => setTab("profile")}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              tab === "profile"
                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                : "border border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <FaEdit /> Profile Info
          </button>
          <button
            onClick={() => setTab("security")}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              tab === "security"
                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                : "border border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <FaLock /> Security
          </button>
        </div>

        {/* ================= TAB CONTENT ================= */}
        {tab === "profile" ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSaveProfile}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500">
                <FaBuilding size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Store &amp; Contact Details
                </h3>
                <p className="text-white/50 text-sm mt-1">
                  Keep your business information accurate and up to date.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center gap-3 text-white/60 py-16 justify-center">
                <FaSpinner className="animate-spin" size={20} /> Loading your
                profile…
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Store Name" icon={<FaBuilding />}>
                    <input
                      className={inputClass}
                      value={form.storeName}
                      onChange={(e) =>
                        setForm({ ...form, storeName: e.target.value })
                      }
                      placeholder="Your store name"
                    />
                  </Field>

                  <Field label="Phone Number" icon={<FaPhoneAlt />}>
                    <input
                      className={inputClass}
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                    />
                  </Field>

                  <Field label="GST Number" icon={<FaFileInvoice />}>
                    <input
                      className={inputClass}
                      value={form.gstNumber}
                      onChange={(e) =>
                        setForm({ ...form, gstNumber: e.target.value })
                      }
                      placeholder="22AAAAA0000A1Z5"
                    />
                  </Field>

                  <Field label="Pincode" icon={<FaMapMarkerAlt />}>
                    <input
                      className={inputClass}
                      value={form.pincode}
                      onChange={(e) =>
                        setForm({ ...form, pincode: e.target.value })
                      }
                      placeholder="110001"
                    />
                  </Field>

                  <Field label="City" icon={<FaCity />}>
                    <input
                      className={inputClass}
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      placeholder="New Delhi"
                    />
                  </Field>

                  <Field label="State" icon={<FaMapMarkerAlt />}>
                    <input
                      className={inputClass}
                      value={form.state}
                      onChange={(e) =>
                        setForm({ ...form, state: e.target.value })
                      }
                      placeholder="Delhi"
                    />
                  </Field>

                  <div className="md:col-span-2">
                    <Field label="Address" icon={<FaMapMarkerAlt />}>
                      <textarea
                        rows={3}
                        className={inputClass}
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        placeholder="Full business address"
                      />
                    </Field>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow-lg transition-all disabled:opacity-60"
                  >
                    {saving ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaSave />
                    )}
                    {saving ? "Saving…" : "Save Changes"}
                  </motion.button>
                </div>
              </>
            )}
          </motion.form>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleChangePassword}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-red-500">
                <FaLock size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Change Password</h3>
                <p className="text-white/50 text-sm mt-1">
                  Choose a strong password you don't use elsewhere.
                </p>
              </div>
            </div>

            <div className="space-y-5 mt-8">
              <Field label="Current Password" icon={<FaLock />}>
                <div className="relative">
                  <input
                    type={showPwd.cur ? "text" : "password"}
                    className={inputClass + " pr-12"}
                    value={pwd.currentPassword}
                    onChange={(e) =>
                      setPwd({ ...pwd, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPwd({ ...showPwd, cur: !showPwd.cur })
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPwd.cur ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Field>

              <Field label="New Password" icon={<FaLock />}>
                <div className="relative">
                  <input
                    type={showPwd.new ? "text" : "password"}
                    className={inputClass + " pr-12"}
                    value={pwd.newPassword}
                    onChange={(e) =>
                      setPwd({ ...pwd, newPassword: e.target.value })
                    }
                    placeholder="At least 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPwd({ ...showPwd, new: !showPwd.new })
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPwd.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Field>

              <Field label="Confirm New Password" icon={<FaLock />}>
                <div className="relative">
                  <input
                    type={showPwd.conf ? "text" : "password"}
                    className={inputClass + " pr-12"}
                    value={pwd.confirmPassword}
                    onChange={(e) =>
                      setPwd({ ...pwd, confirmPassword: e.target.value })
                    }
                    placeholder="Re-enter new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPwd({ ...showPwd, conf: !showPwd.conf })
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPwd.conf ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </Field>
            </div>

            <div className="flex justify-end mt-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={changingPwd}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow-lg transition-all disabled:opacity-60"
              >
                {changingPwd ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaLock />
                )}
                {changingPwd ? "Updating…" : "Update Password"}
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
