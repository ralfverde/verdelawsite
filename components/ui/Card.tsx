"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "dark" | "light" | "accent";
  hover?: boolean;
  className?: string;
  as?: "div" | "article" | "a";
  href?: string;
};

export function Card({
  children,
  variant = "dark",
  hover = true,
  className = "",
  as = "div",
}: Props) {
  const base =
    variant === "light"
      ? "card-light"
      : variant === "accent"
      ? "card-accent"
      : "card-dark";
  const Tag = as;

  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`${base} ${className}`}
    >
      <Tag className="block p-8 h-full">{children}</Tag>
    </motion.div>
  );
}
