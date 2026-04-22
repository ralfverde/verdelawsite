"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  children: string | ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  style?: CSSProperties;
  /** Per-word stagger in seconds. Default 0.04. */
  stagger?: number;
  /** If false the reveal animates once on mount (no viewport gate). */
  whileInView?: boolean;
};

const container: Variants = {
  hidden: {},
  visible: (staggerChildren: number = 0.04) => ({
    transition: { staggerChildren, delayChildren: 0.05 },
  }),
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * TextReveal — splits a string into words, wraps each in an
 * overflow-hidden mask, and slides each word up from below on entry.
 * Can be rendered as any heading-level element via `as`.
 */
export function TextReveal({
  children,
  as = "h1",
  className = "",
  style,
  stagger = 0.04,
  whileInView = true,
}: Props) {
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");
  const Tag = motion[as] as ElementType;

  const viewportProps = whileInView
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      }
    : {
        initial: "hidden",
        animate: "visible",
      };

  return (
    <Tag
      className={className}
      style={style}
      variants={container}
      custom={stagger}
      {...viewportProps}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.08em]"
        >
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
