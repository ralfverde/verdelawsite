import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "es" }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: locale === "es" ? "/es/privacidad" : "/privacy",
    alternatePaths: { en: "/privacy", es: "/es/privacidad" },
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: "en" | "es" }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.privacy");
  const tNav = await getTranslations("nav");
  const sections = ["s1", "s2", "s3", "s4", "s5", "s6"];
  return (
    <>
      <PageHero title={t("title")} crumbs={[{ label: tNav("home"), href: "/" }, { label: t("title") }]} />
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-narrow max-w-3xl">
          <p className="text-sm text-[var(--text-dark-secondary)] mb-8">{t("updated")}</p>
          {sections.map((s) => (
            <article key={s} className="mb-10">
              <h2 className="font-display text-2xl md:text-3xl">{t(`${s}.heading`)}</h2>
              <p className="mt-3 text-[var(--text-dark-secondary)] leading-relaxed">{t(`${s}.body`)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
