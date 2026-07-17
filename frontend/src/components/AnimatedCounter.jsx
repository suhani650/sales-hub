import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

export default function AnimatedCounter({ value = 0, prefix = "", suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <motion.span ref={ref} className="font-mono tabular-nums">
      {rounded}
    </motion.span>
  );
}
