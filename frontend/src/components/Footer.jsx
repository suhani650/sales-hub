import { motion } from "framer-motion";
import { HiOutlineSquares2X2 } from "react-icons/hi2";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-16"
        >
          <div>
            <h3 className="font-display text-2xl font-semibold">Get product updates</h3>
            <p className="text-muted text-sm mt-1">One email a month. No noise.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@company.com"
              className="bg-panel2 border border-white/10 rounded-xl px-4 py-2.5 text-sm w-full md:w-72 focus:outline-none focus:border-indigo/50"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 font-display font-semibold text-lg mb-3">
              <HiOutlineSquares2X2 className="text-indigo" /> SALESHUB
            </div>
            <p className="text-muted text-sm">The command console for multi-vendor commerce.</p>
          </div>
          {["Product", "Company", "Legal"].map((col) => (
            <div key={col}>
              <div className="text-ink font-medium mb-3">{col}</div>
              <ul className="space-y-2 text-muted">
                <li className="hover:text-ink transition-colors cursor-pointer">Overview</li>
                <li className="hover:text-ink transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-ink transition-colors cursor-pointer">Support</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-muted mt-14">
          © {new Date().getFullYear()} SALESHUB. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
