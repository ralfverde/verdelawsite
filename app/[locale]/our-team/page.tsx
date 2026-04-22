import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { team } from "@/data/team";
import { Linkedin, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team.seo" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: locale === "es" ? "/es/nuestro-equipo" : "/our-team",
    alternatePaths: { en: "/our-team", es: "/es/nuestro-equipo" },
  });
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tNav("home"), href: "/" }, { label: tNav("team") }]}
      />

      {/* Unified team grid */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("teamEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 text-verde-950">{t("teamTitle")}</h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {team.map((p) => {
              const bioParagraphs = p.credentials
                ? [t(`${p.bioKey}.p1`), t(`${p.bioKey}.p2`)]
                : [t(p.bioKey)];
              return (
                <article
                  key={p.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-verde-950/[0.04] shadow-sm hover:shadow-xl hover:shadow-verde-950/[0.06] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Photo area */}
                  <div className={`relative aspect-[4/5] overflow-hidden ${p.gradient}`}>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(200,169,81,0.18),transparent_55%)]"
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <span
                        className="font-heading font-bold text-white/[0.06] select-none"
                        style={{ fontSize: "80px" }}
                      >
                        {p.initials}
                      </span>
                    </div>
                    <span className="absolute bottom-4 left-4 inline-flex px-3 py-1.5 rounded-full bg-gold-500/20 backdrop-blur-sm text-gold-400 text-xs font-heading font-semibold tracking-wide">
                      {t(p.titleKey)}
                    </span>
                  </div>

                  {/* Content area */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading font-bold text-xl tracking-tight text-verde-950">
                      {p.name}
                    </h3>
                    <div className="mt-3 space-y-2 text-sm text-verde-950/55 leading-relaxed">
                      {bioParagraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>

                    {p.credentials && (
                      <dl className="mt-4 pt-4 border-t border-verde-950/[0.06] space-y-2">
                        {p.credentials.map((f) => (
                          <div key={f} className="flex items-start gap-2">
                            <dt className="text-xs font-semibold text-verde-950/30 uppercase tracking-wider w-24 shrink-0 pt-0.5">
                              {t(`${p.bioKey}.${f}.label`)}
                            </dt>
                            <dd className="text-sm text-verde-950/55 flex-1">
                              {t(`${p.bioKey}.${f}.value`)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {(p.linkedin || p.credentials) && (
                      <div className="mt-auto pt-4 flex items-center gap-3">
                        {p.linkedin && (
                          <a
                            href={p.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${p.name} LinkedIn`}
                            className="text-verde-950/30 hover:text-verde-700 transition-colors"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                        {p.credentials && (
                          <a
                            href="#free-consultation"
                            className="cta-outline text-xs ml-auto px-4 py-2"
                          >
                            {t("bookWith", { name: p.name.split(" ")[0] })}
                            <ArrowRight size={14} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="bg-cream text-verde-950 py-16">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <SectionEyebrow>{t("join.eyebrow")}</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-heading text-verde-950">
                {t("join.title")}
              </h2>
              <p className="mt-3 text-sm text-verde-950/50 max-w-md">
                {t("join.body")}
              </p>
            </div>
            <a href="mailto:info@verdelaw.com" className="cta-outline shrink-0">
              {t("join.cta")}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
