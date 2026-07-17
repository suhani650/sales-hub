import GlassCard from "../GlassCard.jsx";
import AnimatedCounter from "../AnimatedCounter.jsx";

export default function KpiCard({ icon: Icon, label, value, prefix = "", suffix = "", decimals = 0, accent = "indigo" }) {
  const accentClasses = {
    indigo: "text-indigo-soft bg-indigo/10",
    cyan: "text-cyan bg-cyan/10",
    amber: "text-amber bg-amber/10",
  };

  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <div className={`p-2 rounded-lg ${accentClasses[accent]}`}>
          <Icon size={16} />
        </div>
      </div>
      <div className="text-2xl font-display font-semibold mt-3">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
    </GlassCard>
  );
}
