import { useEffect, useState } from "react";
import {
  FaTruck,
  FaCheckCircle,
  FaBoxOpen,
  FaTimesCircle,
  FaShippingFast,
  FaClipboardCheck,
  FaTimes,
} from "react-icons/fa";

const STATUSES = [
  {
    value: "PENDING",
    label: "Pending",
    icon: <FaClipboardCheck />,
    color: "text-yellow-400",
  },
  {
    value: "CONFIRMED",
    label: "Confirmed",
    icon: <FaCheckCircle />,
    color: "text-cyan-400",
  },
  {
    value: "PACKED",
    label: "Packed",
    icon: <FaBoxOpen />,
    color: "text-indigo-400",
  },
  {
    value: "SHIPPED",
    label: "Shipped",
    icon: <FaShippingFast />,
    color: "text-blue-400",
  },
  {
    value: "OUT_FOR_DELIVERY",
    label: "Out For Delivery",
    icon: <FaTruck />,
    color: "text-orange-400",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
    icon: <FaCheckCircle />,
    color: "text-green-400",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    icon: <FaTimesCircle />,
    color: "text-red-400",
  },
];

export default function OrderStatusModal({
  open,
  onClose,
  order,
  onSave,
  saving,
}) {
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (order?.status) setStatus(order.status);
  }, [order]);

  if (!open || !order) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-[28px] border border-cyan-500/20 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 shadow-[0_10px_35px_rgba(0,0,0,.45)] relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl"
          >
            <FaTimes />
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl text-white shadow-lg">
              <FaTruck />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                Update Order Status
              </h2>

              <p className="text-slate-400 mt-1">
                {order.orderNumber || `ORD-${order.id}`} · Select the latest
                order progress.
              </p>
            </div>
          </div>

          <label className="block text-slate-300 mb-3 font-medium">
            Order Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-[#111827] px-5 py-4 text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition"
          >
            {STATUSES.map((item) => (
              <option
                key={item.value}
                value={item.value}
                className="bg-[#111827]"
              >
                {item.label}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {STATUSES.map((item) => (
              <div
                key={item.value}
                onClick={() => setStatus(item.value)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300
                ${
                  status === item.value
                    ? "border-cyan-500 bg-cyan-500/10 shadow-lg"
                    : "border-slate-700 hover:border-cyan-400 hover:bg-slate-800"
                }`}
              >
                <div className={`text-2xl ${item.color}`}>{item.icon}</div>

                <h3 className="text-white font-semibold mt-3">{item.label}</h3>
              </div>
            ))}
          </div>

          <button
            disabled={saving}
            onClick={() => onSave?.({ id: order.id, status })}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            {saving ? "Saving…" : "Save Status"}
          </button>
        </div>
      </div>
    </>
  );
}
