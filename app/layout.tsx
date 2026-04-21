import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
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
    <html className={`${dmSerif.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
