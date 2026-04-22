"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";

const STORAGE_KEY = "verde-loaded";
const DISPLAY_MS = 1800;

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    // Shown once per session. If reduced motion: skip entirely.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyLoaded = sessionStorage.getItem(STORAGE_KEY) === "true";

    if (reduced || alreadyLoaded) return;

    setVisible(true);
    sessionStorage.setItem(STORAGE_KEY, "true");

    const timer = setTimeout(() => setVisible(false), DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // During SSR and the first client tick we render nothing, so the
  // loader cannot cause a hydration mismatch. It only appears when
  // state says so.
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-verde-950 grid place-items-center"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo size="lg" />
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] bg-gold-500 mt-8"
              aria-hidden
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
