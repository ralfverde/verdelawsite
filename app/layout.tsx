import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
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
  title: "Verde Law, PLLC — Humanitarian Immigration Attorneys",
  description:
    "Miami-based humanitarian immigration law firm serving Spanish-speaking immigrants across all 50 states.",
  metadataBase: new URL("https://verdelaw.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${cormorant.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
