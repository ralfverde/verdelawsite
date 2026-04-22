import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: locale === "es" ? "/es/terminos" : "/terms",
    alternatePaths: { en: "/terms", es: "/es/terminos" },
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.terms");
  const tNav = await getTranslations("nav");
  const sections = ["s1", "s2", "s3", "s4", "s5", "s6"];

  return (
    <>
      {/* Hero */}
      <section className="noise-bg relative overflow-hidden bg-verde-950 text-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--verde-900),var(--verde-950)_70%)]"
        />
        <div className="container-wide relative">
          <nav aria-label="Breadcrumb" className="text-sm text-white/40 mb-6">
            <Link href="/" className="hover:text-gold-500 transition-colors">
              {tNav("home")}
            </Link>
            <span className="text-white/20 mx-2">/</span>
            <span className="text-white/60">{t("title")}</span>
          </nav>

          <SectionEyebrow>{t("title")}</SectionEyebrow>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl text-white">
            {t("title")}
          </h1>
          <p className="text-sm text-white/40 mt-3">{t("updated")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream text-verde-950 py-16">
        <div className="container-wide max-w-3xl mx-auto space-y-10">
          {sections.map((s) => (
            <article key={s} className="space-y-3">
              <h2 className="font-heading text-2xl md:text-3xl text-verde-950">
                {t(`${s}.heading`)}
              </h2>
              <p className="text-sm text-verde-950/70 leading-relaxed">
                {t(`${s}.body`)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
