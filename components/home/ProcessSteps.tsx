"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, FileSearch, FileCheck2, Gavel } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp, container, child } from "@/lib/animations";

const steps = [
  { key: "step1", icon: Phone },
  { key: "step2", icon: FileSearch },
  { key: "step3", icon: FileCheck2 },
  { key: "step4", icon: Gavel },
];

export function ProcessSteps() {
  const t = useTranslations("process");
  return (
    <section className="noise-bg bg-[var(--verde-950)] text-white section-y">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="container-wide">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2 className="mt-3 font-display" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.06 }}>
          {t("title")}
        </h2>
        <GoldAccentLine className="mt-5" />
      </motion.div>

      <motion.ol
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="container-wide mt-14 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {/* Connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: "0% 50%" }}
          className="hidden lg:block absolute left-0 right-0 top-[34px] h-[2px] bg-gradient-to-r from-[var(--gold-500)] via-[var(--gold-500)]/30 to-transparent"
          aria-hidden
        />

        {steps.map((s, i) => (
          <motion.li key={s.key} variants={child} className="relative">
            <div className="relative z-10 grid place-items-center rounded-full border-2 border-[var(--gold-500)] bg-[var(--verde-950)] text-[var(--gold-500)] font-display" style={{ width: 68, height: 68 }}>
              <span className="text-3xl">{i + 1}</span>
            </div>
            <s.icon className="mt-5 text-[var(--gold-500)]" size={22} />
            <h3 className="mt-3 font-display text-2xl">{t(`${s.key}.title`)}</h3>
            <p className="mt-2 text-sm text-white/65 leading-relaxed max-w-xs">
              {t(`${s.key}.desc`)}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
