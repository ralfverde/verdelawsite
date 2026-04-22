"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Route, BarChart3, Sparkles, MessagesSquare, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { staggerContainer, staggerChild, fadeUp } from "@/lib/animations";

const features = [
  { key: "caseTracker", icon: Route },
  { key: "judgeStats", icon: BarChart3 },
  { key: "aiAssistant", icon: Sparkles },
  { key: "community", icon: MessagesSquare },
];

export function VerdePlusTeaser() {
  const t = useTranslations("verdePlusTeaser");

  return (
    <section className="noise-bg relative bg-gradient-to-b from-verde-900 via-verde-950 to-verde-950 text-white section-y border-t-2 border-gold-500/30 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,169,81,0.08),transparent_55%),radial-gradient(circle_at_80%_120%,rgba(90,173,138,0.08),transparent_55%)]"
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="container-wide relative text-center max-w-3xl mx-auto"
      >
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2
          className="mt-3 font-display"
          style={{ fontSize: "clamp(2rem, 4.2vw, 3.75rem)", lineHeight: 1.05 }}
        >
          {t("title")}
        </h2>
        <div className="flex justify-center mt-5">
          <GoldAccentLine />
        </div>
        <p className="mt-6 text-white/60 text-lg leading-relaxed">{t("subtitle")}</p>
      </motion.div>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="container-wide relative mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
      >
        {features.map((f) => (
          <motion.li
            key={f.key}
            variants={staggerChild}
            className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center transition-colors duration-300 hover:border-gold-500/20 hover:bg-white/[0.06]"
          >
            <span className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gold-500/10 grid place-items-center">
              <f.icon className="text-gold-500" size={20} />
            </span>
            <p className="text-sm font-semibold text-white">
              {t(`features.${f.key}.title`)}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container-wide relative mt-12 flex justify-center"
      >
        <Link href="/verde-plus" className="cta-outline">
          {t("cta")} <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}
