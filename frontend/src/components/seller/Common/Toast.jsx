import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

/**
 * Themed toast — replaces window.alert() for success/error feedback.
 * `toast` = { type: "success" | "error", message: string } | null
 */
export default function Toast({ toast, onClose, duration = 3500 }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [toast, duration, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div
        className={`flex items-start gap-3 rounded-2xl border px-5 py-4 pr-4 shadow-2xl backdrop-blur-xl min-w-[280px] max-w-sm ${
          isSuccess
            ? "border-green-500/30 bg-[#0F172A]/95 shadow-[0_10px_40px_rgba(34,197,94,.15)]"
            : "border-red-500/30 bg-[#0F172A]/95 shadow-[0_10px_40px_rgba(239,68,68,.15)]"
        }`}
      >
        <div
          className={`shrink-0 mt-0.5 text-lg ${
            isSuccess ? "text-green-400" : "text-red-400"
          }`}
        >
          {isSuccess ? <FaCheckCircle /> : <FaTimesCircle />}
        </div>

        <p className="flex-1 text-sm font-medium text-slate-200 leading-5">
          {toast.message}
        </p>

        <button
          onClick={onClose}
          className="shrink-0 text-slate-500 hover:text-white transition-colors"
        >
          <FaTimes size={12} />
        </button>
      </div>
    </div>
  );
}
