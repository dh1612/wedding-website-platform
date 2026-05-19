import type { Metadata } from "next";
import { BRAND_DOMAIN, BRAND_NAME } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: `Done-for-you wedding websites from ${BRAND_DOMAIN}, thoughtfully curated around each couple's style, with polished templates and a guided draft-to-live workflow.`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
