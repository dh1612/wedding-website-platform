import type { Metadata } from "next";
import {
  Alex_Brush,
  Cormorant_Garamond,
  Great_Vibes,
  Lato,
  Montserrat,
  Playfair_Display
} from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BRAND_DOMAIN, BRAND_NAME } from "@/lib/brand";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"]
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400"
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex-brush",
  weight: "400"
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND_DOMAIN}`),
  title: {
    default: BRAND_NAME,
    template: `%s | ${BRAND_NAME}`
  },
  description: `Done-for-you wedding websites from ${BRAND_DOMAIN}, thoughtfully curated around each couple's style, with polished templates and a guided draft-to-live workflow.`,
  openGraph: {
    title: BRAND_NAME,
    description: `Done-for-you wedding websites from ${BRAND_DOMAIN}, thoughtfully curated around each couple's style, with polished templates and a guided draft-to-live workflow.`,
    url: `https://${BRAND_DOMAIN}`,
    siteName: BRAND_NAME,
    locale: "en_IE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description: `Done-for-you wedding websites from ${BRAND_DOMAIN}, thoughtfully curated around each couple's style, with polished templates and a guided draft-to-live workflow.`
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${montserrat.variable} ${greatVibes.variable} ${alexBrush.variable} ${lato.variable}`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
