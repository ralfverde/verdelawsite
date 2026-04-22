import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { teamMembers } from "@/data/team";
import { TeamRoleBadge } from "@/components/team/TeamRoleBadge";
import { ArrowRight } from "lucide-react";
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

          <div className="mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {teamMembers.map((p) => (
              <article
                key={p.name}
                className="group bg-white rounded-2xl overflow-hidden border border-verde-950/[0.04] shadow-sm hover:shadow-xl hover:shadow-verde-950/[0.06] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover object-top"
                  />
                  <TeamRoleBadge role={p.role[locale]} />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-base tracking-tight text-verde-950">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-verde-950/55 leading-relaxed">
                    {p.bio[locale]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="bg-cream text-verde-950 py-14 md:py-16">
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
            <a
              href="https://www.indeed.com/cmp/Verde-Law"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-outline shrink-0"
            >
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
