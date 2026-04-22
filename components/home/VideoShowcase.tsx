"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play, Instagram, Youtube, Music2 } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { FIRM } from "@/lib/constants";
import { staggerContainer, staggerChild, fadeUp } from "@/lib/animations";

export function VideoShowcase() {
  const t = useTranslations("videoShowcase");
  const videos = ["v1", "v2", "v3"];
  const socials = [
    { id: "tiktok", icon: Music2, href: FIRM.social.tiktok, count: "61K" },
    { id: "instagram", icon: Instagram, href: FIRM.social.instagram, count: "32K" },
    { id: "youtube", icon: Youtube, href: FIRM.social.youtube, count: "4.8K" },
  ];

  return (
    <section className="bg-cream text-verde-950 section-y">
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
        <p className="mt-6 text-verde-950/60 max-w-2xl leading-relaxed">{t("subtitle")}</p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="container-wide mt-12 grid md:grid-cols-3 gap-6"
      >
        {videos.map((v) => (
          <motion.a
            key={v}
            variants={staggerChild}
            href={FIRM.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video rounded-xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-verde-800 to-verde-900 cursor-pointer"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,169,81,0.18),transparent_55%)]"
            />

            <div className="absolute inset-0 grid place-items-center">
              <span className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 grid place-items-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                <Play size={22} className="text-white translate-x-0.5" fill="currentColor" />
              </span>
            </div>

            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
            />

            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gold-500 block mb-1">
                {t(`videos.${v}.cat`)}
              </span>
              <p className="text-sm font-medium text-white leading-snug">
                {t(`videos.${v}.title`)}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container-wide mt-8 flex flex-wrap items-center justify-center gap-6"
      >
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-verde-950/60 hover:text-gold-600 transition-colors"
          >
            <s.icon size={16} />
            <span>
              {t(`social.${s.id}`)} <span className="text-gold-600 font-semibold ml-1">{s.count}</span>
            </span>
          </a>
        ))}
      </motion.div>
    </section>
  );
}
