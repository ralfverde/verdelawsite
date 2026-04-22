"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Languages, MapPin, Gift, Smartphone } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { container, child, fadeUp } from "@/lib/animations";

const reasons = [
  { key: "bilingual", icon: Languages },
  { key: "national", icon: MapPin },
  { key: "free", icon: Gift },
  { key: "tech", icon: Smartphone },
];

export function WhyVerde() {
  const t = useTranslations("whyVerde");
  return (
    <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
      <div className="container-wide grid lg:grid-cols-[1fr_1fr] gap-14 items-start">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-[var(--verde-950)]" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.06 }}>
            {t("title")}
          </h2>
          <GoldAccentLine className="mt-5" />
          <p className="mt-7 text-[var(--text-dark-secondary)] leading-relaxed max-w-lg">
            {t("body1")}
          </p>
          <p className="mt-4 text-[var(--text-dark-secondary)] leading-relaxed max-w-lg">
            {t("body2")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.key}
              variants={child}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="card-accent p-6 flex gap-5 items-start"
            >
              <span className="shrink-0 grid place-items-center rounded-lg bg-[var(--verde-800)]/10 text-[var(--verde-800)]" style={{ width: 48, height: 48 }}>
                <r.icon size={22} />
              </span>
              <div>
                <h3 className="font-display text-xl text-[var(--verde-950)]">
                  {t(`reasons.${r.key}.title`)}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-dark-secondary)] leading-relaxed">
                  {t(`reasons.${r.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
