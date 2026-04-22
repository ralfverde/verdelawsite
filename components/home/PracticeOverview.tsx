"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, Home, Scale, Users, Heart, Award, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { staggerContainer, staggerChild, fadeUp } from "@/lib/animations";

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
          className="mt-3 font-heading text-white"
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
        className="container-wide mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cards.map((c) => (
          <motion.div
            key={c.key}
            variants={staggerChild}
            className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-gold-500/20 rounded-xl p-8 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="w-12 h-12 rounded-lg bg-gold-500/10 grid place-items-center mb-5 transition-colors duration-300">
              <c.icon
                className="text-gold-500/60 group-hover:text-gold-500 transition-colors duration-300"
                size={24}
              />
            </div>
            <h3 className="font-heading text-xl text-white mb-3">
              {t(`cards.${c.key}.title`)}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              {t(`cards.${c.key}.desc`)}
            </p>
            <Link
              href={`/practice-areas/${c.slug}` as never}
              className="link-underline inline-flex items-center gap-2 text-sm font-medium text-gold-500"
            >
              {t("learnMore")}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container-wide mt-8 text-center"
      >
        <Link
          href="/practice-areas"
          className="link-underline inline-flex items-center gap-2 text-gold-500 font-medium"
        >
          {t("viewAll")} <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
