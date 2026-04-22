"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp, slideInRight } from "@/lib/animations";

export function AttorneyFeature() {
  const t = useTranslations("attorneyFeature");
  const credentials = ["georgetown", "aila", "floridaBar", "eleventhCircuit"];

  return (
    <section className="noise-bg bg-[var(--verde-950)] text-white section-y">
      <div className="container-wide grid lg:grid-cols-[0.8fr_1fr] gap-14 items-center">
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden max-w-md"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(200,169,81,0.3),transparent_55%)]" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-8xl text-[var(--gold-500)]/40">RV</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xs text-[var(--gold-500)] uppercase tracking-[0.18em] font-semibold">
              {t("photoEyebrow")}
            </p>
            <p className="text-white italic mt-1">Rafael Verde, Esq.</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.04 }}>
            {t("name")}
          </h2>
          <p className="mt-2 text-[var(--gold-500)] font-semibold">{t("role")}</p>
          <GoldAccentLine className="mt-5" />
          <p className="mt-7 text-white/75 leading-relaxed">{t("body1")}</p>
          <p className="mt-4 text-white/75 leading-relaxed">{t("body2")}</p>

          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {credentials.map((c) => (
              <li key={c} className="flex items-center gap-4 py-3">
                <span className="h-[2px] w-6 bg-[var(--gold-500)]" aria-hidden />
                <span className="text-sm">{t(`credentials.${c}`)}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/our-team"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-500)] hover:gap-3 transition-all"
          >
            {t("viewTeam")} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
