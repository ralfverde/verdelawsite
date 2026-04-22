"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FIRM } from "@/lib/constants";
import { Phone } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="min-h-screen flex items-center justify-center bg-verde-950 text-white px-6 relative overflow-hidden noise-bg">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-900)_0%,var(--verde-950)_70%)]"
      />

      {/* Giant decorative 404 */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-gold-500/10 leading-none select-none pointer-events-none z-0"
        style={{ fontSize: "clamp(150px, 28vw, 300px)" }}
      >
        404
      </motion.span>

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-xl"
      >
        <h1 className="text-3xl font-display text-white mb-3">{t("title")}</h1>
        <p className="text-base text-white/50 mb-8">{t("body")}</p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/" className="cta-gold">
            {t("cta")}
          </Link>
          <a
            href={FIRM.phoneHref}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <Phone size={16} /> {t("phone", { phone: FIRM.phoneDisplay })}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
