import {
  FaExclamationTriangle,
  FaTrash,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";

/**
 * Reusable themed confirm / blocked-action dialog.
 * Replaces window.confirm()/alert() so it matches the app's dark UI.
 *
 * tone="danger"  -> destructive confirm (Delete / Cancel buttons)
 * tone="blocked" -> informational "can't do this" dialog (single OK button)
 */
export default function ConfirmDialog({
  open,
  tone = "danger",
  title,
  message,
  reasons = [],
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const isBlocked = tone === "blocked";

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-[60]" onClick={onCancel} />

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 shadow-2xl">
          <div className="flex items-start gap-4">
            <div
              className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                isBlocked
                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {isBlocked ? <FaExclamationTriangle /> : <FaTrash />}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm text-slate-400 leading-6">{message}</p>
            </div>

            <button
              onClick={onCancel}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {reasons.length > 0 && (
            <div className="mt-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-yellow-400">
                <FaInfoCircle />
                Why this is blocked
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300 list-disc list-inside">
                {reasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 flex justify-end gap-3">
            {isBlocked ? (
              <button
                onClick={onCancel}
                className="rounded-xl bg-cyan-600 hover:bg-cyan-500 px-6 py-3 font-semibold text-white transition-colors"
              >
                Got it
              </button>
            ) : (
              <>
                <button
                  onClick={onCancel}
                  disabled={loading}
                  className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-300 hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3 font-semibold text-white hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                >
                  {loading && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}
                  {loading ? "Deleting..." : confirmLabel}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
