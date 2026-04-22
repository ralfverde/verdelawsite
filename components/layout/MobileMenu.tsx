"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { X, Phone, MessageCircle } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { FIRM } from "@/lib/constants";
import { useEffect } from "react";

type NavItem = { key: string; href: React.ComponentProps<typeof Link>["href"] };

type Props = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  locale: string;
};

export function MobileMenu({ open, onClose, items }: Props) {
  const t = useTranslations("nav");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[60] bg-[var(--verde-950)] lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <span className="text-white font-heading font-bold text-lg tracking-tight">Verde Law</span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("closeMenu")}
              className="p-2 text-white"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col px-6 pt-8 gap-1" aria-label="Mobile">
            {items.map((item, idx) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-4 font-heading font-bold text-4xl tracking-[-0.03em] text-white border-b border-white/5"
                >
                  {t(item.key)}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="absolute inset-x-0 bottom-0 p-6 pt-8 border-t border-white/10 bg-[var(--verde-900)]">
            <LanguageToggle />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={FIRM.phoneHref} className="cta-outline text-sm justify-center">
                <Phone size={16} /> {FIRM.phoneDisplay}
              </a>
              <a
                href={FIRM.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-gold text-sm justify-center"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
            <a
              href={FIRM.bookingHref}
              onClick={onClose}
              className="cta-gold mt-3 w-full justify-center"
            >
              {t("freeConsultation")}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
