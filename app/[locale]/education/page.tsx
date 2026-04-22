import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { Accordion } from "@/components/ui/Accordion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { NewsletterForm } from "@/components/education/NewsletterForm";
import GuidesGrid from "@/components/education/GuidesGrid";
import {
  Play,
  ArrowRight,
  Youtube,
  Instagram,
  Music2,
  BookOpen,
} from "lucide-react";
import { globalFaqIds } from "@/data/faq";
import { FIRM } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "education.seo" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: locale === "es" ? "/es/educacion" : "/education",
    alternatePaths: { en: "/education", es: "/es/educacion" },
  });
}

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("education");
  const tNav = await getTranslations("nav");
  const tFaq = await getTranslations("globalFaq");

  const articles = ["a1", "a2", "a3", "a4", "a5", "a6"];
  const categories = [
    "all",
    "deportation",
    "asylum",
    "bond",
    "family",
    "work",
    "citizenship",
    "news",
  ];
  const videos = ["v1", "v2", "v3", "v4", "v5", "v6"];

  const faqItems = globalFaqIds.map((id) => ({
    id,
    question: tFaq(`${id}.question`),
    answer: tFaq(`${id}.answer`),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <ReadingProgress />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tNav("home"), href: "/" }, { label: tNav("education") }]}
      />
      <SectionDivider variant="diagonal" direction="dark-to-light" />

      {/* Free PDF guides */}
      <section className="bg-cream text-verde-950 py-16 md:py-20">
        <div className="container-wide max-w-6xl">
          <div className="text-center mb-10">
            <SectionEyebrow>{t("guides.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-heading font-bold text-verde-950 tracking-tight">
              {t("guides.title")}
            </h2>
            <p className="font-body text-verde-950/50 text-sm mt-3 max-w-lg mx-auto">
              {t("guides.subtitle")}
            </p>
          </div>
          <GuidesGrid locale={locale} />
        </div>
      </section>

      {/* Articles */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("articles.eyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading text-verde-950"
          >
            {t("articles.title")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className={`text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border ${
                  c === "all"
                    ? "bg-verde-950 text-white border-verde-950"
                    : "border-verde-950/10 text-verde-950/50"
                }`}
              >
                {t(`articles.categories.${c}`)}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <article
                key={a}
                className="group bg-white rounded-xl overflow-hidden border border-verde-950/[0.04] hover:shadow-xl hover:shadow-verde-950/[0.04] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image area */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-verde-700 to-verde-900 overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(200,169,81,0.18),transparent_55%)]"
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <BookOpen className="text-white/10" size={48} strokeWidth={1.25} />
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/90 text-verde-950">
                    {t(`articles.items.${a}.category`)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-heading text-verde-950 mb-2 line-clamp-2 group-hover:text-verde-700 transition-colors">
                    {t(`articles.items.${a}.title`)}
                  </h3>
                  <p className="text-sm text-verde-950/50 line-clamp-2 mb-4">
                    {t(`articles.items.${a}.excerpt`)}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-verde-950/30">
                      {t(`articles.items.${a}.date`)} ·{" "}
                      {t(`articles.items.${a}.readTime`)}
                    </span>
                    <span className="link-underline text-sm text-gold-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                      {t("articles.readMore")}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="noise-bg bg-verde-950 text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("videos.eyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading"
          >
            {t("videos.title")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <a
                key={v}
                href={FIRM.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-verde-800 to-verde-950 cursor-pointer"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_45%_40%,rgba(200,169,81,0.22),transparent_55%)]"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 grid place-items-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                    <Play size={22} className="text-white translate-x-0.5" fill="currentColor" />
                  </span>
                </div>
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
                />
                <p className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-white leading-snug">
                  {t(`videos.items.${v}.title`)}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={FIRM.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-outline text-sm"
            >
              <Youtube size={16} /> {t("videos.viewMore")}
            </a>
          </div>
        </div>
      </section>
      <SectionDivider variant="diagonal" direction="dark-to-light" />

      {/* FAQ */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide max-w-4xl">
          <SectionEyebrow>{t("faq.eyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading text-verde-950"
          >
            {t("faq.title")}
          </h2>
          <GoldAccentLine className="mt-5" />
          <div className="mt-10">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>
      <SectionDivider variant="diagonal" direction="light-to-dark" />

      {/* Newsletter */}
      <section className="noise-bg bg-verde-950 text-white py-20">
        <div className="container-wide">
          <div className="bg-verde-900 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-[0_0_58%] max-w-[58ch]">
              <SectionEyebrow>{t("newsletter.eyebrow")}</SectionEyebrow>
              <h2 className="mt-3 text-2xl md:text-3xl font-heading text-white mb-3">
                {t("newsletter.title")}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed">
                {t("newsletter.body")}
              </p>
              <div className="mt-4 flex gap-4">
                <a
                  href={FIRM.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/40 hover:text-gold-500 transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={FIRM.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-white/40 hover:text-gold-500 transition-colors"
                >
                  <Music2 size={18} />
                </a>
                <a
                  href={FIRM.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-white/40 hover:text-gold-500 transition-colors"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
            <div className="flex-1 w-full">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
