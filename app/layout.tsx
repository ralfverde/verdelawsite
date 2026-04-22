import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verdelaw.com"),
  title: {
    template: "%s | Verde Law — Immigration Attorneys",
    default:
      "Verde Law — Immigration Attorneys | Miami | All 50 States",
  },
  description:
    "Verde Law is a Miami-based immigration law firm serving all 50 states. Deportation defense, asylum, bond hearings, family petitions. Free consultation.",
  keywords: [
    "immigration lawyer",
    "immigration attorney Miami",
    "deportation defense",
    "asylum lawyer",
    "bond hearing",
    "VAWA",
    "U-visa",
    "abogado de inmigración",
    "defensa de deportación",
    "abogado de asilo",
    "Verde Law",
    "Rafael Verde",
  ],
  authors: [{ name: "Verde Law, PLLC" }],
  creator: "Verde Law, PLLC",
  publisher: "Verde Law, PLLC",
  formatDetection: { telephone: true, email: true, address: true },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
    siteName: "Verde Law",
    url: "https://verdelaw.com",
    images: [
      {
        url: "/images/verde-law-logo.png",
        width: 1200,
        height: 630,
        alt: "Verde Law — Immigration Attorneys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@verdelawfirm",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${outfit.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
