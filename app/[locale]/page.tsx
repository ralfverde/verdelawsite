import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { PracticeOverview } from "@/components/home/PracticeOverview";
import { WhyVerde } from "@/components/home/WhyVerde";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Testimonials } from "@/components/home/Testimonials";
import { AttorneyFeature } from "@/components/home/AttorneyFeature";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { VerdePlusTeaser } from "@/components/home/VerdePlusTeaser";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title:
      locale === "es"
        ? "Abogados de Inmigración en Miami — Verde Law"
        : "Miami Immigration Attorneys — Verde Law",
    description:
      locale === "es"
        ? "Más de 600 familias confían en Verde Law para defender sus derechos migratorios en los 50 estados. Consulta gratuita, sin compromiso."
        : "Over 600 families trust Verde Law to defend their immigration rights across all 50 states. Free consultation, no obligation.",
    path: locale === "es" ? "/es" : "/",
    alternatePaths: { en: "/", es: "/es" },
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <SocialProof />
      <PracticeOverview />
      <CTABanner variant="light" titleKey="bannerLight.title" />
      <WhyVerde />
      <ProcessSteps />
      <CTABanner variant="dark" titleKey="bannerDark.title" />
      <Testimonials />
      <AttorneyFeature />
      <VideoShowcase />
      <VerdePlusTeaser />
      <FinalCTA />
    </>
  );
}
