"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Play, Instagram, Youtube, Music2 } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { FIRM } from "@/lib/constants";
import { container, child, fadeUp } from "@/lib/animations";

export function VideoShowcase() {
  const t = useTranslations("videoShowcase");
  const videos = ["v1", "v2", "v3"];
  const socials = [
    { id: "tiktok", icon: Music2, href: FIRM.social.tiktok, count: "61K+" },
    { id: "instagram", icon: Instagram, href: FIRM.social.instagram, count: "32K+" },
    { id: "youtube", icon: Youtube, href: FIRM.social.youtube, count: "4.8K+" },
  ];

  return (
    <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="container-wide">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2 className="mt-3 font-display" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.06 }}>
          {t("title")}
        </h2>
        <GoldAccentLine className="mt-5" />
        <p className="mt-6 text-[var(--text-dark-secondary)] max-w-2xl">{t("subtitle")}</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="container-wide mt-12 grid md:grid-cols-3 gap-6"
      >
        {videos.map((v) => (
          <motion.a
            key={v}
            variants={child}
            href={FIRM.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[var(--verde-800)] block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,169,81,0.25),transparent_55%)]" />
            <div className="absolute inset-0 grid place-items-center text-white group-hover:scale-110 transition-transform duration-500">
              <span className="grid place-items-center rounded-full bg-[var(--gold-500)] text-[var(--verde-950)]" style={{ width: 64, height: 64 }}>
                <Play size={24} className="translate-x-0.5" fill="currentColor" />
              </span>
            </div>
            <div className="absolute bottom-5 inset-x-5 text-white">
              <p className="text-xs text-[var(--gold-500)] uppercase tracking-[0.18em] font-semibold">
                {t(`videos.${v}.cat`)}
              </p>
              <p className="mt-1 font-display text-lg leading-tight">
                {t(`videos.${v}.title`)}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="container-wide mt-10 flex flex-wrap items-center justify-center gap-3">
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-black/10 hover:border-[var(--gold-500)] transition-colors"
          >
            <s.icon size={18} className="text-[var(--verde-800)]" />
            <span className="text-sm font-semibold">
              {t(`social.${s.id}`)}
              <span className="ml-2 text-[var(--gold-600)]">{s.count}</span>
            </span>
          </a>
        ))}
      </motion.div>
    </section>
  );
}
