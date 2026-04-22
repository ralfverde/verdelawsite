import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { PhoneMockup } from "@/components/verdeplus/PhoneMockup";
import { iconMap as verdeIcons } from "@/components/practice/iconMap";
import {
  Route,
  BarChart3,
  ScanLine,
  Sparkles,
  GraduationCap,
  MessagesSquare,
  Check,
  Minus,
  Smartphone,
  PlayCircle,
} from "lucide-react";
import { verdePlusFeatures, verdePlusComparisonRows } from "@/data/verde-plus-features";
import { buildMetadata } from "@/lib/seo";

const featureIcons: Record<string, typeof Route> = {
  Route,
  BarChart3,
  ScanLine,
  Sparkles,
  GraduationCap,
  MessagesSquare,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "es" }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "verdePlus.seo" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/verde-plus",
    alternatePaths: { en: "/verde-plus", es: "/es/verde-plus" },
  });
}

export default async function VerdePlusPage({ params }: { params: Promise<{ locale: "en" | "es" }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("verdePlus");
  // iconMap from practice/iconMap imported but unused in this page
  void verdeIcons;

  return (
    <>
      {/* Hero */}
      <section className="noise-bg relative overflow-hidden bg-[var(--verde-950)] text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--verde-900),var(--verde-950)_70%)]" />
        <div aria-hidden className="absolute inset-x-0 -bottom-20 h-40 bg-gradient-to-t from-[var(--gold-500)]/20 to-transparent" />

        <div className="container-wide relative grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div>
            <SectionEyebrow>VERDE+</SectionEyebrow>
            <h1
              className="mt-4 font-display text-white"
              style={{ fontSize: "clamp(40px,5.6vw,78px)", lineHeight: 1.04 }}
            >
              {t("hero.title")}
            </h1>
            <GoldAccentLine className="mt-6" />
            <p className="mt-7 text-white/75 text-lg max-w-xl">{t("hero.subtitle")}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#" className="cta-gold">
                <Smartphone size={18} /> {t("hero.ctaDownload")}
              </a>
              <a href="#features" className="cta-outline">
                <PlayCircle size={18} /> {t("hero.ctaMore")}
              </a>
            </div>
          </div>

          <PhoneMockup>
            <div className="h-4 w-24 rounded-full bg-[var(--gold-500)]/60" />
            <div className="h-5 w-40 rounded bg-white/70" />
            <div className="mt-3 h-24 rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col gap-2">
              <div className="h-2 w-20 rounded bg-white/30" />
              <div className="h-2 w-24 rounded bg-white/20" />
              <div className="h-2 w-16 rounded bg-[var(--gold-500)]/60" />
            </div>
            <div className="h-16 rounded-xl bg-[var(--gold-500)]/25 border border-[var(--gold-500)]/50 p-3 flex items-center">
              <div className="h-3 w-28 rounded bg-white/70" />
            </div>
            <div className="h-10 rounded-xl bg-white/5 border border-white/10" />
            <div className="h-10 rounded-xl bg-white/5 border border-white/10" />
          </PhoneMockup>
        </div>
      </section>

      {/* Features */}
      <div id="features" />
      {verdePlusFeatures.map((f, i) => {
        const Icon = featureIcons[f.icon] ?? Route;
        const isDark = i % 2 === 1;
        const reverse = i % 2 === 1;
        return (
          <section
            key={f.id}
            className={`section-y ${isDark ? "bg-[var(--verde-950)] text-white" : "bg-[var(--cream)] text-[var(--verde-950)]"}`}
          >
            <div className={`container-wide grid lg:grid-cols-2 gap-14 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="mx-auto">
                <PhoneMockup className={isDark ? "" : "!border-[var(--verde-800)]"}>
                  <div className="h-3 w-20 rounded-full bg-[var(--gold-500)]/60" />
                  <div className="h-4 w-32 rounded bg-white/70" />
                  <div className="mt-3 flex gap-2">
                    <span className="h-8 w-8 rounded-lg bg-[var(--gold-500)]/25 border border-[var(--gold-500)]/50" />
                    <div className="flex-1 h-8 rounded-lg bg-white/5 border border-white/10" />
                  </div>
                  <div className="h-32 rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col gap-2">
                    <div className="h-2 w-16 rounded bg-[var(--gold-500)]/60" />
                    <div className="h-2 w-24 rounded bg-white/30" />
                    <div className="h-2 w-20 rounded bg-white/20" />
                    <div className="h-2 w-28 rounded bg-white/20" />
                  </div>
                  <div className="h-12 rounded-xl bg-white/5 border border-white/10" />
                  <div className="h-8 rounded-xl bg-[var(--gold-500)]/25 border border-[var(--gold-500)]/50" />
                </PhoneMockup>
              </div>
              <div>
                <Icon className={`text-[var(--gold-500)]`} size={28} />
                <SectionEyebrow className="mt-4 block">{t(`features.${f.id}.eyebrow`)}</SectionEyebrow>
                <h2 className={`mt-3 font-display text-3xl md:text-5xl leading-[1.08] ${isDark ? "text-white" : "text-[var(--verde-950)]"}`}>
                  {t(`features.${f.id}.title`)}
                </h2>
                <GoldAccentLine className="mt-5" />
                <p className={`mt-7 leading-relaxed max-w-lg ${isDark ? "text-white/75" : "text-[var(--text-dark-secondary)]"}`}>
                  {t(`features.${f.id}.desc`)}
                </p>
                <ul className="mt-6 space-y-3">
                  {[1, 2, 3].map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <Check size={18} className="text-[var(--gold-500)] shrink-0" />
                      <span className={`${isDark ? "text-white/75" : "text-[var(--text-dark-secondary)]"}`}>
                        {t(`features.${f.id}.h${h}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      {/* Comparison */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("comparison.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("comparison.title")}</h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[620px] grid grid-cols-[1.6fr_1fr_1fr] rounded-2xl overflow-hidden border border-black/10 bg-white">
              <div className="p-5 font-semibold text-[var(--text-dark-secondary)] text-sm uppercase tracking-[0.1em]">
                {t("comparison.feature")}
              </div>
              <div className="p-5 font-display text-center border-l border-black/10">
                {t("comparison.free")}
              </div>
              <div className="p-5 font-display text-center border-l border-black/10 relative bg-[var(--gold-500)]/10">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.12em] bg-[var(--gold-500)] text-[var(--verde-950)] px-3 py-1 rounded-full">
                  {t("comparison.recommended")}
                </span>
                {t("comparison.client")}
              </div>

              {verdePlusComparisonRows.map((row, i) => (
                <div key={row} className={`contents ${i % 2 === 0 ? "" : ""}`}>
                  <div className={`p-4 text-sm border-t border-black/10 ${i % 2 ? "bg-[var(--cream-dark)]/50" : ""}`}>
                    {t(`comparison.rows.${row}.label`)}
                  </div>
                  <div className={`p-4 text-center border-t border-l border-black/10 ${i % 2 ? "bg-[var(--cream-dark)]/50" : ""}`}>
                    <RowValue value={t(`comparison.rows.${row}.free`)} />
                  </div>
                  <div className={`p-4 text-center border-t border-l border-black/10 bg-[var(--gold-500)]/10`}>
                    <RowValue value={t(`comparison.rows.${row}.client`)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="noise-bg bg-[var(--verde-950)] text-white section-y">
        <div className="container-wide text-center">
          <PhoneMockup />
          <h2 className="mt-12 font-display text-3xl md:text-5xl">{t("download.title")}</h2>
          <p className="mt-4 text-white/75 max-w-2xl mx-auto">{t("download.subtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#" className="cta-gold">
              <Smartphone size={18} /> {t("download.appStore")}
            </a>
            <a href="#" className="cta-outline">
              <Smartphone size={18} /> {t("download.playStore")}
            </a>
          </div>
          <p className="mt-6 text-[var(--gold-500)] font-semibold">{t("download.tagline")}</p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function RowValue({ value }: { value: string }) {
  if (value === "yes") return <Check size={18} className="mx-auto text-[var(--verde-600)]" />;
  if (value === "no") return <Minus size={18} className="mx-auto text-black/30" />;
  return <span className="text-sm">{value}</span>;
}
