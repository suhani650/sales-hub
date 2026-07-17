import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";

const ITEMS = [
  { q: "Can I self-host SALESHUB?", a: "Yes — the backend ships with a Dockerfile and docker-compose config for a self-managed MySQL deployment." },
  { q: "Which payment gateways are supported?", a: "Stripe and Razorpay are integrated out of the box; the payments model is provider-agnostic." },
  { q: "Does it support multiple currencies and languages?", a: "Yes, both are handled at the storefront layer and configurable per vendor region." },
  { q: "How is vendor commission calculated?", a: "Per-vendor commission percentage is stored on the vendor record and applied per order item automatically." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-28">
      <p className="font-mono text-xs tracking-[0.2em] text-cyan uppercase mb-3 text-center">FAQ</p>
      <h2 className="font-display text-4xl font-semibold tracking-tight text-center mb-14">Common questions</h2>

      <div className="space-y-3">
        {ITEMS.map((item, idx) => (
          <div key={item.q} className="glass rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === idx ? -1 : idx)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span className="font-medium">{item.q}</span>
              <motion.span animate={{ rotate: open === idx ? 180 : 0 }}>
                <HiChevronDown className="text-muted" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 overflow-hidden"
                >
                  <p className="text-sm text-muted pb-5">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
