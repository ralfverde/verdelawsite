"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Follow strength as a fraction of cursor distance. Default 0.15 (15%). */
  strength?: number;
};

/**
 * Wraps a button/link (as `children`) and makes it subtly follow the
 * cursor while hovered. The wrapper is a motion.span with
 * `display: inline-block` so the child's layout, focus ring, and
 * hover states remain native. On touch / pen devices the effect is
 * suppressed via a `(hover: hover) and (pointer: fine)` media query.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.15,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (!enabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    setPosition({ x, y });
  }

  function handleLeave() {
    setPosition({ x: 0, y: 0 });
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? handleLeave : undefined}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.2 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
