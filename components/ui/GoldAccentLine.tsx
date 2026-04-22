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
      className={`h-[2px] bg-gradient-to-r from-[var(--gold-500)] to-[var(--gold-400)] ${className}`}
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    />
  );
}
