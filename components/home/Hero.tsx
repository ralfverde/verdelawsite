"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, ChevronDown, Shield, Globe, BadgeCheck, Scale } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { easeOut } from "@/lib/animations";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { LiveIndicator } from "@/components/ui/LiveIndicator";

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on the photo card (foreground) + the radial background
  // layer (slower). Both hooks off a single scrollYProgress scoped to
  // the hero so they freeze once the section leaves the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Hide the scroll indicator after the user has scrolled past 100px.
  const [showScrollCue, setShowScrollCue] = useState(true);
  useEffect(() => {
    const onScroll = () => setShowScrollCue(window.scrollY < 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trustBadges = [
    { key: "cases", icon: BadgeCheck },
    { key: "states", icon: Globe },
    { key: "free", icon: Shield },
  ];

  const title = t("title");

  return (
    <section
      ref={sectionRef}
      className="noise-bg relative min-h-[100svh] overflow-hidden bg-verde-950 text-white flex items-center"
      aria-label="Hero"
    >
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-900)_0%,var(--verde-950)_70%)]"
      />

      <FloatingOrbs />

      <div className="container-wide relative grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20 items-center pt-32 pb-28 lg:py-40">
        {/* Left: copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="eyebrow text-gold-500 mb-6"
          >
            {t("eyebrow")}
          </motion.p>

          <TextReveal
            as="h1"
            whileInView={false}
            className="font-heading text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.08 }}
          >
            {title}
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
            className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: easeOut }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <a href={FIRM.bookingHref} className="cta-gold text-base px-8 py-4">
                {t("ctaPrimary")}
              </a>
            </MagneticButton>
            <a
              href={FIRM.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-outline text-base px-7 py-4"
            >
              <MessageCircle size={18} /> {t("ctaWhatsApp")}
            </a>
          </motion.div>

          {/* Trust badges row */}
          <ul className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row flex-wrap gap-y-5 sm:gap-y-0">
            {trustBadges.map((b, i) => (
              <motion.li
                key={b.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.1, ease: easeOut }}
                className="flex items-center gap-3 sm:pr-8 sm:mr-8 sm:border-r sm:border-white/10 last:border-r-0 last:mr-0 last:pr-0"
              >
                <span className="w-10 h-10 rounded-full bg-gold-500/10 grid place-items-center shrink-0">
                  <b.icon className="text-gold-500" size={18} />
                </span>
                <span className="text-sm font-medium text-white/70">
                  {t(`badges.${b.key}`)}
                </span>
              </motion.li>
            ))}
          </ul>

          <LiveIndicator />
        </div>

        {/* Right: photo placeholder card */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: easeOut }}
          className="relative"
        >
          <motion.div
            style={{ y: photoY }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-verde-700 via-verde-800 to-verde-950 shadow-[0_0_80px_rgba(61,139,110,0.15)]"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(200,169,81,0.18),transparent_55%)]"
            />

            {/* Centered icon */}
            <div className="absolute inset-0 grid place-items-center">
              <Scale size={120} className="text-gold-500/30" strokeWidth={1.25} />
            </div>

            {/* Name block */}
            <div className="absolute left-0 right-0 bottom-6 text-center">
              <p className="font-heading text-white/40 text-2xl">Rafael Verde</p>
              <p className="text-white/20 text-sm mt-1 tracking-wide">
                {t("portraitRole")}
              </p>
            </div>

            {/* Gold accent line at bottom */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-gold-400"
            />
          </motion.div>

          {/* Decorative side accents */}
          <div
            aria-hidden
            className="absolute -left-6 top-10 bottom-10 w-[2px] bg-gradient-to-b from-transparent via-gold-500/40 to-transparent hidden lg:block"
          />
          <div
            aria-hidden
            className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full border border-verde-700 hidden lg:block"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollCue ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        aria-hidden
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown size={26} />
        </motion.span>
      </motion.div>
    </section>
  );
}
