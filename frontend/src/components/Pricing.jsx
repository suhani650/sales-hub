import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi2";
import GlassCard from "./GlassCard.jsx";

const TIERS = [
  {
    name: "Starter",
    price: "₹0",
    note: "per vendor / month",
    features: ["Up to 50 SKUs", "Order tracking", "Email support"],
  },
  {
    name: "Growth",
    price: "₹2,499",
    note: "per vendor / month",
    highlighted: true,
    features: ["Unlimited SKUs", "Live chat + push", "Analytics dashboard", "Priority payouts"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "volume pricing",
    features: ["Dedicated infra", "Custom RBAC", "SLA + onboarding", "API access"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-28">
      <div className="max-w-xl mb-14">
        <p className="font-mono text-xs tracking-[0.2em] text-cyan uppercase mb-3">Pricing</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight">Pay for what your vendors sell</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TIERS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <GlassCard
              className={t.highlighted ? "border-indigo/50 shadow-glow relative" : "relative"}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-6 text-xs font-mono bg-indigo px-2 py-0.5 rounded-full">
                  Most picked
                </span>
              )}
              <h3 className="font-display text-lg font-medium">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-display font-semibold">{t.price}</span>
              </div>
              <p className="text-xs text-muted mt-1">{t.note}</p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink/90">
                    <HiCheck className="text-cyan shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className="btn-primary w-full mt-8 justify-center flex">Choose {t.name}</button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
