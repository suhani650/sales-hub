import { useEffect, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
  FaClock,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaSave,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import {
  useGetSellerProfileQuery,
  useUpdateSellerProfileMutation,
} from "../../../services/vendorApi";

const emptyForm = {
  businessName: "",
  email: "",
  phone: "",
  gst: "",
  registration: "",
  address: "",
  website: "",
  supportHours: "",
  facebook: "",
  instagram: "",
  twitter: "",
};

// Maps the vendor record (+ nested user) coming back from GET /seller/profile
// into the flat shape this form works with.
function toForm(vendor) {
  if (!vendor) return emptyForm;
  const social = vendor.socialLinks || {};

  return {
    businessName: vendor.businessName || vendor.storeName || "",
    email: vendor.user?.email || "",
    phone: vendor.phone || "",
    gst: vendor.gstNumber || "",
    registration: vendor.registrationNumber || "",
    address: [vendor.address, vendor.city, vendor.state, vendor.pincode]
      .filter(Boolean)
      .join(", "),
    website: vendor.website || "",
    supportHours: vendor.supportHours || "",
    facebook: social.facebook || "",
    instagram: social.instagram || "",
    twitter: social.twitter || "",
  };
}

export default function StoreContactInfo() {
  const {
    data: vendor,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetSellerProfileQuery();

  const [updateSellerProfile, { isLoading: isSaving }] =
    useUpdateSellerProfileMutation();

  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }

  // Populate the form once the real record arrives, and whenever it refreshes.
  useEffect(() => {
    if (vendor) setForm(toForm(vendor));
  }, [vendor]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setStatus(null);
    try {
      await updateSellerProfile({
        businessName: form.businessName,
        phone: form.phone,
        gstNumber: form.gst,
        registrationNumber: form.registration,
        address: form.address,
        website: form.website,
        supportHours: form.supportHours,
        socialLinks: {
          facebook: form.facebook,
          instagram: form.instagram,
          twitter: form.twitter,
        },
      }).unwrap();

      setStatus({ type: "success", message: "Business details saved." });
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.data?.message || "Could not save details. Try again.",
      });
    } finally {
      setTimeout(() => setStatus(null), 4000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <FaSpinner className="animate-spin text-3xl text-indigo-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center backdrop-blur-xl">
        <FaExclamationCircle className="mx-auto mb-3 text-3xl text-red-400" />
        <p className="text-white/80">Couldn't load your business profile.</p>
        <button
          onClick={refetch}
          className="mt-4 rounded-xl bg-white/10 px-5 py-2 hover:bg-white/20"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Business Information
          </h2>
          <p className="mt-2 text-white/60">
            Manage business and customer support details
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white transition hover:from-pink-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {isSaving ? "Saving..." : "Save Details"}
        </button>
      </div>

      {/* Status banner */}
      {status && (
        <div
          className={`flex items-center gap-3 rounded-2xl border px-5 py-4 backdrop-blur-xl ${
            status.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/20 bg-red-500/10 text-red-300"
          }`}
        >
          {status.type === "success" ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationCircle />
          )}
          {status.message}
        </div>
      )}

      {/* Business Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white">Company Information</h3>

          <InputField
            label="Business Name"
            icon={<FaBuilding />}
            value={form.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
          />

          <InputField
            label="GST Number"
            value={form.gst}
            onChange={(e) => updateField("gst", e.target.value)}
          />

          <InputField
            label="Registration Number"
            value={form.registration}
            onChange={(e) => updateField("registration", e.target.value)}
          />

          <InputField
            label="Website"
            icon={<FaGlobe />}
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        </div>

        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white">Contact Information</h3>

          <div>
            <label className="mb-2 block font-medium text-white/80">
              Support Email
            </label>
            <div className="relative">
              <div className="absolute left-4 top-4 text-white/40">
                <FaEnvelope />
              </div>
              <input
                value={form.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 p-3 pl-11 text-white/50"
              />
            </div>
            <p className="mt-1 text-xs text-white/40">
              This is your account login email. Change it from Account Settings.
            </p>
          </div>

          <InputField
            label="Phone Number"
            icon={<FaPhone />}
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <InputField
            label="Working Hours"
            icon={<FaClock />}
            value={form.supportHours}
            placeholder="e.g. 09:00 AM - 06:00 PM"
            onChange={(e) => updateField("supportHours", e.target.value)}
          />

          <div>
            <label className="mb-2 block font-medium text-white/80">
              Business Address
            </label>
            <textarea
              rows="4"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-white/30 focus:border-indigo-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-5 text-xl font-bold text-white">
          Social Media Manager
        </h3>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField
            label="Facebook"
            icon={<FaFacebook />}
            value={form.facebook}
            placeholder="https://facebook.com/yourstore"
            onChange={(e) => updateField("facebook", e.target.value)}
          />

          <InputField
            label="Instagram"
            icon={<FaInstagram />}
            value={form.instagram}
            placeholder="https://instagram.com/yourstore"
            onChange={(e) => updateField("instagram", e.target.value)}
          />

          <InputField
            label="Twitter"
            icon={<FaTwitter />}
            value={form.twitter}
            placeholder="https://twitter.com/yourstore"
            onChange={(e) => updateField("twitter", e.target.value)}
          />
        </div>
      </div>

      {/* Location Preview */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-5 text-xl font-bold text-white">Business Location</h3>

        <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/20">
          <FaMapMarkerAlt className="mb-4 text-5xl text-pink-500" />
          <h4 className="font-semibold text-white">
            {form.address || "No address on file yet"}
          </h4>
          <p className="mt-2 text-white/50">Google Maps Integration Ready</p>
        </div>
      </div>

      {/* Customer Support Status */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-5 text-xl font-bold text-white">
          Support Center Status
        </h3>

        <div className="grid gap-4 md:grid-cols-4">
          <StatusCard
            title="Support Email"
            value={form.email ? "Active" : "Not Set"}
            active={!!form.email}
          />
          <StatusCard
            title="Phone Support"
            value={form.phone ? "Active" : "Not Set"}
            active={!!form.phone}
          />
          <StatusCard
            title="Business Verified"
            value={vendor?.status === "APPROVED" ? "Verified" : "Pending"}
            active={vendor?.status === "APPROVED"}
          />
          <StatusCard
            title="GST Verified"
            value={form.gst ? "Verified" : "Pending"}
            active={!!form.gst}
          />
        </div>
      </div>

      {isFetching && !isLoading && (
        <p className="text-center text-xs text-white/40">Refreshing…</p>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, icon, placeholder }) {
  return (
    <div>
      <label className="mb-2 block font-medium text-white/80">{label}</label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-4 text-white/40">{icon}</div>
        )}

        <input
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-white/30 focus:border-indigo-400 focus:outline-none ${
            icon ? "pl-11" : ""
          }`}
        />
      </div>
    </div>
  );
}

function StatusCard({ title, value, active }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-white/60">{title}</p>
      <h4
        className={`mt-2 text-xl font-bold ${
          active ? "text-emerald-400" : "text-yellow-400"
        }`}
      >
        {value}
      </h4>
    </div>
  );
}
