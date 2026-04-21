import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { PracticeTabs } from "@/components/practice/PracticeTabs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "practiceAreasPage.seo" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: locale === "es" ? "/es/areas-de-practica" : "/practice-areas",
    alternatePaths: {
      en: "/practice-areas",
      es: "/es/areas-de-practica",
    },
  });
}

export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("practiceAreasPage");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("practiceAreas") },
        ]}
      />
      <PracticeTabs />
      <FinalCTA />
    </>
  );
}
