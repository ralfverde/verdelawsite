import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { attorneys, paralegals, support } from "@/data/team";
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

  const credFields = ["education", "barAdmissions", "languages"] as const;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tNav("home"), href: "/" }, { label: tNav("team") }]}
      />

      {/* Attorneys */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("attorneysEyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading text-verde-950"
          >
            {t("attorneysTitle")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {attorneys.map((a) => (
              <article
                key={a.id}
                className="group bg-white rounded-2xl overflow-hidden border border-verde-950/[0.04] shadow-sm hover:shadow-xl hover:shadow-verde-950/[0.06] transition-all duration-500 flex flex-col"
              >
                {/* Photo area */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-verde-600 via-verde-700 to-verde-900">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(200,169,81,0.18),transparent_55%)]"
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <span
                      className="font-heading text-white/[0.05] select-none"
                      style={{ fontSize: "100px" }}
                    >
                      {a.initials}
                    </span>
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-verde-950/80 via-transparent to-transparent"
                  />
                  <span className="absolute bottom-6 left-6 inline-flex px-3 py-1 rounded-full bg-gold-500/20 text-gold-500 text-xs font-semibold tracking-wide">
                    {t(a.titleKey)}
                  </span>
                </div>

                {/* Content area */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-heading text-verde-950 mb-1">
                    {a.name}
                  </h3>
                  <p className="text-sm text-verde-950/50 mb-5">
                    {t(a.titleKey)}
                  </p>

                  <div className="space-y-3 text-sm text-verde-950/60 leading-relaxed">
                    <p>{t(`bios.${a.id}.p1`)}</p>
                    <p>{t(`bios.${a.id}.p2`)}</p>
                    <p>{t(`bios.${a.id}.p3`)}</p>
                  </div>

                  <dl className="mt-6 pt-6 border-t border-verde-950/[0.06] grid grid-cols-1 gap-3">
                    {credFields.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <dt className="text-xs font-semibold text-verde-950/40 uppercase tracking-wider w-28 shrink-0 pt-0.5">
                          {t(`bios.${a.id}.${f}.label`)}
                        </dt>
                        <dd className="text-sm text-verde-950/70 flex-1">
                          {t(`bios.${a.id}.${f}.value`)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto pt-6 flex items-center gap-3">
                    {a.linkedin && (
                      <a
                        href={a.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${a.name} LinkedIn`}
                        className="text-verde-950/30 hover:text-verde-700 transition-colors"
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                    <a href="#free-consultation" className="cta-outline text-sm ml-auto">
                      {t("bookWith", { name: a.name.split(" ")[0] })}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Paralegals */}
      <section className="noise-bg bg-verde-950 text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("paralegalsEyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading"
          >
            {t("paralegalsTitle")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {paralegals.map((p) => (
              <div key={p.id} className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-gradient-to-br from-verde-500 to-verde-700 flex items-center justify-center border-2 border-gold-500/0 group-hover:border-gold-500/40 transition-colors duration-300">
                  <span className="text-2xl font-heading text-white/20">
                    {p.initials}
                  </span>
                </div>
                <p className="text-base font-semibold text-white">{p.name}</p>
                <p className="text-sm text-gold-500 mb-2">{t(p.titleKey)}</p>
                <p className="text-xs text-white/50 leading-relaxed max-w-[200px] mx-auto">
                  {t(`teamBios.${p.id}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("supportEyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading text-verde-950"
          >
            {t("supportTitle")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {support.map((s) => (
              <div key={s.id} className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-gradient-to-br from-verde-600 to-verde-800 flex items-center justify-center border-2 border-gold-500/0 group-hover:border-gold-500/40 transition-colors duration-300">
                  <span className="text-2xl font-heading text-white/25">
                    {s.initials}
                  </span>
                </div>
                <p className="text-base font-semibold text-verde-950">{s.name}</p>
                <p className="text-sm text-gold-600 mb-2">{t(s.titleKey)}</p>
                <p className="text-xs text-verde-950/50 leading-relaxed max-w-[200px] mx-auto">
                  {t(`teamBios.${s.id}`)}
                </p>
              </div>
            ))}
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
