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
};

export function SectionWrapper({
  children,
  className = "",
  as: Tag = "section",
  id,
  ariaLabel,
  width = "wide",
  padded = true,
}: Props) {
  const wrapperClass = width === "narrow" ? "container-narrow" : "container-wide";
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={`relative ${padded ? "section-y" : ""} ${className}`}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={wrapperClass}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
