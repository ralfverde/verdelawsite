"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Route, BarChart3, Sparkles, MessagesSquare, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { container, child, fadeUp } from "@/lib/animations";

const features = [
  { key: "caseTracker", icon: Route },
  { key: "judgeStats", icon: BarChart3 },
  { key: "aiAssistant", icon: Sparkles },
  { key: "community", icon: MessagesSquare },
];

export function VerdePlusTeaser() {
  const t = useTranslations("verdePlusTeaser");

  return (
    <section className="relative bg-[var(--verde-950)] text-white section-y border-t-2 border-[var(--gold-500)]/60 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,169,81,0.12),transparent_55%),radial-gradient(circle_at_80%_120%,rgba(90,173,138,0.14),transparent_55%)]" />

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="container-wide relative">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2 className="mt-3 font-display" style={{ fontSize: "clamp(32px,4.2vw,60px)", lineHeight: 1.05 }}>
          {t("title")}
        </h2>
        <GoldAccentLine className="mt-5" />
        <p className="mt-6 text-white/75 max-w-2xl text-lg">{t("subtitle")}</p>
      </motion.div>

      <div className="container-wide relative mt-12 grid lg:grid-cols-[1fr_0.8fr] gap-14 items-center">
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {features.map((f) => (
            <motion.li key={f.key} variants={child} className="card-dark p-6">
              <f.icon className="text-[var(--gold-500)]" size={24} />
              <p className="mt-4 font-display text-xl">{t(`features.${f.key}.title`)}</p>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">
                {t(`features.${f.key}.desc`)}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto"
        >
          <div className="relative w-[240px] h-[460px] rounded-[36px] border-[10px] border-[var(--verde-800)] bg-[var(--verde-950)] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(200,169,81,0.25),transparent_55%)]" />
            <div className="absolute inset-0 p-5 flex flex-col gap-3">
              <div className="h-3 w-16 rounded-full bg-[var(--gold-500)]/60" />
              <div className="h-4 w-32 rounded bg-white/60" />
              <div className="mt-4 h-20 rounded-xl bg-white/5 border border-white/10" />
              <div className="h-16 rounded-xl bg-[var(--gold-500)]/30 border border-[var(--gold-500)]/50" />
              <div className="h-10 rounded-xl bg-white/5 border border-white/10" />
              <div className="h-10 rounded-xl bg-white/5 border border-white/10" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="container-wide relative mt-14 flex justify-center">
        <Link href="/verde-plus" className="cta-gold">
          {t("cta")} <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}
