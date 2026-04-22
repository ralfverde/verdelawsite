import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { PracticeOverview } from "@/components/home/PracticeOverview";
import { WhyVerde } from "@/components/home/WhyVerde";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Testimonials } from "@/components/home/Testimonials";
import { AttorneyFeature } from "@/components/home/AttorneyFeature";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { VerdePlusTeaser } from "@/components/home/VerdePlusTeaser";
import { EligibilityQuiz } from "@/components/home/EligibilityQuiz";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
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
  const tQuiz = await getTranslations("quiz");

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

      {/* Eligibility quiz */}
      <section className="noise-bg bg-verde-950 py-24">
        <div className="container-wide text-center mb-12">
          <SectionEyebrow>{tQuiz("sectionEyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-display text-white max-w-2xl mx-auto"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)", lineHeight: 1.1 }}
          >
            {tQuiz("sectionTitle")}
          </h2>
        </div>
        <div className="container-wide">
          <EligibilityQuiz />
        </div>
      </section>

      <AttorneyFeature />
      <VideoShowcase />
      <VerdePlusTeaser />
      <FinalCTA />
    </>
  );
}
