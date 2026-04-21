"use client";

import { motion } from "framer-motion";

export function GoldAccentLine({
  width = 80,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`h-[2px] bg-[var(--gold-500)] ${className}`}
      initial={{ width: 0 }}
      whileInView={{ width }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      aria-hidden
    />
  );
}
