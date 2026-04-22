"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: React.ComponentProps<typeof Link>["href"] };

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="noise-bg relative overflow-hidden bg-[var(--verde-950)] text-white pt-28 pb-14 md:pt-32 md:pb-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--verde-900)_0%,var(--verde-950)_70%)]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.3)_49%,rgba(255,255,255,0.3)_51%,transparent_55%)] [background-size:32px_32px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container-wide relative"
      >
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/60 flex flex-wrap items-center gap-1.5">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="hover:text-[var(--gold-500)]">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight size={12} className="text-white/30" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
        <TextReveal
          as="h1"
          whileInView={false}
          className="mt-3 text-white max-w-4xl"
        >
          {title}
        </TextReveal>
        <GoldAccentLine className="mt-6" />
        {subtitle && (
          <p className="mt-6 text-body-lg text-white/55 max-w-2xl">{subtitle}</p>
        )}
      </motion.div>
    </section>
  );
}
