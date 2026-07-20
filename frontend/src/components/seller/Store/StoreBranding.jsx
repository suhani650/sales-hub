import { useEffect, useRef, useState } from "react";
import {
  FaImage,
  FaSave,
  FaMobileAlt,
  FaDesktop,
  FaUpload,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import {
  useGetSellerProfileQuery,
  useUpdateSellerProfileMutation,
  useUpdateBrandingMutation,
  useUploadFileMutation,
} from "../../../services/vendorApi";

const FONT_OPTIONS = ["Inter", "Poppins", "Roboto", "Montserrat"];

const PRESETS = [
  ["#2563eb", "#7c3aed"],
  ["#10b981", "#059669"],
  ["#ef4444", "#f97316"],
  ["#111827", "#374151"],
];

const emptyBranding = {
  storeName: "",
  primaryColor: "#2563eb",
  secondaryColor: "#7c3aed",
  fontFamily: "Inter",
  logo: "",
  banner: "",
};

function toBranding(vendor) {
  if (!vendor) return emptyBranding;
  return {
    storeName: vendor.storeName || vendor.businessName || "",
    primaryColor: vendor.primaryColor || "#2563eb",
    secondaryColor: vendor.secondaryColor || "#7c3aed",
    fontFamily: vendor.fontFamily || "Inter",
    logo: vendor.logo || "",
    banner: vendor.banner || "",
  };
}

export default function StoreBranding() {
  const {
    data: vendor,
    isLoading,
    isError,
    refetch,
  } = useGetSellerProfileQuery();

  const [updateSellerProfile] = useUpdateSellerProfileMutation();
  const [updateBranding, { isLoading: isSaving }] = useUpdateBrandingMutation();
  const [uploadFile, { isLoading: isUploadingLogo }] = useUploadFileMutation();
  const [uploadBannerFile, { isLoading: isUploadingBanner }] =
    useUploadFileMutation();

  const [branding, setBranding] = useState(emptyBranding);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [status, setStatus] = useState(null);

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    if (vendor) setBranding(toBranding(vendor));
  }, [vendor]);

  const handleChange = (field, value) => {
    setBranding((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = async (e, field, mutation) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await mutation(formData).unwrap();
      handleChange(field, result.url);
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.data?.message || "Upload failed. Try again.",
      });
      setTimeout(() => setStatus(null), 4000);
    } finally {
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    setStatus(null);
    try {
      await Promise.all([
        updateSellerProfile({ storeName: branding.storeName }).unwrap(),
        updateBranding({
          logo: branding.logo,
          banner: branding.banner,
          primaryColor: branding.primaryColor,
          secondaryColor: branding.secondaryColor,
          fontFamily: branding.fontFamily,
        }).unwrap(),
      ]);

      setStatus({ type: "success", message: "Branding saved." });
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.data?.message || "Could not save branding. Try again.",
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
        <p className="text-white/80">Couldn't load your branding settings.</p>
        <button
          onClick={refetch}
          className="mt-4 rounded-xl bg-white/10 px-5 py-2 hover:bg-white/20"
        >
          Retry
        </button>
      </div>
    );
  }

  const isBusy = isSaving || isUploadingLogo || isUploadingBanner;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Branding Studio</h2>
          <p className="mt-2 text-white/60">Customize your store identity</p>
        </div>

        <button
          onClick={handleSave}
          disabled={isBusy}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white transition hover:from-pink-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {isSaving ? "Saving..." : "Save Branding"}
        </button>
      </div>

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

      {/* Settings */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Branding Controls */}
        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white">Brand Settings</h3>

          <div>
            <label className="mb-2 block font-medium text-white/80">
              Store Name
            </label>
            <input
              value={branding.storeName}
              onChange={(e) => handleChange("storeName", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-white/80">
              Primary Color
            </label>
            <input
              type="color"
              value={branding.primaryColor}
              onChange={(e) => handleChange("primaryColor", e.target.value)}
              className="h-12 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-white/80">
              Secondary Color
            </label>
            <input
              type="color"
              value={branding.secondaryColor}
              onChange={(e) => handleChange("secondaryColor", e.target.value)}
              className="h-12 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-white/80">
              Typography
            </label>
            <select
              value={branding.fontFamily}
              onChange={(e) => handleChange("fontFamily", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-indigo-400 focus:outline-none"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font} value={font} className="bg-slate-900">
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-white/80">
              Logo Upload
            </label>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e, "logo", uploadFile)}
            />
            <button
              onClick={() => logoInputRef.current?.click()}
              disabled={isUploadingLogo}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploadingLogo ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaUpload />
              )}
              {isUploadingLogo
                ? "Uploading..."
                : branding.logo
                  ? "Replace Logo"
                  : "Upload Logo"}
            </button>
          </div>

          <div>
            <label className="mb-2 block font-medium text-white/80">
              Banner Upload
            </label>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e, "banner", uploadBannerFile)}
            />
            <button
              onClick={() => bannerInputRef.current?.click()}
              disabled={isUploadingBanner}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploadingBanner ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaUpload />
              )}
              {isUploadingBanner
                ? "Uploading..."
                : branding.banner
                  ? "Replace Banner"
                  : "Upload Banner"}
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-5 flex justify-between">
            <h3 className="text-xl font-bold text-white">Live Preview</h3>

            <div className="flex gap-2">
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`rounded-lg border border-white/10 p-2 transition ${
                  previewMode === "desktop"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                <FaDesktop />
              </button>

              <button
                onClick={() => setPreviewMode("mobile")}
                className={`rounded-lg border border-white/10 p-2 transition ${
                  previewMode === "mobile"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                <FaMobileAlt />
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition-all ${
              previewMode === "mobile" ? "mx-auto max-w-xs" : "w-full"
            }`}
          >
            <div
              className="h-32"
              style={{
                background: branding.banner
                  ? `url(${branding.banner}) center/cover no-repeat`
                  : `linear-gradient(90deg, ${branding.primaryColor}, ${branding.secondaryColor})`,
              }}
            />

            <div className="p-6">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-white/10 text-3xl text-white/60">
                {branding.logo ? (
                  <img
                    src={branding.logo}
                    alt="Store logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaImage />
                )}
              </div>

              <h2
                className="mt-4 text-2xl font-bold text-white"
                style={{ fontFamily: branding.fontFamily }}
              >
                {branding.storeName || "Your Store"}
              </h2>

              <p className="mt-2 text-white/50">
                Premium Multi-Vendor Marketplace Store
              </p>

              <button
                className="mt-5 rounded-xl px-5 py-3 font-semibold text-white"
                style={{ background: branding.primaryColor }}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Presets */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-5 text-xl font-bold text-white">Theme Presets</h3>

        <div className="grid gap-4 md:grid-cols-4">
          {PRESETS.map((colors, index) => (
            <button
              key={index}
              onClick={() => {
                handleChange("primaryColor", colors[0]);
                handleChange("secondaryColor", colors[1]);
              }}
              className={`h-24 rounded-xl border-2 transition ${
                branding.primaryColor === colors[0] &&
                branding.secondaryColor === colors[1]
                  ? "border-white"
                  : "border-transparent"
              }`}
              style={{
                background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
