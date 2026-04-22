"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, ChevronDown, Shield, Globe, BadgeCheck } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { easeOut } from "@/lib/animations";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { LiveIndicator } from "@/components/ui/LiveIndicator";

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on the radial background layer. Scoped to the section
  // so it freezes once the hero leaves the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
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
      className="noise-bg relative min-h-[85vh] overflow-hidden bg-verde-950 text-white flex items-center"
      aria-label="Hero"
    >
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-900)_0%,var(--verde-950)_70%)]"
      />

      <FloatingOrbs />

      <div className="container-wide relative grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center pt-28 pb-20 lg:py-24">
        {/* Left: copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="text-eyebrow text-gold-500 mb-6"
          >
            {t("eyebrow")}
          </motion.p>

          <TextReveal
            as="h1"
            whileInView={false}
            className="text-display text-gradient-hero mb-6"
          >
            {title}
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: easeOut }}
            className="text-body-lg text-white/55 mb-10 max-w-lg"
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

        {/* Right: Rafael Verde headshot */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: easeOut }}
          className="relative"
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] mx-auto">
            {/* Offset border card — gold-tinted frame shifted up/right
                for a layered "stacked cards" depth effect. Hidden on
                mobile where the tight padding makes the offset fight
                the edges of the column. */}
            <div
              aria-hidden
              className="hidden md:block absolute -top-3 -right-3 w-full h-full rounded-2xl border border-gold-500/20"
            />

            {/* Ambient halo — subtle verde-to-gold gradient glow
                behind everything so the card feels luminous. */}
            <div
              aria-hidden
              className="absolute -inset-6 bg-gradient-to-br from-verde-500/10 via-transparent to-gold-500/5 rounded-3xl blur-2xl"
            />

            {/* Main photo card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/rafael-verde-hero.png"
                alt={`${t("portraitName")}, ${t("portraitRole")}`}
                width={480}
                height={720}
                className="w-full h-auto object-cover"
                priority
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 400px, 320px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-20 pb-5 px-6">
                <p className="font-heading font-semibold text-white text-lg">
                  {t("portraitName")}
                </p>
                <p className="font-body text-white/50 text-sm mt-0.5">
                  {t("portraitRole")}
                </p>
              </div>
            </div>

            {/* Gold accent bar anchoring the card visually */}
            <div
              aria-hidden
              className="absolute -bottom-2 left-8 right-8 h-[2px] bg-gradient-to-r from-gold-500/0 via-gold-500/50 to-gold-500/0"
            />

            {/* Decorative gold corner brackets. Hidden below md for
                the same spacing reason as the offset border. */}
            <div
              aria-hidden
              className="hidden md:block absolute -top-2 -left-2 w-8 h-8"
            >
              <span className="absolute top-0 left-0 w-full h-[2px] bg-gold-500/40" />
              <span className="absolute top-0 left-0 w-[2px] h-full bg-gold-500/40" />
            </div>
            <div
              aria-hidden
              className="hidden md:block absolute -bottom-2 -right-2 w-8 h-8"
            >
              <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gold-500/40" />
              <span className="absolute bottom-0 right-0 w-[2px] h-full bg-gold-500/40" />
            </div>
          </div>
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
