import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "knotlesswed.ie",
  description: "Done-for-you wedding websites with real human support, polished templates, and a guided draft-to-live workflow."
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
