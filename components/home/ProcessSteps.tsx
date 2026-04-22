"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, FileSearch, FileCheck2, Gavel } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp, easeOut } from "@/lib/animations";

const steps = [
  { key: "step1", icon: Phone },
  { key: "step2", icon: FileSearch },
  { key: "step3", icon: FileCheck2 },
  { key: "step4", icon: Gavel },
];

export function ProcessSteps() {
  const t = useTranslations("process");

  return (
    <section className="noise-bg bg-verde-950 text-white section-y">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="container-wide"
      >
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2
          className="mt-3 font-heading"
        >
          {t("title")}
        </h2>
        <GoldAccentLine className="mt-5" />
      </motion.div>

      {/* Desktop: horizontal timeline */}
      <div className="container-wide mt-10 md:mt-12 hidden lg:block">
        <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] items-start">
          {steps.map((step, i) => (
            <Fragment key={step.key}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.6, ease: easeOut }}
                className="flex flex-col items-center text-center px-4 max-w-[240px] mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.6,
                    ease: easeOut,
                  }}
                  className="group w-16 h-16 rounded-full border-2 border-gold-500 grid place-items-center transition-colors duration-300 hover:bg-gold-500"
                >
                  <span className="text-2xl font-heading text-gold-500 group-hover:text-verde-950 transition-colors duration-300">
                    {i + 1}
                  </span>
                </motion.div>
                <step.icon className="text-gold-500/60 mt-4" size={22} />
                <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {t(`${step.key}.desc`)}
                </p>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.6 + 0.4,
                    ease: easeOut,
                  }}
                  style={{ transformOrigin: "0% 50%" }}
                  className="h-[2px] bg-gradient-to-r from-gold-500/40 to-gold-500/40 mt-8"
                  aria-hidden
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="container-wide mt-10 md:mt-12 lg:hidden relative">
        <div
          aria-hidden
          className="absolute left-8 top-8 bottom-8 w-[2px] bg-gold-500/20"
        />
        <ol className="space-y-10">
          {steps.map((step, i) => (
            <motion.li
              key={step.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: easeOut }}
              className="relative pl-20"
            >
              <div className="absolute left-0 top-0 w-16 h-16 rounded-full border-2 border-gold-500 bg-verde-950 grid place-items-center">
                <span className="text-2xl font-heading text-gold-500">{i + 1}</span>
              </div>
              <div className="pt-2">
                <step.icon className="text-gold-500/60 mb-3" size={20} />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {t(`${step.key}.desc`)}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
