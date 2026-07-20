// Shared building blocks for the seller Finance module so every sub-page
// (Transactions, Payouts, Refunds, Tax, Bank Accounts, Analytics) renders
// with the same dark glassmorphism theme as the rest of the Vendor Command
// Center — only the accent gradient changes per module.

export const ACCENTS = {
  indigo: {
    gradient: "from-indigo-500 to-blue-600",
    text: "text-indigo-300",
    glow: "shadow-indigo-500/20",
    ring: "focus:ring-indigo-500/30 focus:border-indigo-400",
  },
  emerald: {
    gradient: "from-emerald-500 to-teal-600",
    text: "text-emerald-300",
    glow: "shadow-emerald-500/20",
    ring: "focus:ring-emerald-500/30 focus:border-emerald-400",
  },
  orange: {
    gradient: "from-orange-500 to-red-500",
    text: "text-orange-300",
    glow: "shadow-orange-500/20",
    ring: "focus:ring-orange-500/30 focus:border-orange-400",
  },
  purple: {
    gradient: "from-purple-500 to-fuchsia-600",
    text: "text-purple-300",
    glow: "shadow-purple-500/20",
    ring: "focus:ring-purple-500/30 focus:border-purple-400",
  },
  cyan: {
    gradient: "from-cyan-500 to-sky-600",
    text: "text-cyan-300",
    glow: "shadow-cyan-500/20",
    ring: "focus:ring-cyan-500/30 focus:border-cyan-400",
  },
  violet: {
    gradient: "from-violet-500 to-purple-600",
    text: "text-violet-300",
    glow: "shadow-violet-500/20",
    ring: "focus:ring-violet-500/30 focus:border-violet-400",
  },
  pink: {
    gradient: "from-pink-500 to-red-500",
    text: "text-pink-300",
    glow: "shadow-pink-500/20",
    ring: "focus:ring-pink-500/30 focus:border-pink-400",
  },
};

export function accentOf(accent) {
  return ACCENTS[accent] || ACCENTS.indigo;
}

export function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function ModuleHeader({ title, subtitle, accent, actions }) {
  const a = accentOf(accent);
  return (
    <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className={`text-2xl font-bold`}>{title}</h2>
        {subtitle && <p className="mt-2 text-white/60">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      <span className={`hidden bg-gradient-to-r ${a.gradient}`} />
    </GlassCard>
  );
}

export function PrimaryButton({ accent, children, className = "", ...props }) {
  const a = accentOf(accent);
  return (
    <button
      className={`flex items-center gap-2 rounded-xl bg-gradient-to-r ${a.gradient} px-4 py-2.5 font-semibold shadow-lg ${a.glow} transition hover:brightness-110 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      className={`flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-medium text-white/80 transition hover:bg-white/10 hover:text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SearchInput({ accent, className = "", ...props }) {
  const a = accentOf(accent);
  return (
    <input
      className={`w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-white/40 outline-none transition focus:ring-4 ${a.ring} ${className}`}
      {...props}
    />
  );
}

export function StatCard({ title, value, icon, accent }) {
  const a = accentOf(accent);
  return (
    <GlassCard className="p-6">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${a.gradient} text-lg`}
      >
        {icon}
      </div>
      <p className="mt-5 text-white/60">{title}</p>
      <h3 className="mt-1 text-2xl font-black">{value}</h3>
    </GlassCard>
  );
}

export function DetailModal({ open, onClose, title, accent, rows = [] }) {
  if (!open) return null;
  const a = accentOf(accent);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#14121f] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div
          className={`mt-3 h-1 w-16 rounded-full bg-gradient-to-r ${a.gradient}`}
        />
        <div className="mt-5 space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b border-white/10 pb-2 last:border-0"
            >
              <span className="text-white/50">{row.label}</span>
              <span className="text-right font-semibold">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SummaryRow({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <span className="text-white/60">{label}</span>
      <span
        className={`font-semibold ${highlight ? "text-emerald-400" : "text-white"}`}
      >
        {value}
      </span>
    </div>
  );
}

const STATUS_STYLES = {
  SUCCESS: "bg-emerald-500/15 text-emerald-300",
  COMPLETED: "bg-emerald-500/15 text-emerald-300",
  APPROVED: "bg-emerald-500/15 text-emerald-300",
  FILED: "bg-emerald-500/15 text-emerald-300",
  VERIFIED: "bg-emerald-500/15 text-emerald-300",
  ACTIVE: "bg-emerald-500/15 text-emerald-300",

  PENDING: "bg-yellow-500/15 text-yellow-300",
  PROCESSING: "bg-yellow-500/15 text-yellow-300",
  UPCOMING: "bg-blue-500/15 text-blue-300",

  FAILED: "bg-red-500/15 text-red-300",
  REJECTED: "bg-red-500/15 text-red-300",
  CANCELLED: "bg-red-500/15 text-red-300",

  PAYMENT: "bg-blue-500/15 text-blue-300",
  REFUND: "bg-red-500/15 text-red-300",
  SETTLEMENT: "bg-emerald-500/15 text-emerald-300",
  TRANSFER: "bg-purple-500/15 text-purple-300",
  CHARGE: "bg-blue-500/15 text-blue-300",
  PAYOUT: "bg-cyan-500/15 text-cyan-300",
};

export function StatusBadge({ status, icon }) {
  const key = String(status || "").toUpperCase();
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_STYLES[key] || "bg-white/10 text-white/70"
      }`}
    >
      {icon}
      {key}
    </span>
  );
}

// Downloads any array of objects as a CSV file — used by every "Export"
// button so they do something real instead of being decorative.
export function downloadCsv(filename, rows) {
  if (!rows || rows.length === 0) {
    rows = [{ message: "No data available" }];
  }
  const headers = Object.keys(rows[0]);
  const escape = (val) => {
    const str = String(val ?? "");
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function formatDate(value) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

export function formatCurrency(value) {
  const num = Number(value || 0);
  return `₹${num.toLocaleString("en-IN")}`;
}
