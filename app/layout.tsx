import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David's Wedding Solutions",
  description: "Done-for-you wedding websites powered by guided intake, polished templates, and a draft-to-live workflow."
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
