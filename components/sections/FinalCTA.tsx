"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Phone } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

export function FinalCTA() {
  const t = useTranslations("cta");
  return (
    <section className="noise-bg relative overflow-hidden bg-[var(--verde-800)] text-white">
      <div aria-hidden className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_25%_30%,var(--gold-500),transparent_55%),radial-gradient(circle_at_75%_70%,var(--verde-500),transparent_55%)]" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="container-wide relative py-24 md:py-32 text-center"
      >
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-4xl mx-auto">
          {t("finalTitle")}
        </h2>
        <p className="mt-5 text-white/70 text-lg max-w-2xl mx-auto">
          {t("finalSubtitle")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={FIRM.bookingHref} className="cta-gold text-base">
            {t("scheduleCTA")}
          </a>
          <a
            href={FIRM.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-outline text-base"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a href={FIRM.phoneHref} className="cta-outline text-base border-white/40 text-white hover:bg-white hover:text-[var(--verde-950)]">
            <Phone size={18} /> {FIRM.phoneDisplay}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
