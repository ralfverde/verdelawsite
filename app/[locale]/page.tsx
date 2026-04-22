import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { TrustBar } from "@/components/home/TrustBar";
import { PracticeOverview } from "@/components/home/PracticeOverview";
import { WhyVerde } from "@/components/home/WhyVerde";
import { CaseResults } from "@/components/home/CaseResults";
// Below-the-fold components get their JS split so the initial bundle
// only has to carry Hero + SocialProof + the first couple of sections.
// Each still SSRs (default) so SEO sees the full content.
const ProcessSteps = dynamic(() =>
  import("@/components/home/ProcessSteps").then((m) => ({ default: m.ProcessSteps })),
);
const Testimonials = dynamic(() =>
  import("@/components/home/Testimonials").then((m) => ({ default: m.Testimonials })),
);
const AttorneyFeature = dynamic(() =>
  import("@/components/home/AttorneyFeature").then((m) => ({ default: m.AttorneyFeature })),
);
const VideoShowcase = dynamic(() =>
  import("@/components/home/VideoShowcase").then((m) => ({ default: m.VideoShowcase })),
);
const VerdePlusTeaser = dynamic(() =>
  import("@/components/home/VerdePlusTeaser").then((m) => ({ default: m.VerdePlusTeaser })),
);
const EligibilityQuiz = dynamic(() =>
  import("@/components/home/EligibilityQuiz").then((m) => ({ default: m.EligibilityQuiz })),
);
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionDivider } from "@/components/ui/SectionDivider";
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
        ? "Abogados de Inmigración en Miami · Verde Law"
        : "Miami Immigration Attorneys · Verde Law",
    description:
      locale === "es"
        ? "Miles de familias confían en Verde Law para defender sus derechos migratorios en los 50 estados. Consulta gratuita, sin compromiso."
        : "Thousands of families trust Verde Law to defend their immigration rights across all 50 states. Free consultation, no obligation.",
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
      <SectionDivider variant="diagonal" direction="dark-to-light" />
      <SocialProof />
      <TrustBar />
      <PracticeOverview />
      <CTABanner variant="light" titleKey="bannerLight.title" />
      <WhyVerde />
      <CaseResults />
      <SectionDivider variant="diagonal" direction="light-to-dark" />
      <ProcessSteps />
      <CTABanner variant="dark" titleKey="bannerDark.title" />
      <Testimonials />
      <SectionDivider variant="diagonal" direction="light-to-dark" />

      {/* Eligibility quiz */}
      <section className="noise-bg bg-verde-950 py-14 md:py-16">
        <div className="container-wide text-center mb-12">
          <SectionEyebrow>{tQuiz("sectionEyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-heading text-white max-w-2xl mx-auto"
          >
            {tQuiz("sectionTitle")}
          </h2>
        </div>
        <div className="container-wide">
          <EligibilityQuiz />
        </div>
      </section>

      <AttorneyFeature />
      <SectionDivider variant="diagonal" direction="dark-to-light" />
      <VideoShowcase />
      <SectionDivider variant="diagonal" direction="light-to-dark" />
      <VerdePlusTeaser />
      <FinalCTA />
    </>
  );
}
