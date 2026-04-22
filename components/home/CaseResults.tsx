"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { staggerContainer, staggerChild, fadeUp } from "@/lib/animations";

const resultIds = ["r1", "r2", "r3"] as const;

export function CaseResults() {
  const t = useTranslations("caseResults");

  return (
    <section className="bg-cream text-verde-950 py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="container-wide"
      >
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2
          className="mt-3 font-heading text-verde-950"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.06 }}
        >
          {t("title")}
        </h2>
        <GoldAccentLine className="mt-5" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="container-wide mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {resultIds.map((id) => (
          <motion.article
            key={id}
            variants={staggerChild}
            className="bg-white rounded-xl p-6 border border-verde-950/[0.04] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <span className="inline-flex self-start px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider">
              {t(`items.${id}.type`)}
            </span>
            <h3 className="my-3 text-lg font-heading text-verde-950 leading-snug">
              {t(`items.${id}.headline`)}
            </h3>
            <p className="text-sm text-verde-950/50 leading-relaxed flex-1">
              {t(`items.${id}.desc`)}
            </p>
            <p className="text-xs text-verde-950/30 mt-4 pt-4 border-t border-verde-950/[0.06]">
              {t("resultLabel")} {t(`items.${id}.date`)}. {t("everyCase")}
            </p>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-xs text-verde-950/30 text-center mt-8 max-w-2xl mx-auto px-6"
      >
        {t("disclaimer")}
      </motion.p>
    </section>
  );
}
