"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  value: number;
  /** Total animation length. Default 1500ms. */
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/**
 * CountUp with a subtle slot-machine ramp:
 *  - Phase 1 (67% of duration): ticks through random intermediate
 *    values every ~50ms, in the ballpark of the target.
 *  - Phase 2 (remaining 33%): eases from the last random value to
 *    the final target with a cubic ease-out.
 * Respects prefers-reduced-motion by snapping straight to the target.
 */
export function CountUp({
  value,
  duration = 1500,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(value);
      return;
    }

    const RANDOM_RATIO = 0.67;
    const randomMs = Math.round(duration * RANDOM_RATIO);
    const settleMs = duration - randomMs;

    let lastRandom = 0;

    const randomTimer = setInterval(() => {
      // Keep the tick range visually close to the target so the
      // transition into the settle phase isn't jarring.
      const jitter = Math.random() * value * 1.1;
      lastRandom = jitter;
      setDisplay(jitter);
    }, 50);

    let raf: number | undefined;

    const stopRandom = setTimeout(() => {
      clearInterval(randomTimer);
      const settleStart = performance.now();
      const from = lastRandom;
      function step(now: number) {
        const t = Math.min(1, (now - settleStart) / settleMs);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(from + (value - from) * eased);
        if (t < 1) raf = requestAnimationFrame(step);
        else setDisplay(value);
      }
      raf = requestAnimationFrame(step);
    }, randomMs);

    return () => {
      clearInterval(randomTimer);
      clearTimeout(stopRandom);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [inView, value, duration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
