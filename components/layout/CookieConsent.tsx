"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("cookies_ok")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookies_ok", "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label={t("ariaLabel")}
          className="fixed inset-x-0 z-50 bottom-[60px] lg:bottom-0 bg-[var(--verde-950)]/95 backdrop-blur-md border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6 px-4 md:px-6 py-3">
            <p className="text-sm text-white/60 leading-relaxed flex-1">
              {t("message")}
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="/privacy"
                className="text-sm text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
              >
                {t("learnMore")}
              </a>
              <button
                type="button"
                onClick={accept}
                className="bg-[var(--gold-500)] hover:bg-[var(--gold-400)] text-[var(--verde-950)] text-sm font-semibold px-5 py-2 rounded-full transition-colors"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
