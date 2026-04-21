import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { attorneys, paralegals, support } from "@/data/team";
import { Linkedin, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "es" }> }): Promise<Metadata> {
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

export default async function TeamPage({ params }: { params: Promise<{ locale: "en" | "es" }> }) {
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

      {/* Attorneys */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("attorneysEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("attorneysTitle")}</h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {attorneys.map((a) => (
              <article key={a.id} className="card-light p-7 flex flex-col md:flex-row gap-6">
                <div className="relative aspect-[4/5] md:w-52 shrink-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-700)] via-[var(--verde-800)] to-[var(--verde-950)]" />
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(200,169,81,0.3),transparent_55%)]" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-6xl text-[var(--gold-500)]/50">{a.initials}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--gold-600)]">
                    {t(a.titleKey)}
                  </p>
                  <h3 className="mt-2 font-display text-3xl">{a.name}</h3>
                  <div className="mt-5 space-y-3 text-sm text-[var(--text-dark-secondary)] leading-relaxed">
                    {[1, 2, 3].map((n) => (
                      <p key={n}>{t(`bios.${a.id}.p${n}`)}</p>
                    ))}
                  </div>
                  <ul className="mt-5 divide-y divide-black/10 text-sm">
                    {["education", "barAdmissions", "languages"].map((f) => (
                      <li key={f} className="py-2 flex gap-3">
                        <span className="h-[2px] w-4 bg-[var(--gold-500)] mt-2.5 shrink-0" aria-hidden />
                        <span>
                          <strong className="text-[var(--verde-950)]">{t(`bios.${a.id}.${f}.label`)}: </strong>
                          <span className="text-[var(--text-dark-secondary)]">{t(`bios.${a.id}.${f}.value`)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-3">
                    {a.linkedin && (
                      <a
                        href={a.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${a.name} LinkedIn`}
                        className="grid place-items-center rounded-lg bg-[var(--verde-800)] text-white hover:bg-[var(--verde-700)]"
                        style={{ width: 40, height: 40 }}
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                    <a href="#free-consultation" className="cta-gold text-sm">
                      {t("bookWith", { name: a.name.split(" ")[0] })} <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Paralegals */}
      <section className="bg-[var(--verde-950)] text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("paralegalsEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("paralegalsTitle")}</h2>
          <GoldAccentLine className="mt-5" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paralegals.map((p) => (
              <div key={p.id} className="card-dark p-6 text-center">
                <div className="relative aspect-square mx-auto w-24 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-600)] to-[var(--verde-950)]" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-2xl text-[var(--gold-500)]">{p.initials}</span>
                  </div>
                </div>
                <p className="mt-4 font-display text-lg">{p.name}</p>
                <p className="text-xs text-[var(--gold-500)] uppercase tracking-[0.15em] mt-1">
                  {t(p.titleKey)}
                </p>
                <p className="mt-3 text-xs text-white/60 leading-relaxed">
                  {t(`teamBios.${p.id}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("supportEyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("supportTitle")}</h2>
          <GoldAccentLine className="mt-5" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {support.map((s) => (
              <div key={s.id} className="card-light p-6">
                <div className="relative aspect-square w-20 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--verde-600)] to-[var(--verde-950)]" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-xl text-[var(--gold-500)]">{s.initials}</span>
                  </div>
                </div>
                <p className="mt-4 font-display text-lg">{s.name}</p>
                <p className="text-xs text-[var(--gold-600)] uppercase tracking-[0.12em] mt-1">
                  {t(s.titleKey)}
                </p>
                <p className="mt-3 text-xs text-[var(--text-dark-secondary)] leading-relaxed">
                  {t(`teamBios.${s.id}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section className="bg-[var(--verde-950)] text-white section-y">
        <div className="container-wide grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionEyebrow>{t("join.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("join.title")}</h2>
            <GoldAccentLine className="mt-5" />
            <p className="mt-6 text-white/75 leading-relaxed max-w-xl">{t("join.body")}</p>
          </div>
          <div className="flex">
            <a href="mailto:info@verdelaw.com" className="cta-gold">
              {t("join.cta")}
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
