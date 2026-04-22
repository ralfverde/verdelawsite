"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  id?: string;
  ariaLabel?: string;
  width?: "wide" | "narrow";
  padded?: boolean;
  dark?: boolean;
};

export function SectionWrapper({
  children,
  className = "",
  as: Tag = "section",
  id,
  ariaLabel,
  width = "wide",
  padded = true,
  dark = false,
}: Props) {
  const wrapperClass = width === "narrow" ? "container-narrow" : "container-wide";
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={`relative ${padded ? "py-24 md:py-32 lg:py-40" : ""} ${dark ? "noise-bg" : ""} ${className}`}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className={wrapperClass}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
