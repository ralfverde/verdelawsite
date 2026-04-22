import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { CountUp } from "@/components/ui/CountUp";
import { Heart, HandHeart, Sparkles, Quote } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.seo" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: locale === "es" ? "/es/sobre-nosotros" : "/about",
    alternatePaths: { en: "/about", es: "/es/sobre-nosotros" },
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: "en" | "es" }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");

  const values = [
    { key: "accessibility", icon: HandHeart },
    { key: "excellence", icon: Sparkles },
    { key: "humanity", icon: Heart },
  ];

  const stats = [
    { key: "cases", value: 600, suffix: "+" },
    { key: "attorneys", value: 2 },
    { key: "paralegals", value: 4 },
    { key: "states", value: 50 },
    { key: "team", value: 22 },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tNav("home"), href: "/" }, { label: tNav("about") }]}
      />

      {/* Story */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-14 items-start">
          <div>
            <SectionEyebrow>{t("story.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">{t("story.title")}</h2>
            <GoldAccentLine className="mt-5" />
            <div className="mt-7 space-y-5 text-[var(--text-dark-secondary)] leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
              <p>{t("story.p4")}</p>
            </div>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              {["founded", "employees", "families"].map((k) => (
                <li key={k} className="card-accent p-4">
                  <p className="font-display text-xl text-[var(--verde-800)]">{t(`story.milestones.${k}.value`)}</p>
                  <p className="text-xs mt-0.5 text-[var(--text-dark-secondary)]">{t(`story.milestones.${k}.label`)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--verde-800)] shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(200,169,81,0.28),transparent_55%)]" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <p className="italic text-sm">{t("story.imageCaption")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="noise-bg bg-[var(--verde-950)] text-white section-y relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-900),var(--verde-950)_70%)]" />
        <div className="container-wide relative">
          <SectionEyebrow>{t("mission.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("mission.title")}</h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-14 mx-auto max-w-4xl text-center">
            <Quote className="mx-auto text-[var(--gold-500)]" size={44} />
            <p className="mt-6 font-display text-2xl md:text-4xl leading-[1.2] text-white">
              &ldquo;{t("mission.quote")}&rdquo;
            </p>
          </div>

          <ul className="mt-16 grid md:grid-cols-3 gap-5">
            {values.map((v) => (
              <li key={v.key} className="card-dark p-8">
                <v.icon className="text-[var(--gold-500)]" size={26} />
                <h3 className="mt-4 font-display text-2xl">{t(`mission.values.${v.key}.title`)}</h3>
                <p className="mt-2 text-white/65 leading-relaxed text-sm">{t(`mission.values.${v.key}.desc`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* By the numbers */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] py-16">
        <div className="container-wide grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <div key={s.key} className={`text-center md:text-left ${i < stats.length - 1 ? "md:border-r md:border-black/10 md:pr-4" : ""}`}>
              <p className="font-display text-5xl text-[var(--verde-800)] leading-none">
                <CountUp value={s.value} suffix={s.suffix ?? ""} />
              </p>
              <p className="mt-2 text-sm text-[var(--text-dark-secondary)]">{t(`numbers.${s.key}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Office */}
      <section className="noise-bg bg-[var(--verde-950)] text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("office.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("office.title")}</h2>
          <GoldAccentLine className="mt-5" />
          <div className="mt-12 grid lg:grid-cols-[1.5fr_1fr] gap-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(200,169,81,0.22),transparent_55%)]" />
                </div>
              ))}
            </div>
            <address className="not-italic text-white/75 space-y-2">
              <p className="font-semibold text-white">{t("office.addressLabel")}</p>
              <p>850 NW 42nd Ave, Suite 306</p>
              <p>Miami, FL 33126</p>
              <p className="pt-3">{t("office.hours")}: Mon–Fri 9AM–6PM EST</p>
              <p className="pt-3"><a href="tel:+13057863003" className="hover:text-[var(--gold-500)]">(305) 786-3003</a></p>
              <p><a href="mailto:info@verdelaw.com" className="hover:text-[var(--gold-500)]">info@verdelaw.com</a></p>
            </address>
          </div>
        </div>
      </section>

      <CTABanner variant="light" titleKey="bannerLight.title" />
      <FinalCTA />
    </>
  );
}
