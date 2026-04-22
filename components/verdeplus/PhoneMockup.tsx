"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  className?: string;
  /** Subtle y-bob animation (4s loop). */
  float?: boolean;
  /** Desktop-only scroll-linked parallax on the Y axis. */
  parallax?: boolean;
};

/**
 * Realistic phone device frame with a faux app UI. `float` toggles
 * a 4s y-bob; `parallax` ties y-translation to the mockup's own
 * viewport position (enabled only on hover-capable pointers to
 * avoid mobile scrolling jank).
 */
export function PhoneMockup({ className = "", float = false, parallax = false }: Props) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const applyParallax = parallax && desktop;

  const containerAnimation = float
    ? {
        animate: { y: [0, -10, 0] },
        transition: { repeat: Infinity, duration: 4, ease: "easeInOut" as const },
      }
    : undefined;

  return (
    <motion.div
      ref={parallaxRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto ${className}`}
    >
      <motion.div
        style={applyParallax ? { y: parallaxY } : undefined}
        className="relative"
      >
        <motion.div
          {...containerAnimation}
          className="relative mx-auto w-[280px] h-[580px] md:w-[300px] md:h-[620px] p-3 rounded-[40px] bg-verde-950 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
        >
          {/* Soft gold glow behind */}
          <span
            aria-hidden
            className="absolute inset-[-2px] rounded-[42px] bg-gradient-to-b from-gold-500/10 to-transparent -z-10 blur-xl"
          />

          {/* Screen */}
          <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-gradient-to-b from-verde-800 via-verde-900 to-verde-950 border border-white/[0.06] flex flex-col">
            {/* Status bar */}
            <div className="h-6 flex items-center justify-between px-5 pt-2 text-[10px] text-white/30 shrink-0">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="w-1 h-1 rounded-full bg-white/30" />
              </span>
            </div>

            {/* Header */}
            <div className="h-12 flex items-center px-5 border-b border-white/[0.04] shrink-0">
              <span className="text-sm text-white/60 font-display">Verde+</span>
            </div>

            {/* Content cards */}
            <div className="flex-1 py-3 space-y-2 overflow-hidden">
              <div className="mx-4 h-20 rounded-xl bg-white/[0.04] border border-white/[0.04] relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gold-500/20 rounded-r"
                />
                <div className="p-3 pl-5 space-y-2">
                  <div className="h-2 w-20 rounded bg-white/30" />
                  <div className="h-2 w-28 rounded bg-white/15" />
                  <div className="h-2 w-16 rounded bg-gold-500/30" />
                </div>
              </div>
              <div className="mx-4 h-16 rounded-xl bg-white/[0.04] border border-white/[0.04] p-3 space-y-2">
                <div className="h-2 w-24 rounded bg-white/20" />
                <div className="h-2 w-16 rounded bg-white/10" />
              </div>
              <div className="mx-4 h-16 rounded-xl bg-white/[0.04] border border-white/[0.04] p-3 space-y-2">
                <div className="h-2 w-28 rounded bg-white/20" />
                <div className="h-2 w-20 rounded bg-white/10" />
              </div>
              <div className="mx-4 h-16 rounded-xl bg-white/[0.04] border border-white/[0.04] p-3 space-y-2">
                <div className="h-2 w-24 rounded bg-white/20" />
                <div className="h-2 w-14 rounded bg-white/10" />
              </div>
            </div>

            {/* Tab bar */}
            <div className="h-14 border-t border-white/[0.04] flex items-center justify-around shrink-0">
              <span className="w-4 h-4 rounded-full bg-white/[0.06]" />
              <span className="w-4 h-4 rounded-full bg-gold-500/30" />
              <span className="w-4 h-4 rounded-full bg-white/[0.06]" />
              <span className="w-4 h-4 rounded-full bg-white/[0.06]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
