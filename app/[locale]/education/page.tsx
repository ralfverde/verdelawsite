import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { Accordion } from "@/components/ui/Accordion";
import { Link } from "@/i18n/navigation";
import { Play, ArrowRight, Youtube, Instagram, Music2 } from "lucide-react";
import { globalFaqIds } from "@/data/faq";
import { FIRM } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "es" }> }): Promise<Metadata> {
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

export default async function EducationPage({ params }: { params: Promise<{ locale: "en" | "es" }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("education");
  const tNav = await getTranslations("nav");
  const tFaq = await getTranslations("globalFaq");

  const articles = ["a1", "a2", "a3", "a4", "a5", "a6"];
  const categories = ["all", "deportation", "asylum", "bond", "family", "work", "citizenship", "news"];
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
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tNav("home"), href: "/" }, { label: tNav("education") }]}
      />

      {/* Articles */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("articles.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("articles.title")}</h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className={`text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border ${
                  c === "all"
                    ? "bg-[var(--verde-800)] text-white border-[var(--verde-800)]"
                    : "border-black/15 text-[var(--text-dark-secondary)]"
                }`}
              >
                {t(`articles.categories.${c}`)}
              </span>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <article key={a} className="card-light p-7 flex flex-col gap-4">
                <span className="inline-block text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--gold-600)]">
                  {t(`articles.items.${a}.category`)}
                </span>
                <h3 className="font-display text-xl leading-snug">{t(`articles.items.${a}.title`)}</h3>
                <p className="text-sm text-[var(--text-dark-secondary)] leading-relaxed flex-1">
                  {t(`articles.items.${a}.excerpt`)}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-black/10 text-xs text-[var(--text-dark-secondary)]">
                  <span>{t(`articles.items.${a}.date`)} · {t(`articles.items.${a}.readTime`)}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[var(--gold-600)]">
                    {t("articles.readMore")} <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-[var(--verde-950)] text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("videos.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("videos.title")}</h2>
          <GoldAccentLine className="mt-5" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <a
                key={v}
                href={FIRM.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-video rounded-xl overflow-hidden bg-[var(--verde-800)] block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_45%_40%,rgba(200,169,81,0.25),transparent_55%)]" />
                <div className="absolute inset-0 grid place-items-center group-hover:scale-110 transition-transform duration-500">
                  <span className="grid place-items-center rounded-full bg-[var(--gold-500)] text-[var(--verde-950)]" style={{ width: 56, height: 56 }}>
                    <Play size={20} className="translate-x-0.5" fill="currentColor" />
                  </span>
                </div>
                <div className="absolute bottom-4 inset-x-4 text-white">
                  <p className="font-display text-base leading-tight">{t(`videos.items.${v}.title`)}</p>
                </div>
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

      {/* FAQ */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide max-w-4xl">
          <SectionEyebrow>{t("faq.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("faq.title")}</h2>
          <GoldAccentLine className="mt-5" />
          <div className="mt-10">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--verde-950)] text-white section-y">
        <div className="container-wide grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionEyebrow>{t("newsletter.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("newsletter.title")}</h2>
            <GoldAccentLine className="mt-5" />
            <p className="mt-6 text-white/75 leading-relaxed max-w-xl">{t("newsletter.body")}</p>
            <div className="mt-5 flex gap-3">
              <Link href="/education" className="inline-flex items-center gap-2 text-[var(--gold-500)] hover:text-[var(--gold-400)]">
                <Instagram size={18} /> {t("newsletter.follow")}
              </Link>
              <span className="text-white/30">·</span>
              <a href={FIRM.social.tiktok} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--gold-500)] hover:text-[var(--gold-400)]">
                <Music2 size={18} /> TikTok
              </a>
            </div>
          </div>
          <form
            className="card-dark p-7"
            onSubmit={(e) => e.preventDefault()}
            aria-label={t("newsletter.formLabel")}
          >
            <label htmlFor="news-email" className="text-sm text-white/75">
              {t("newsletter.emailLabel")}
            </label>
            <input
              id="news-email"
              name="email"
              type="email"
              required
              placeholder={t("newsletter.emailPlaceholder")}
              className="mt-2 w-full rounded-lg bg-[var(--verde-900)] border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--gold-500)] outline-none"
            />
            <button type="submit" className="cta-gold mt-4 w-full justify-center text-sm">
              {t("newsletter.subscribe")}
            </button>
            <p className="text-xs text-white/50 mt-3">{t("newsletter.legal")}</p>
          </form>
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
