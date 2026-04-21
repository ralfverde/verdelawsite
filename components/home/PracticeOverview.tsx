"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, Home, Scale, Users, Heart, Award, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { container, child, fadeUp } from "@/lib/animations";

const cards = [
  { key: "deportation", icon: Shield, slug: "deportation-defense" },
  { key: "asylum", icon: Home, slug: "asylum" },
  { key: "bond", icon: Scale, slug: "bond-hearing" },
  { key: "family", icon: Users, slug: "family-petitions" },
  { key: "vawaU", icon: Heart, slug: "vawa" },
  { key: "naturalization", icon: Award, slug: "naturalization" },
];

export function PracticeOverview() {
  const t = useTranslations("practiceOverview");
  return (
    <section className="bg-[var(--verde-950)] text-white section-y">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="container-wide"
      >
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2 className="mt-3 font-display text-white" style={{ fontSize: "clamp(32px,4.2vw,56px)", lineHeight: 1.06 }}>
          {t("title")}
        </h2>
        <GoldAccentLine className="mt-5" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="container-wide mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {cards.map((c) => (
          <motion.div
            key={c.key}
            variants={child}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="card-dark p-8"
          >
            <c.icon className="text-[var(--gold-500)]" size={28} />
            <h3 className="mt-5 font-display text-white text-2xl">
              {t(`cards.${c.key}.title`)}
            </h3>
            <p className="mt-3 text-white/65 text-sm leading-relaxed min-h-[48px]">
              {t(`cards.${c.key}.desc`)}
            </p>
            <Link
              href={`/practice-areas/${c.slug}` as never}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-500)] hover:gap-3 transition-all"
            >
              {t("learnMore")} <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container-wide mt-10 text-center"
      >
        <Link
          href="/practice-areas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-500)] border-b border-[var(--gold-500)]/40 pb-1 hover:border-[var(--gold-500)]"
        >
          {t("viewAll")} <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
