"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp, slideInRight, easeOut } from "@/lib/animations";

export function AttorneyFeature() {
  const t = useTranslations("attorneyFeature");
  const credentials = ["georgetown", "aila", "floridaBar", "eleventhCircuit"];

  return (
    <section className="noise-bg bg-verde-950 text-white section-y">
      <div className="container-wide grid lg:grid-cols-[0.8fr_1fr] gap-14 lg:gap-20 items-center">
        {/* Rafael Verde headshot */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(13,43,30,0.4)] max-w-md w-full mx-auto lg:mx-0"
        >
          <Image
            src="/images/rafael-verde-hero.png"
            alt={`${t("name")}, ${t("role")}`}
            width={480}
            height={720}
            className="w-full h-auto object-cover"
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, 100vw"
          />
        </motion.div>

        {/* Copy */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionEyebrow className="mb-3">{t("eyebrow")}</SectionEyebrow>
          <h2
            className="font-heading text-white mb-2"
          >
            {t("name")}
          </h2>
          <p className="text-lg text-gold-500 mb-6">{t("role")}</p>
          <GoldAccentLine className="mb-6" />

          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
          </div>

          <ul className="mt-8 space-y-2">
            {credentials.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
                className="flex items-start gap-3"
              >
                <span className="w-4 h-[2px] bg-gold-500 mt-2.5 shrink-0" aria-hidden />
                <span className="text-sm text-white/50">{t(`credentials.${c}`)}</span>
              </motion.li>
            ))}
          </ul>

          <Link
            href="/our-team"
            className="link-underline inline-flex items-center gap-2 mt-8 text-gold-500 font-medium"
          >
            {t("viewTeam")} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
