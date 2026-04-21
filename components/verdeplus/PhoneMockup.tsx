"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PhoneMockup({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`relative mx-auto w-[260px] h-[520px] rounded-[42px] border-[10px] border-[var(--verde-800)] bg-[var(--verde-950)] overflow-hidden shadow-2xl ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(200,169,81,0.22),transparent_55%)]" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[var(--verde-900)] rounded-full" />
      <div className="relative p-6 pt-10 flex flex-col gap-3 text-white">
        {children}
      </div>
    </motion.div>
  );
}
