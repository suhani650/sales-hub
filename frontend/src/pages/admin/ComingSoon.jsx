import GlassCard from "../../components/GlassCard.jsx";

export default function ComingSoon({ title }) {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">{title}</h1>
      <GlassCard tilt={false} className="text-sm text-muted">
        This module is scaffolded in the schema and API but not yet built in the UI —
        next up after the Vendor and Customer portals.
      </GlassCard>
    </div>
  );
}
