"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Phone } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

export function FinalCTA() {
  const t = useTranslations("cta");
  return (
    <section className="noise-bg relative overflow-hidden bg-verde-800 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,81,0.08),transparent_70%)]"
      />
      <FloatingOrbs />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container-wide relative py-24 md:py-32 text-center"
      >
        <TextReveal
          as="h2"
          className="font-heading text-white text-center leading-tight mb-4"
        >
          {t("finalTitle")}
        </TextReveal>
        <p className="text-lg text-white/50 text-center max-w-2xl mx-auto mb-10">
          {t("finalSubtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <a href={FIRM.bookingHref} className="cta-gold text-base px-8 py-4">
              {t("scheduleCTA")}
            </a>
          </MagneticButton>
          <a
            href={FIRM.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-outline text-base px-7 py-4"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a
            href={FIRM.phoneHref}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 py-3"
          >
            <Phone size={18} /> {FIRM.phoneDisplay}
          </a>
        </div>

        <p className="text-xs text-white/25 text-center mt-8 max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </motion.div>
    </section>
  );
}
