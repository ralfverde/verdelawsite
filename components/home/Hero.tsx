"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, ChevronDown, Shield, Globe, BadgeCheck } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { easeOut } from "@/lib/animations";

export function Hero() {
  const t = useTranslations("hero");

  const trustBadges = [
    { key: "cases", icon: BadgeCheck },
    { key: "states", icon: Globe },
    { key: "free", icon: Shield },
  ];

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[var(--verde-950)] text-white flex items-center"
      aria-label="Hero"
    >
      {/* Radial gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-900)_0%,var(--verde-950)_70%)]"
      />
      <div className="noise-overlay" aria-hidden />

      <div className="container-wide relative grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center pt-32 pb-24 lg:py-40">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
            className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gold-500)]"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
            className="mt-6 font-display text-white"
            style={{ fontSize: "clamp(36px, 5.2vw, 72px)", lineHeight: 1.04 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
            className="mt-6 text-white/70 max-w-xl text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: easeOut }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href={FIRM.bookingHref} className="cta-gold text-base">
              {t("ctaPrimary")}
            </a>
            <a
              href={FIRM.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-outline text-base"
            >
              <MessageCircle size={18} /> {t("ctaWhatsApp")}
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-xl"
          >
            {trustBadges.map((b, i) => (
              <motion.li
                key={b.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <b.icon className="text-[var(--gold-500)] shrink-0" size={18} />
                <span className="text-sm text-white/75">{t(`badges.${b.key}`)}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Right: stylized portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: easeOut }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(200,169,81,0.28),transparent_55%)]"
            />
            {/* Silhouette */}
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 w-full h-full"
              aria-label="Rafael Verde portrait placeholder"
              role="img"
            >
              <defs>
                <linearGradient id="sil" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2D5E47" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0A1F15" />
                </linearGradient>
              </defs>
              <ellipse cx="200" cy="180" rx="80" ry="90" fill="url(#sil)" />
              <path
                d="M80 500 Q80 340 200 310 Q320 340 320 500 Z"
                fill="url(#sil)"
              />
            </svg>
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[var(--verde-950)] to-transparent">
              <p className="text-xs text-[var(--gold-500)] uppercase tracking-[0.18em] font-semibold">
                {t("portraitName")}
              </p>
              <p className="text-white text-sm mt-1 italic">{t("portraitRole")}</p>
            </div>
          </div>
          {/* Decorative vertical gold line */}
          <div
            aria-hidden
            className="absolute -left-6 top-10 bottom-10 w-[2px] bg-gradient-to-b from-transparent via-[var(--gold-500)] to-transparent hidden lg:block"
          />
          {/* Geometric accent */}
          <div
            aria-hidden
            className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full border border-[var(--verde-700)] hidden lg:block"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
        aria-hidden
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
