import type { Metadata } from "next";
import { Fragment } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TextReveal } from "@/components/ui/TextReveal";
import { CountUp } from "@/components/ui/CountUp";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { Link } from "@/i18n/navigation";
import {
  Heart,
  HandHeart,
  Sparkles,
  Camera,
  Users,
  Building,
  Coffee,
  Briefcase,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { FIRM } from "@/lib/constants";

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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
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
    { key: "cases", value: 1000, suffix: "+" },
    { key: "states", value: 50 },
    { key: "team", value: 22 },
  ];

  const milestones: Array<"founded" | "employees" | "families"> = [
    "founded",
    "employees",
    "families",
  ];

  const galleryTiles = [
    { icon: Camera, gradient: "bg-gradient-to-br from-verde-600 to-verde-800" },
    { icon: Users, gradient: "bg-gradient-to-bl from-verde-600 to-verde-900" },
    { icon: Building, gradient: "bg-gradient-to-r from-verde-700 to-verde-900" },
    { icon: Coffee, gradient: "bg-gradient-to-tr from-verde-600 to-verde-800" },
    { icon: Briefcase, gradient: "bg-gradient-to-tl from-verde-700 to-verde-950" },
    { icon: BookOpen, gradient: "bg-gradient-to-b from-verde-600 to-verde-800" },
  ];

  return (
    <>
      <ReadingProgress />
      {/* Hero */}
      <section className="noise-bg relative overflow-hidden bg-verde-950 text-white pt-28 pb-14 md:pt-32 md:pb-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--verde-900)_0%,var(--verde-950)_70%)]"
        />

        {/* Decorative giant quotation mark */}
        <span
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 md:pr-16 font-heading text-white opacity-[0.03] select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(180px, 26vw, 420px)" }}
        >
          &ldquo;
        </span>

        <div className="container-wide relative">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-white/40 mb-6"
          >
            <Link href="/" className="hover:text-gold-500 transition-colors">
              {tNav("home")}
            </Link>
            <span className="text-white/20 mx-2">/</span>
            <span className="text-white/60">{tNav("about")}</span>
          </nav>

          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <TextReveal
            as="h1"
            whileInView={false}
            className="mt-3 font-heading text-white max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.5rem)", lineHeight: 1.04 }}
          >
            {t("title")}
          </TextReveal>
          <GoldAccentLine className="mt-6" />
          <p className="mt-6 text-white/70 max-w-2xl text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>
      <SectionDivider variant="diagonal" direction="dark-to-light" />

      {/* Our Story */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-14 lg:gap-20 items-start">
          <div>
            <SectionEyebrow>{t("story.eyebrow")}</SectionEyebrow>
            <h2
              className="mt-3 font-heading text-verde-950"
            >
              {t("story.title")}
            </h2>
            <GoldAccentLine className="mt-5" />
            <div className="mt-7 space-y-5 text-verde-950/60 leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
              <p>{t("story.p4")}</p>
            </div>

            {/* Milestone badges */}
            <ul className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-verde-950/10">
              {milestones.map((k) => (
                <li
                  key={k}
                  className="px-5 py-3 rounded-xl border border-verde-950/[0.06] bg-white shadow-sm"
                >
                  <p className="text-2xl font-heading text-verde-950 leading-none">
                    {t(`story.milestones.${k}.value`)}
                  </p>
                  <p className="text-xs text-verde-950/50 mt-1">
                    {t(`story.milestones.${k}.label`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Layered image composition */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-md">
            {/* Back offset card */}
            <div
              aria-hidden
              className="absolute -bottom-3 -left-3 w-[calc(100%-20px)] aspect-[4/3] rounded-2xl bg-verde-700/50 blur-[1px] -z-10"
            />

            {/* Main image card */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-verde-600 to-verde-800">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(200,169,81,0.18),transparent_55%)]"
              />
              <div className="absolute inset-0 grid place-items-center">
                <Building size={96} className="text-white/10" strokeWidth={1.25} />
              </div>
            </div>

            {/* Floating caption card */}
            <div className="absolute bottom-4 right-4 bg-cream rounded-lg px-4 py-2 shadow-lg">
              <p className="text-sm text-verde-950/70 font-medium">
                {t("story.imageCaption")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="noise-bg bg-verde-950 text-white section-y relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--verde-900),var(--verde-950)_70%)]"
        />

        <div className="container-wide relative">
          <SectionEyebrow>{t("mission.eyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading text-white"
          >
            {t("mission.title")}
          </h2>
          <GoldAccentLine className="mt-5" />

          {/* Large quote */}
          <div className="relative max-w-3xl mx-auto mt-10 md:mt-12 text-center px-4">
            <span
              aria-hidden
              className="absolute -top-6 -left-2 text-6xl text-gold-500/30 font-heading leading-none select-none pointer-events-none"
            >
              &ldquo;
            </span>
            <p className="text-2xl md:text-3xl font-heading text-white/90 italic leading-relaxed">
              {t("mission.quote")}
            </p>
            <span
              aria-hidden
              className="absolute -bottom-10 -right-2 text-6xl text-gold-500/30 font-heading leading-none select-none pointer-events-none"
            >
              &rdquo;
            </span>
          </div>

          {/* Value cards */}
          <ul className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <li
                key={v.key}
                className="text-center px-6 py-8 rounded-2xl transition-colors duration-300 hover:bg-white/[0.08]"
              >
                <span className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-white/[0.06] border border-white/[0.08] grid place-items-center">
                  <v.icon className="text-gold-500" size={24} />
                </span>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {t(`mission.values.${v.key}.title`)}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-[280px] mx-auto">
                  {t(`mission.values.${v.key}.desc`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SectionDivider variant="diagonal" direction="dark-to-light" />

      {/* By the numbers */}
      <section className="bg-cream text-verde-950 py-10 md:py-12">
        <div className="container-wide flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {stats.map((s, i) => (
            <Fragment key={s.key}>
              <div className="text-center">
                <p className="text-stat text-verde-950 leading-none">
                  <CountUp value={s.value} suffix={s.suffix ?? ""} />
                </p>
                <p className="mt-2 text-sm text-verde-950/40">
                  {t(`numbers.${s.key}`)}
                </p>
              </div>
              {i < stats.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:block w-px h-14 bg-verde-950/10 self-center"
                />
              )}
            </Fragment>
          ))}
        </div>
      </section>
      <SectionDivider variant="diagonal" direction="light-to-dark" />

      {/* Office / Culture */}
      <section className="noise-bg bg-verde-950 text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("office.eyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading text-white"
          >
            {t("office.title")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-10 md:mt-12 grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-10 items-start">
            {/* Photo gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {galleryTiles.map((tile, i) => (
                <div
                  key={i}
                  className={`group relative aspect-square rounded-xl overflow-hidden border border-white/[0.06] ${tile.gradient}`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(200,169,81,0.12),transparent_55%)]"
                  />
                  <div className="absolute inset-0 grid place-items-center transition-transform duration-500 group-hover:scale-[1.08]">
                    <tile.icon
                      size={48}
                      className="text-white/10"
                      strokeWidth={1.25}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info card */}
            <aside className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-heading text-2xl text-white mb-5">
                {t("office.addressLabel")}
              </h3>
              <ul className="space-y-4 text-white/75">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin className="text-gold-500 w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    {FIRM.address.street}
                    <br />
                    {FIRM.address.city}, {FIRM.address.state} {FIRM.address.zip}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Clock className="text-gold-500 w-4 h-4 shrink-0" />
                  <span>
                    {t("office.hours")}: {FIRM.hours}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="text-gold-500 w-4 h-4 shrink-0" />
                  <a
                    href={FIRM.phoneHref}
                    className="hover:text-gold-500 transition-colors"
                  >
                    {FIRM.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="text-gold-500 w-4 h-4 shrink-0" />
                  <a
                    href={`mailto:${FIRM.email}`}
                    className="hover:text-gold-500 transition-colors"
                  >
                    {FIRM.email}
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner variant="light" titleKey="bannerLight.title" />
      <FinalCTA />
    </>
  );
}
