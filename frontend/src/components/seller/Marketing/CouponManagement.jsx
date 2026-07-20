import { useState } from "react";
import {
  FaGift,
  FaTags,
  FaPercentage,
  FaRupeeSign,
  FaCalendarAlt,
  FaChartLine,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetCouponAnalyticsQuery,
} from "../../../services/vendorApi";

const formatCount = (value) => {
  const n = Number(value || 0);
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
};

const couponStatus = (coupon) => {
  if (!coupon.isActive) return "Inactive";
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date())
    return "Expired";
  return "Active";
};

const emptyForm = {
  code: "",
  discountType: "PERCENTAGE",
  discountValue: "",
  minOrderAmount: "",
  usageLimit: "",
  endDate: "",
};

export default function CouponManagement() {
  const { data: coupons = [], isLoading, isError } = useGetCouponsQuery();
  const { data: analytics } = useGetCouponAnalyticsQuery();
  const [createCoupon, { isLoading: creating }] = useCreateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setFormError("");

    if (!form.code.trim() || !form.discountValue) {
      setFormError("Coupon code and discount value are required.");
      return;
    }

    try {
      await createCoupon({
        code: form.code.trim().toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : 0,
        endDate: form.endDate || null,
      }).unwrap();

      setForm(emptyForm);
    } catch (err) {
      setFormError(
        err?.data?.message ||
          "Couldn't create coupon — code may already exist.",
      );
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this coupon?")) return;
    try {
      await deleteCoupon(id).unwrap();
    } catch {
      alert("Couldn't delete coupon.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Coupon Management</h2>
            <p className="text-slate-400 mt-2">
              Create and track real discount codes for your store.
            </p>
          </div>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-5">
        <StatCard
          title="Total Coupons"
          value={analytics?.totalCoupons ?? 0}
          icon={<FaGift />}
        />
        <StatCard
          title="Active Coupons"
          value={analytics?.activeCoupons ?? 0}
          icon={<FaTags />}
        />
        <StatCard
          title="Total Redemptions"
          value={formatCount(analytics?.totalRedemptions)}
          icon={<FaChartLine />}
        />
      </div>

      {/* Coupon Builder */}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
        <h3 className="font-bold text-xl text-white mb-5">Create Coupon</h3>

        <div className="grid lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Coupon Code (e.g. SUMMER25)"
            value={form.code}
            onChange={(e) => updateField("code", e.target.value)}
            className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500"
          />

          <select
            value={form.discountType}
            onChange={(e) => updateField("discountType", e.target.value)}
            className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500"
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="FLAT">Flat Amount</option>
          </select>

          <input
            type="number"
            placeholder={
              form.discountType === "PERCENTAGE"
                ? "Discount % (e.g. 25)"
                : "Discount ₹"
            }
            value={form.discountValue}
            onChange={(e) => updateField("discountValue", e.target.value)}
            className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500"
          />

          <input
            type="number"
            placeholder="Min Order Amount (₹)"
            value={form.minOrderAmount}
            onChange={(e) => updateField("minOrderAmount", e.target.value)}
            className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500"
          />

          <input
            type="number"
            placeholder="Usage Limit (0 = unlimited)"
            value={form.usageLimit}
            onChange={(e) => updateField("usageLimit", e.target.value)}
            className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500"
          />

          <input
            type="date"
            value={form.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
            className="bg-[#111827] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500"
          />
        </div>

        {formError && <p className="text-red-400 text-sm mt-3">{formError}</p>}

        <button
          onClick={handleSave}
          disabled={creating}
          className="mt-5 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-105 duration-300 disabled:opacity-50"
        >
          <FaPlus />
          {creating ? "Saving…" : "Save Coupon"}
        </button>
      </div>

      {/* Coupons Table */}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h3 className="font-bold text-xl text-white">All Coupons</h3>
        </div>

        {isLoading ? (
          <div className="p-10 text-center text-slate-400">
            Loading coupons…
          </div>
        ) : isError ? (
          <div className="p-10 text-center text-red-400">
            Couldn't load coupons.
          </div>
        ) : coupons.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            No coupons yet — create one above.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-[#111827]">
              <tr className="text-slate-400 text-sm">
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Discount</th>
                <th className="p-4 text-left">Usage</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-t border-white/10">
                  <td className="p-4 font-semibold text-white">
                    {coupon.code}
                  </td>
                  <td className="p-4 text-slate-300">{coupon.type}</td>
                  <td className="p-4 text-cyan-400 font-semibold">
                    {coupon.type === "PERCENTAGE"
                      ? `${coupon.value}%`
                      : `₹${Number(coupon.value).toLocaleString("en-IN")}`}
                  </td>
                  <td className="p-4 text-slate-300">
                    {coupon.usedCount}
                    {coupon.maxUses > 0 ? ` / ${coupon.maxUses}` : ""}
                  </td>
                  <td className="p-4">
                    <StatusBadge value={couponStatus(coupon)} />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      title="Delete coupon"
                      className="w-9 h-9 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition inline-flex items-center justify-center"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Promotion Types (informational) */}

      <div className="grid md:grid-cols-3 gap-5">
        <PromoCard title="Percentage Off" icon={<FaPercentage />} />
        <PromoCard title="Flat Amount Off" icon={<FaRupeeSign />} />
        <PromoCard title="Scheduled Expiry" icon={<FaCalendarAlt />} />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
      <div className="text-3xl text-pink-400">{icon}</div>
      <p className="text-slate-400 mt-3">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
    </div>
  );
}

function PromoCard({ title, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 text-center">
      <div className="flex justify-center text-3xl text-purple-400">{icon}</div>
      <h4 className="font-bold text-white mt-3">{title}</h4>
    </div>
  );
}

function StatusBadge({ value }) {
  const colors = {
    Active: "bg-emerald-500/20 text-emerald-400",
    Inactive: "bg-slate-500/20 text-slate-300",
    Expired: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[value]}`}
    >
      {value}
    </span>
  );
}
