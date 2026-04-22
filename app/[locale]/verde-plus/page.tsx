import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { PhoneMockup } from "@/components/verdeplus/PhoneMockup";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
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
  Apple,
} from "lucide-react";
import {
  verdePlusFeatures,
  verdePlusComparisonRows,
} from "@/data/verde-plus-features";
import { buildMetadata } from "@/lib/seo";

const featureIcons: Record<string, typeof Route> = {
  Route,
  BarChart3,
  ScanLine,
  Sparkles,
  GraduationCap,
  MessagesSquare,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
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

export default async function VerdePlusPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("verdePlus");
  void locale;

  return (
    <>
      {/* Hero */}
      <section className="noise-bg relative overflow-hidden bg-verde-950 text-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--verde-900),var(--verde-950)_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 -bottom-20 h-40 bg-gradient-to-t from-gold-500/20 to-transparent"
        />
        <FloatingOrbs />

        <div className="container-wide relative grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div>
            <SectionEyebrow>VERDE+</SectionEyebrow>
            <TextReveal
              as="h1"
              whileInView={false}
              className="mt-4 font-heading text-white"
              style={{ fontSize: "clamp(2.5rem, 5.6vw, 5rem)", lineHeight: 1.04 }}
            >
              {t("hero.title")}
            </TextReveal>
            <GoldAccentLine className="mt-6" />
            <p className="mt-7 text-white/75 text-lg max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#" className="cta-gold">
                <Smartphone size={18} /> {t("hero.ctaDownload")}
              </a>
              <a href="#features" className="cta-outline">
                <PlayCircle size={18} /> {t("hero.ctaMore")}
              </a>
            </div>
          </div>

          <PhoneMockup float />
        </div>
      </section>

      <div id="features" />

      {/* Features (alternating) */}
      {verdePlusFeatures.map((f, i) => {
        const Icon = featureIcons[f.icon] ?? Route;
        const isDark = i % 2 === 1;
        const phoneFirst = i % 2 === 1;

        return (
          <section
            key={f.id}
            className={`${isDark ? "noise-bg bg-verde-950 text-white" : "bg-cream text-verde-950"} py-20 md:py-28`}
          >
            <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Phone side */}
              <div className={`${phoneFirst ? "md:order-1" : "md:order-2"}`}>
                <PhoneMockup parallax />
              </div>

              {/* Text side */}
              <div className={`${phoneFirst ? "md:order-2" : "md:order-1"}`}>
                <div
                  className={`w-10 h-10 rounded-xl bg-gold-500/10 grid place-items-center mb-5`}
                >
                  <Icon className="text-gold-500 w-5 h-5" />
                </div>
                <SectionEyebrow className="block mb-3">
                  {t(`features.${f.id}.eyebrow`)}
                </SectionEyebrow>
                <h2
                  className={`font-heading leading-tight mb-4 ${isDark ? "text-white" : "text-verde-950"}`}
                  style={{
                    fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                  }}
                >
                  {t(`features.${f.id}.title`)}
                </h2>
                <p
                  className={`text-base leading-relaxed mb-6 max-w-lg ${isDark ? "text-white/60" : "text-verde-950/60"}`}
                >
                  {t(`features.${f.id}.desc`)}
                </p>
                <ul className="space-y-3">
                  {[1, 2, 3].map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <Check className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                      <span
                        className={`text-sm ${isDark ? "text-white/50" : "text-verde-950/50"}`}
                      >
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
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("comparison.eyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading text-verde-950"
          >
            {t("comparison.title")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 overflow-x-auto -mx-4 px-4">
            <div className="min-w-[620px] rounded-xl overflow-hidden border border-verde-950/10 bg-white">
              {/* Header row */}
              <div className="grid grid-cols-[1.6fr_1fr_1fr] bg-verde-50 border-b border-verde-950/10">
                <div className="px-6 py-4 text-sm font-semibold text-verde-950 sticky left-0 bg-verde-50 z-10">
                  {t("comparison.feature")}
                </div>
                <div className="px-6 py-4 text-center text-sm font-semibold text-verde-950">
                  {t("comparison.free")}
                </div>
                <div className="px-6 py-4 text-center text-sm font-semibold text-verde-950 relative bg-gold-500/5 border-t-2 border-gold-500">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.12em] bg-gold-500 text-verde-950 px-3 py-1 rounded-full whitespace-nowrap">
                    {t("comparison.recommended")}
                  </span>
                  {t("comparison.client")}
                </div>
              </div>

              {/* Body rows */}
              {verdePlusComparisonRows.map((row, i) => {
                const isOdd = i % 2 === 1;
                const rowBg = isOdd ? "bg-verde-50/50" : "bg-white";
                return (
                  <div
                    key={row}
                    className={`grid grid-cols-[1.6fr_1fr_1fr] border-t border-verde-950/[0.06] ${rowBg}`}
                  >
                    <div
                      className={`px-6 py-4 text-sm text-verde-950 sticky left-0 ${rowBg} z-10`}
                    >
                      {t(`comparison.rows.${row}.label`)}
                    </div>
                    <div className="px-6 py-4 text-center">
                      <RowValue value={t(`comparison.rows.${row}.free`)} />
                    </div>
                    <div className="px-6 py-4 text-center bg-gold-500/5">
                      <RowValue
                        value={t(`comparison.rows.${row}.client`)}
                        emphasis
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="noise-bg relative overflow-hidden bg-verde-950 text-white py-24 text-center">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,81,0.06),transparent_70%)]"
        />
        <div className="container-wide relative">
          <PhoneMockup float />

          <h2
            className="mt-12 font-heading text-white mb-3"
          >
            {t("download.title")}
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            {t("download.subtitle")}
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-colors"
            >
              <Apple className="text-white w-6 h-6" />
              <span className="text-left">
                <span className="block text-xs text-white/40">
                  Download on the
                </span>
                <span className="block text-sm font-semibold text-white">
                  {t("download.appStore")}
                </span>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition-colors"
            >
              <PlayCircle className="text-white w-6 h-6" />
              <span className="text-left">
                <span className="block text-xs text-white/40">Get it on</span>
                <span className="block text-sm font-semibold text-white">
                  {t("download.playStore")}
                </span>
              </span>
            </a>
          </div>
          <p className="text-sm text-white/30 mt-4">{t("download.tagline")}</p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function RowValue({ value, emphasis = false }: { value: string; emphasis?: boolean }) {
  if (value === "yes")
    return <Check className="mx-auto text-verde-600 w-5 h-5" />;
  if (value === "no")
    return <Minus className="mx-auto text-verde-950/20 w-5 h-5" />;
  return (
    <span
      className={`text-xs font-medium ${emphasis ? "text-gold-600" : "text-verde-950/50"}`}
    >
      {value}
    </span>
  );
}
