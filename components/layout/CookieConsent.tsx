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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-x-4 bottom-[96px] lg:bottom-6 z-50 max-w-3xl mx-auto bg-[var(--cream)] text-[var(--text-dark)] border border-black/10 rounded-xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4"
          role="dialog"
          aria-label={t("ariaLabel")}
        >
          <p className="text-sm leading-relaxed flex-1">{t("message")}</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={accept}
              className="cta-gold text-sm"
            >
              {t("accept")}
            </button>
            <a href="/privacy" className="text-sm text-[var(--verde-700)] underline underline-offset-4">
              {t("learnMore")}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
