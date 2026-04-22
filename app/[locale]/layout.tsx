import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { BookingProvider } from "@/context/BookingContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { BackToTop } from "@/components/layout/BackToTop";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { PageTransition } from "@/components/layout/PageTransition";
import { localBusinessSchema } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es")) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <BookingProvider>
        <LenisProvider>
          <LoadingScreen />
          <Navbar />
          <main id="main" className="pt-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingWhatsApp />
          <StickyMobileCTA />
          <BackToTop />
          <CookieConsent />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
        </LenisProvider>
      </BookingProvider>
    </NextIntlClientProvider>
  );
}
