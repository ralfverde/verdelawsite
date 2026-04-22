import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { services, getService } from "@/data/services";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { TextReveal } from "@/components/ui/TextReveal";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { iconMap } from "@/components/practice/iconMap";
import { PeopleViewing } from "@/components/practice/PeopleViewing";
import { StickySidebar } from "@/components/practice/StickySidebar";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Clock,
  FileText,
  Building2,
  Info,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.flatMap((s) => [
    { locale: "en", slug: s.slug.en },
    { locale: "es", slug: s.slug.es },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es"; slug: string }>;
}): Promise<Metadata | undefined> {
  const { locale, slug } = await params;
  const svc = getService(slug, locale);
  if (!svc) return undefined;
  const t = await getTranslations({ locale, namespace: "services" });
  const title = t(`${svc.id}.title`);
  const description = t(`${svc.id}.short`);
  return buildMetadata({
    locale,
    title,
    description,
    path: locale === "es" ? `/es/areas-de-practica/${svc.slug.es}` : `/practice-areas/${svc.slug.en}`,
    alternatePaths: {
      en: `/practice-areas/${svc.slug.en}`,
      es: `/es/areas-de-practica/${svc.slug.es}`,
    },
  });
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const svc = getService(slug, locale);
  if (!svc) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const tPage = await getTranslations({ locale, namespace: "practiceDetail" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tFaq = await getTranslations({ locale, namespace: "practiceFaq" });

  const stepKeys = ["step1", "step2", "step3", "step4", "step5"];
  const faqItems = ["q1", "q2", "q3", "q4", "q5", "q6"].map((q) => ({
    id: q,
    question: tFaq(`${q}.question`),
    answer: tFaq(`${q}.answer`),
  }));

  const related = services
    .filter((x) => x.category === svc.category && x.id !== svc.id)
    .slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t(`${svc.id}.title`),
    description: t(`${svc.id}.short`),
    provider: {
      "@type": "LegalService",
      name: "Verde Law, PLLC",
      telephone: "+1-305-786-3003",
    },
    areaServed: "United States",
  };

  const badges = [
    { icon: Clock, label: t(`${svc.id}.timeline`) },
    { icon: FileText, label: t(`${svc.id}.forms`) },
    { icon: Building2, label: t(`${svc.id}.agency`) },
  ];

  return (
    <>
      <ReadingProgress />
      <StickySidebar serviceTitle={t(`${svc.id}.title`)} />
      {/* Hero */}
      <section className="noise-bg relative overflow-hidden bg-verde-950 text-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--verde-900)_0%,var(--verde-950)_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 16px)",
          }}
        />
        <div className="container-wide relative">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-sm text-white/40 mb-6">
            <Link
              href="/"
              className="hover:text-gold-500 transition-colors"
            >
              {tNav("home")}
            </Link>
            <span className="text-white/20 mx-2">/</span>
            <Link
              href="/practice-areas"
              className="hover:text-gold-500 transition-colors"
            >
              {tNav("practiceAreas")}
            </Link>
            <span className="text-white/20 mx-2">/</span>
            <span className="text-white/60">{t(`${svc.id}.title`)}</span>
          </nav>

          <SectionEyebrow>{tPage("eyebrow")}</SectionEyebrow>
          <TextReveal
            as="h1"
            whileInView={false}
            className="mt-3 font-heading text-white max-w-4xl"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
              lineHeight: 1.04,
            }}
          >
            {t(`${svc.id}.title`)}
          </TextReveal>
          <GoldAccentLine className="mt-6" />
          <p className="mt-6 text-white/70 max-w-2xl text-lg leading-relaxed">
            {t(`${svc.id}.short`)}
          </p>

          {/* Service badge row */}
          <div className="flex flex-wrap gap-3 mt-8">
            {badges.map((b, i) => (
              <span
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-white/60"
              >
                <b.icon className="text-gold-500 w-3.5 h-3.5" />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + Key Facts */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <div className="mb-4">
              <PeopleViewing variant="light" />
            </div>
            <SectionEyebrow>{tPage("overview")}</SectionEyebrow>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl leading-tight">
              {t(`${svc.id}.headline`)}
            </h2>
            <GoldAccentLine className="mt-5" />
            <div className="mt-7 space-y-5 text-verde-950/60 leading-relaxed">
              <p>{t(`${svc.id}.overview1`)}</p>
              <p>{t(`${svc.id}.overview2`)}</p>
              <p>{t(`${svc.id}.overview3`)}</p>
            </div>
          </div>

          {/* Key Facts card */}
          <aside className="bg-cream rounded-xl p-6 border border-verde-950/5 self-start sticky top-28 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-8 rounded-lg bg-verde-100 grid place-items-center">
                <Info className="text-verde-700 w-4 h-4" />
              </span>
              <h3 className="text-base font-semibold text-verde-950">
                {tPage("keyFacts")}
              </h3>
            </div>

            <dl>
              <div className="flex justify-between gap-4 py-3 border-b border-verde-950/5">
                <dt className="text-sm text-verde-950/50">{tPage("timeline")}</dt>
                <dd className="text-sm font-medium text-verde-950 text-right max-w-[60%]">
                  {t(`${svc.id}.timeline`)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3 border-b border-verde-950/5">
                <dt className="text-sm text-verde-950/50">{tPage("forms")}</dt>
                <dd className="text-sm font-medium text-verde-950 text-right max-w-[60%]">
                  {t(`${svc.id}.forms`)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-sm text-verde-950/50">{tPage("agency")}</dt>
                <dd className="text-sm font-medium text-verde-950 text-right max-w-[60%]">
                  {t(`${svc.id}.agency`)}
                </dd>
              </div>
            </dl>

            <a
              href="#free-consultation"
              className="cta-gold w-full justify-center text-sm mt-5"
            >
              {tPage("bookCTA")}
            </a>
          </aside>
        </div>
      </section>

      {/* Process timeline */}
      <section className="noise-bg bg-verde-950 text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{tPage("processEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl">
            {tPage("processTitle")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <ol className="mt-12 max-w-3xl">
            {stepKeys.map((key, i) => {
              const isLast = i === stepKeys.length - 1;
              return (
                <li key={key} className="relative flex gap-5 py-6 group">
                  {/* Step circle */}
                  <div className="relative shrink-0">
                    <span className="w-10 h-10 rounded-full bg-gold-500/10 grid place-items-center transition-colors duration-300 group-hover:bg-gold-500">
                      <span className="text-sm font-semibold text-gold-500 transition-colors duration-300 group-hover:text-verde-950">
                        {i + 1}
                      </span>
                    </span>
                    {/* Connecting line to next step */}
                    {!isLast && (
                      <span
                        aria-hidden
                        className="absolute left-5 top-10 bottom-[-24px] w-[1px] bg-gold-500/20"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-1.5 flex-1">
                    <h3 className="text-base font-semibold text-white group-hover:text-gold-500 transition-colors duration-300">
                      {t(`${svc.id}.${key}Title`)}
                    </h3>
                    <p className="mt-1 text-sm text-white/50 leading-relaxed">
                      {t(`${svc.id}.${key}Desc`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <CTABanner variant="dark" titleKey="bannerDark.title" />

      {/* FAQ */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide max-w-4xl">
          <SectionEyebrow>{tPage("faqEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl">
            {tPage("faqTitle")}
          </h2>
          <GoldAccentLine className="mt-5" />
          <div className="mt-10">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="noise-bg bg-verde-950 text-white py-20">
          <div className="container-wide">
            <SectionEyebrow>{tPage("relatedEyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-heading text-2xl md:text-4xl text-white">
              {tPage("relatedTitle")}
            </h2>
            <GoldAccentLine className="mt-5" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {related.map((r) => {
                const RIcon = iconMap[r.icon] ?? iconMap.Shield;
                return (
                  <Link
                    key={r.id}
                    href={`/practice-areas/${r.slug[locale]}` as never}
                    className="group block bg-white/[0.04] border border-white/[0.06] rounded-xl p-6 hover:border-gold-500/20 hover:-translate-y-2 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 grid place-items-center mb-4">
                      <RIcon className="text-gold-500" size={20} />
                    </div>
                    <h3 className="text-base font-heading text-white mb-2">
                      {t(`${r.id}.title`)}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4">
                      {t(`${r.id}.short`)}
                    </p>
                    <span className="link-underline inline-flex items-center gap-2 text-gold-500 text-sm font-medium">
                      {tPage("viewService")}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
