"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { FIRM } from "@/lib/constants";

type Props = {
  serviceTitle: string;
};

/**
 * Desktop-only floating CTA card shown on practice-area detail pages
 * after the user has scrolled past the hero (~600px) and hidden
 * again once the page-bottom FinalCTA enters view (so we don't
 * double-up with it).
 */
export function StickySidebar({ serviceTitle }: Props) {
  const tNav = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      const y = window.scrollY;
      const h = window.innerHeight;
      const doc = document.documentElement.scrollHeight;
      const show = y > 600 && y + h < doc - 500;
      setVisible(show);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="sticky-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-30 w-[220px] bg-verde-950 rounded-xl p-5 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
          aria-label={serviceTitle}
        >
          <p className="text-sm text-white/50 mb-4 leading-snug">
            {serviceTitle}
          </p>

          <a
            href={FIRM.bookingHref}
            className="cta-gold text-sm py-2.5 px-4 w-full justify-center"
          >
            {tNav("freeConsultation")}
          </a>

          <a
            href={FIRM.phoneHref}
            className="block mt-3 text-center text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            {FIRM.phoneDisplay}
          </a>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
