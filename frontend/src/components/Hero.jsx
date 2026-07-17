import { motion } from "framer-motion";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import AnimatedCounter from "./AnimatedCounter.jsx";
import OrbitScene from "./OrbitScene.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <OrbitScene />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="font-mono text-xs tracking-[0.2em] text-cyan uppercase mb-4"
          >
            Live marketplace control tower
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight"
          >
            Every vendor, order,
            <br />
            and rupee —{" "}
            <span className="text-gradient">one orbit.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 text-lg text-muted max-w-md"
          >
            SALESHUB is the command console for multi-vendor commerce — approve
            vendors, watch inventory move, and settle payouts, all in real time.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9 flex items-center gap-4">
            <Link to="/login" className="btn-primary flex items-center gap-2">
              Open the console <HiArrowRight />
            </Link>
            <a href="#features" className="text-sm text-muted hover:text-ink transition-colors">
              See what's inside
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md"
          >
            <div>
              <div className="text-3xl font-display font-semibold">
                <AnimatedCounter value={12400} suffix="+" />
              </div>
              <div className="text-xs text-muted mt-1">Active vendors</div>
            </div>
            <div>
              <div className="text-3xl font-display font-semibold">
                <AnimatedCounter value={2.4} decimals={1} suffix="M" />
              </div>
              <div className="text-xs text-muted mt-1">Orders / month</div>
            </div>
            <div>
              <div className="text-3xl font-display font-semibold">
                <AnimatedCounter value={99.9} decimals={1} suffix="%" />
              </div>
              <div className="text-xs text-muted mt-1">Uptime SLA</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
