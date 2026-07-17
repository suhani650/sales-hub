import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import GlassCard from "./GlassCard.jsx";

const QUOTES = [
  { name: "Aarav Mehta", role: "UrbanTech Store", quote: "Payout visibility alone cut our reconciliation time from days to minutes." },
  { name: "Priya Nair", role: "FreshMart Wholesale", quote: "The inventory sync during flash sales is the first system that hasn't broken on us." },
  { name: "Rohan Kapoor", role: "StyleHub Fashion", quote: "Onboarding a new SKU catalog took an afternoon instead of a week." },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % QUOTES.length);
  const prev = () => setI((v) => (v - 1 + QUOTES.length) % QUOTES.length);

  return (
    <section id="testimonials" className="max-w-4xl mx-auto px-6 py-28 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-cyan uppercase mb-3">From the console</p>
      <h2 className="font-display text-4xl font-semibold tracking-tight mb-14">What vendors are saying</h2>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard tilt={false} className="py-12">
              <p className="text-xl font-display leading-relaxed">"{QUOTES[i].quote}"</p>
              <div className="mt-6 text-sm text-muted">
                <span className="text-ink font-medium">{QUOTES[i].name}</span> — {QUOTES[i].role}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prev} className="p-2 rounded-full glass hover:border-indigo/40 transition-colors">
            <HiChevronLeft />
          </button>
          <button onClick={next} className="p-2 rounded-full glass hover:border-indigo/40 transition-colors">
            <HiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
