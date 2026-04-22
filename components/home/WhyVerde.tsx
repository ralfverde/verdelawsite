"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Languages, MapPin, Gift, Smartphone } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp, easeOut } from "@/lib/animations";

const reasons = [
  { key: "bilingual", icon: Languages },
  { key: "national", icon: MapPin },
  { key: "free", icon: Gift },
  { key: "tech", icon: Smartphone },
];

export function WhyVerde() {
  const t = useTranslations("whyVerde");
  return (
    <section className="bg-cream text-verde-950 section-y">
      <div className="container-wide grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start">
        {/* Left — copy */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <SectionEyebrow className="mb-4">{t("eyebrow")}</SectionEyebrow>
          <GoldAccentLine className="mb-6" />
          <h2
            className="font-heading text-verde-950 leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {t("title")}
          </h2>
          <p className="text-verde-950/60 leading-relaxed max-w-lg mb-4">
            {t("body1")}
          </p>
          <p className="text-verde-950/60 leading-relaxed max-w-lg">
            {t("body2")}
          </p>
        </motion.div>

        {/* Right — feature cards */}
        <div className="grid gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.key}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: easeOut }}
              whileHover={{
                y: -2,
                transition: { duration: 0.3, ease: easeOut },
              }}
              className="flex gap-5 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg hover:shadow-verde-950/5 transition-shadow duration-300"
            >
              <div className="w-1 rounded-full bg-gold-500 shrink-0 self-stretch" aria-hidden />
              <span className="w-10 h-10 rounded-lg bg-verde-50 grid place-items-center shrink-0">
                <r.icon size={20} className="text-verde-700" />
              </span>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-verde-950 mb-1">
                  {t(`reasons.${r.key}.title`)}
                </h3>
                <p className="text-sm text-verde-950/50 leading-relaxed">
                  {t(`reasons.${r.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
