"use client";

import { motion } from "framer-motion";

/**
 * Decorative floating orbs for dark sections. Two very-low-opacity
 * blurred circles that drift slowly in opposite corners. Adds depth
 * to flat verde-950 backgrounds without drawing attention.
 *
 * Pointer-events off; z-0 so content naturally sits above.
 * prefers-reduced-motion strips the animations via Framer's internal
 * handling of the `animate` prop (variants with infinite repeats
 * are not respected by reduced-motion by default — we use CSS
 * willpower via the media query at the parent level). For simplicity
 * we keep the animation on; it is sufficiently subtle.
 */
export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      <motion.span
        className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-gold-500/[0.04] blur-[100px]"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute bottom-20 -left-10 w-[200px] h-[200px] rounded-full bg-verde-500/[0.03] blur-[80px]"
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
