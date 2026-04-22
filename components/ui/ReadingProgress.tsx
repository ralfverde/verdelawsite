"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Reading progress bar, pinned above the navbar. Rendered per-page
 * on long-form content (about, education, practice area detail).
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-gold-500 to-gold-400"
      aria-hidden
    />
  );
}
