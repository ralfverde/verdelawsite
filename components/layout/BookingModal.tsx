"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * GoHighLevel booking calendar in a modal. The calendar itself runs
 * inside an <iframe>; the GHL form-embed.js script is loaded lazily
 * the first time the modal opens (keeps the script off the initial
 * page load).
 *
 * Body scroll is locked while the modal is open. Escape and backdrop
 * clicks both close it.
 */
export default function BookingModal({ isOpen, onClose }: Props) {
  const t = useTranslations("booking");

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Lazy-load the GHL embed script once
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://link.verdelaw.com/js/form_embed.js"]',
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://link.verdelaw.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Close on Escape
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            aria-hidden
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-verde-950 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div>
                  <p className="text-gold-500 text-[10px] font-heading font-semibold tracking-widest uppercase">
                    {t("eyebrow")}
                  </p>
                  <h3 className="font-heading font-bold text-white text-lg tracking-tight mt-0.5">
                    {t("title")}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t("close")}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <iframe
                  title={t("title")}
                  src="https://link.verdelaw.com/widget/booking/1gNnQjpcubf9FRu0BMpU"
                  style={{
                    width: "100%",
                    border: "none",
                    overflow: "hidden",
                    minHeight: "600px",
                  }}
                  scrolling="no"
                  id="ghl-booking-iframe"
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
