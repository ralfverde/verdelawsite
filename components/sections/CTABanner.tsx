"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

type Props = {
  variant?: "dark" | "light";
  titleKey?: string;
};

export function CTABanner({ variant = "dark", titleKey = "bannerDark.title" }: Props) {
  const t = useTranslations("cta");

  const isDark = variant === "dark";

  return (
    <section aria-label="Call to action" className={isDark ? "noise-bg bg-[var(--verde-800)]" : "bg-[var(--cream)]"}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="container-wide py-10 md:py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div className="flex items-start gap-4 max-w-3xl">
          <span className={`shrink-0 grid place-items-center rounded-lg ${isDark ? "bg-white/10 text-[var(--gold-500)]" : "bg-[var(--verde-800)] text-[var(--gold-500)]"}`} style={{ width: 48, height: 48 }}>
            <ShieldCheck size={22} />
          </span>
          <div>
            <h3 className={`font-heading text-2xl md:text-3xl ${isDark ? "text-white" : "text-[var(--verde-950)]"}`}>
              {t(titleKey)}
            </h3>
            <p className={`mt-1 text-sm ${isDark ? "text-white/65" : "text-[var(--text-dark-secondary)]"}`}>
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a href={FIRM.bookingHref} className="cta-gold text-sm">
            {t("freeConsultation")}
          </a>
          {isDark ? (
            <a
              href={FIRM.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-outline text-sm"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          ) : (
            <a href={FIRM.phoneHref} className="cta-outline text-sm">
              <Phone size={16} /> {FIRM.phoneDisplay}
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
