import type { CSSProperties } from "react";

export type FontPresetId =
  | "theme-default"
  | "great-vibes"
  | "playfair-display"
  | "cormorant-garamond"
  | "montserrat";

export type FontPreset = {
  id: FontPresetId;
  label: string;
  description: string;
  style: CSSProperties;
};

export const fontPresets: FontPreset[] = [
  {
    id: "theme-default",
    label: "Theme default",
    description: "Keep the original typography that comes with the chosen template.",
    style: {}
  },
  {
    id: "great-vibes",
    label: "Great Vibes",
    description: "A softer script-led direction with romantic headings and classic supporting text.",
    style: {
      "--font-display": "var(--font-great-vibes), 'Snell Roundhand', cursive",
      "--font-body": "var(--font-playfair), Georgia, serif",
      "--font-script": "var(--font-great-vibes), 'Snell Roundhand', cursive"
    } as CSSProperties
  },
  {
    id: "playfair-display",
    label: "Playfair Display",
    description: "Elegant, polished, and easy to read with a more refined editorial feel.",
    style: {
      "--font-display": "var(--font-playfair), Didot, serif",
      "--font-body": "var(--font-playfair), Georgia, serif",
      "--font-script": "var(--font-great-vibes), 'Snell Roundhand', cursive"
    } as CSSProperties
  },
  {
    id: "cormorant-garamond",
    label: "Cormorant Garamond",
    description: "Romantic and fashion-led, with a softer high-end invitation feel.",
    style: {
      "--font-display": "var(--font-cormorant), Garamond, serif",
      "--font-body": "var(--font-cormorant), Georgia, serif",
      "--font-script": "var(--font-great-vibes), 'Snell Roundhand', cursive"
    } as CSSProperties
  },
  {
    id: "montserrat",
    label: "Montserrat",
    description: "A cleaner modern look if the couple wants something fresher and less traditional.",
    style: {
      "--font-display": "var(--font-montserrat), Arial, sans-serif",
      "--font-body": "var(--font-montserrat), Arial, sans-serif",
      "--font-script": "var(--font-great-vibes), 'Snell Roundhand', cursive"
    } as CSSProperties
  }
];

export function getFontPresetById(id?: string | null) {
  return fontPresets.find((preset) => preset.id === id) ?? fontPresets[0];
}
