import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { services, getService } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { iconMap } from "@/components/practice/iconMap";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock, FileText, DollarSign, Building2 } from "lucide-react";
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

  const Icon = iconMap[svc.icon] ?? iconMap.Shield;

  const steps = ["step1", "step2", "step3", "step4", "step5"];
  const faqItems = ["q1", "q2", "q3", "q4", "q5", "q6"].map((q) => ({
    id: q,
    question: tFaq(`${q}.question`),
    answer: tFaq(`${q}.answer`),
  }));

  // related: other services from same category (up to 3)
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
    offers: { "@type": "Offer", price: svc.price, priceCurrency: "USD" },
  };

  return (
    <>
      <PageHero
        eyebrow={tPage("eyebrow")}
        title={t(`${svc.id}.title`)}
        subtitle={t(`${svc.id}.short`)}
        crumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("practiceAreas"), href: "/practice-areas" },
          { label: t(`${svc.id}.title`) },
        ]}
      />

      {/* Price badge strip */}
      <div className="bg-[var(--verde-900)] border-y border-[var(--gold-500)]/30">
        <div className="container-wide py-5 flex flex-wrap items-center gap-4 text-white/80 text-sm">
          <span className="inline-flex items-center gap-2 font-semibold text-[var(--gold-500)]">
            <DollarSign size={16} /> {tPage("startingAt")} ${svc.price.toLocaleString()}
          </span>
          <span className="text-white/40">·</span>
          <span className="inline-flex items-center gap-2"><Clock size={16} /> {t(`${svc.id}.timeline`)}</span>
          <span className="text-white/40 hidden md:inline">·</span>
          <span className="inline-flex items-center gap-2 hidden md:inline-flex"><FileText size={16} /> {t(`${svc.id}.forms`)}</span>
          <span className="text-white/40 hidden md:inline">·</span>
          <span className="inline-flex items-center gap-2 hidden md:inline-flex"><Building2 size={16} /> {t(`${svc.id}.agency`)}</span>
        </div>
      </div>

      {/* Overview */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <SectionEyebrow>{tPage("overview")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-4xl leading-tight">
              {t(`${svc.id}.headline`)}
            </h2>
            <GoldAccentLine className="mt-5" />
            <div className="mt-7 space-y-5 text-[var(--text-dark-secondary)] leading-relaxed">
              <p>{t(`${svc.id}.overview1`)}</p>
              <p>{t(`${svc.id}.overview2`)}</p>
              <p>{t(`${svc.id}.overview3`)}</p>
            </div>
          </div>
          <aside className="card-light p-7 self-start sticky top-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid place-items-center rounded-lg bg-[var(--verde-800)] text-[var(--gold-500)]" style={{ width: 44, height: 44 }}>
                <Icon size={20} />
              </span>
              <h3 className="font-display text-xl">{tPage("keyFacts")}</h3>
            </div>
            <dl className="divide-y divide-black/10 text-sm">
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-[var(--text-dark-secondary)]">{tPage("timeline")}</dt>
                <dd className="font-semibold text-right">{t(`${svc.id}.timeline`)}</dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-[var(--text-dark-secondary)]">{tPage("forms")}</dt>
                <dd className="font-semibold text-right">{t(`${svc.id}.forms`)}</dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-[var(--text-dark-secondary)]">{tPage("cost")}</dt>
                <dd className="font-semibold text-right">${svc.price.toLocaleString()}</dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-[var(--text-dark-secondary)]">{tPage("agency")}</dt>
                <dd className="font-semibold text-right">{t(`${svc.id}.agency`)}</dd>
              </div>
            </dl>
            <a href="#free-consultation" className="cta-gold mt-6 w-full justify-center text-sm">
              {tPage("bookCTA")}
            </a>
          </aside>
        </div>
      </section>

      {/* Process */}
      <section className="noise-bg bg-[var(--verde-950)] text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{tPage("processEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{tPage("processTitle")}</h2>
          <GoldAccentLine className="mt-5" />

          <ol className="mt-12 relative border-l-2 border-[var(--gold-500)]/40 pl-8 space-y-10 max-w-3xl">
            {steps.map((key, i) => (
              <li key={key} className="relative">
                <span className="absolute -left-[41px] grid place-items-center rounded-full bg-[var(--gold-500)] text-[var(--verde-950)] font-display text-sm" style={{ width: 32, height: 32 }}>
                  {i + 1}
                </span>
                <h3 className="font-display text-2xl">{t(`${svc.id}.${key}Title`)}</h3>
                <p className="mt-2 text-white/70 leading-relaxed">
                  {t(`${svc.id}.${key}Desc`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABanner variant="dark" titleKey="bannerDark.title" />

      {/* FAQ */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide max-w-4xl">
          <SectionEyebrow>{tPage("faqEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{tPage("faqTitle")}</h2>
          <GoldAccentLine className="mt-5" />
          <div className="mt-10">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="noise-bg bg-[var(--verde-950)] text-white section-y">
          <div className="container-wide">
            <SectionEyebrow>{tPage("relatedEyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-2xl md:text-4xl">{tPage("relatedTitle")}</h2>
            <GoldAccentLine className="mt-5" />
            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {related.map((r) => {
                const RIcon = iconMap[r.icon] ?? iconMap.Shield;
                return (
                  <Link
                    key={r.id}
                    href={`/practice-areas/${r.slug[locale]}` as never}
                    className="card-dark p-7 block hover:-translate-y-1 transition-transform"
                  >
                    <RIcon className="text-[var(--gold-500)]" size={22} />
                    <h3 className="mt-4 font-display text-xl">{t(`${r.id}.title`)}</h3>
                    <p className="mt-2 text-sm text-white/65">{t(`${r.id}.short`)}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-500)]">
                      {tPage("viewService")} <ArrowRight size={16} />
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
