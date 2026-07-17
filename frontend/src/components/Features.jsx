import { motion } from "framer-motion";
import {
  HiOutlineChartBar,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi2";
import GlassCard from "./GlassCard.jsx";

const FEATURES = [
  { icon: HiOutlineChartBar, title: "Live revenue analytics", desc: "Per-vendor commission, payout, and trend charts updated in real time." },
  { icon: HiOutlineShoppingBag, title: "Unified catalog control", desc: "Approve listings, manage categories, and track inventory across every vendor." },
  { icon: HiOutlineTruck, title: "Order lifecycle tracking", desc: "From confirmed to delivered, with automatic inventory reconciliation." },
  { icon: HiOutlineChatBubbleLeftRight, title: "Real-Time chat", desc: "Vendors, field officers, and support in one real-time messaging layer." },
  { icon: HiOutlineShieldCheck, title: "Role-based access", desc: "Super Admin, Vendor, Field Officer, and Customer — each with scoped permissions." },
  { icon: HiOutlineSparkles, title: "AI-assisted listings", desc: "Auto-generated product descriptions and smart recommendations." },
];

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mb-14"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-cyan uppercase mb-3">Built for scale</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight">
          Everything a marketplace operator touches daily
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <GlassCard>
              <f.icon className="text-indigo-soft" size={26} />
              <h3 className="font-display font-medium text-lg mt-4">{f.title}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">{f.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
