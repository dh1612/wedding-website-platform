import type { CSSProperties } from "react";

export type ThemeDefinition = {
  id: string;
  name: string;
  label: string;
  description: string;
  season: string;
  previewStyle: CSSProperties;
  style: CSSProperties;
  heroImage: string;
  detailImage?: string;
  heroLayout:
    | "split"
    | "full-bleed"
    | "editorial-frame"
    | "panorama"
    | "collage"
    | "cinematic";
};

type ThemeVars = {
  background: string;
  foreground: string;
  surface: string;
  surfaceStrong: string;
  border: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  accentContrast: string;
  muted: string;
  gold: string;
  shadow: string;
  pageGradient: string;
  cardGlow: string;
  heroGlow: string;
  fontBody: string;
  fontDisplay: string;
  fontScript?: string;
};

function createThemeStyle(vars: ThemeVars): CSSProperties {
  return {
    "--background": vars.background,
    "--foreground": vars.foreground,
    "--surface": vars.surface,
    "--surface-strong": vars.surfaceStrong,
    "--border": vars.border,
    "--accent": vars.accent,
    "--accent-soft": vars.accentSoft,
    "--accent-strong": vars.accentStrong,
    "--accent-contrast": vars.accentContrast,
    "--muted": vars.muted,
    "--gold": vars.gold,
    "--shadow": vars.shadow,
    "--page-gradient": vars.pageGradient,
    "--card-glow": vars.cardGlow,
    "--hero-glow": vars.heroGlow,
    "--font-body": vars.fontBody,
    "--font-display": vars.fontDisplay,
    "--font-script":
      vars.fontScript ??
      "'Snell Roundhand', 'Apple Chancery', 'URW Chancery L', cursive"
  } as CSSProperties;
}

export const weddingThemes: ThemeDefinition[] = [
  {
    id: "champagne-aegean",
    name: "Champagne Aegean",
    label: "Summer in Greece",
    description: "A champagne-and-neutral destination look with rich golden outlines, warm light, and a polished island-summer feel.",
    season: "Summer / Greece / destination",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(82,58,28,0.14), rgba(82,58,28,0.08)), url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f7f0e4",
      foreground: "#2f2418",
      surface: "rgba(255, 250, 242, 0.84)",
      surfaceStrong: "#fffaf1",
      border: "rgba(164, 123, 58, 0.34)",
      accent: "#b88d4a",
      accentSoft: "rgba(184, 141, 74, 0.16)",
      accentStrong: "#8b6328",
      accentContrast: "#fff9ef",
      muted: "#6f5c46",
      gold: "#d7b06a",
      shadow: "0 26px 74px rgba(104, 70, 25, 0.14)",
      pageGradient:
        "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.9), transparent 24%), radial-gradient(circle at 84% 18%, rgba(215,176,106,0.28), transparent 22%), linear-gradient(180deg, #fff9f0 0%, #f7f0e4 48%, #eddcc2 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,244,226,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(215,176,106,0.28), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "Didot, 'Bodoni MT', serif"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    heroLayout: "split"
  },
  {
    id: "soft-blush",
    name: "Manor House Romance",
    label: "Grand and understated",
    description: "An elegant country-house direction with soft stone, portrait framing, and a polished editorial feel.",
    season: "All season",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(16,24,21,0.12), rgba(16,24,21,0.08)), url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f7f1ea",
      foreground: "#2d241f",
      surface: "rgba(255, 251, 247, 0.78)",
      surfaceStrong: "#fffaf5",
      border: "rgba(94, 74, 62, 0.16)",
      accent: "#8f6f5a",
      accentSoft: "rgba(143, 111, 90, 0.12)",
      accentStrong: "#5d4537",
      accentContrast: "#fff8f1",
      muted: "#6b5a4f",
      gold: "#c7a56a",
      shadow: "0 22px 60px rgba(67, 45, 33, 0.12)",
      pageGradient:
        "radial-gradient(circle at top left, rgba(255, 255, 255, 0.85), transparent 28%), radial-gradient(circle at 80% 20%, rgba(199, 165, 106, 0.16), transparent 24%), linear-gradient(180deg, #fbf6f0 0%, #f7f1ea 55%, #f1e7dc 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      heroGlow:
        "radial-gradient(circle at top right, rgba(199,165,106,0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "Baskerville, 'Times New Roman', serif"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
    heroLayout: "editorial-frame"
  },
  {
    id: "summer-garden",
    name: "Cliffs of Moher",
    label: "Wild Atlantic drama",
    description: "A windswept Irish coast look with panoramic landscape imagery, soft ivory text cards, and destination energy.",
    season: "Atlantic / destination",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(17,44,48,0.16), rgba(17,44,48,0.1)), url('https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1600')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f7f5ec",
      foreground: "#243126",
      surface: "rgba(255, 252, 247, 0.82)",
      surfaceStrong: "#fffdf8",
      border: "rgba(99, 126, 101, 0.18)",
      accent: "#7d9878",
      accentSoft: "rgba(125, 152, 120, 0.16)",
      accentStrong: "#4d694a",
      accentContrast: "#f8fff6",
      muted: "#586857",
      gold: "#d8bd7d",
      shadow: "0 24px 70px rgba(91, 112, 82, 0.14)",
      pageGradient:
        "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.9), transparent 26%), radial-gradient(circle at 88% 18%, rgba(255, 210, 214, 0.24), transparent 22%), linear-gradient(180deg, #fffaf2 0%, #edf4e7 52%, #dde8d5 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,244,234,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(255, 209, 214, 0.32), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.22), transparent)",
      fontBody: "'Palatino Linotype', Palatino, serif",
      fontDisplay: "Didot, 'Bodoni MT', serif"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    detailImage:
      "https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=900",
    heroLayout: "full-bleed"
  },
  {
    id: "summer-coast",
    name: "Burren Stone",
    label: "Earthy Irish landscape",
    description: "A softer, stonier direction with layered texture, open space, and a grounded west-of-Ireland mood.",
    season: "Spring / summer / autumn",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)), url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#edf4f5",
      foreground: "#19303a",
      surface: "rgba(250, 254, 255, 0.8)",
      surfaceStrong: "#fbfeff",
      border: "rgba(61, 104, 118, 0.16)",
      accent: "#6c96a1",
      accentSoft: "rgba(108, 150, 161, 0.16)",
      accentStrong: "#345866",
      accentContrast: "#f5fcff",
      muted: "#53717c",
      gold: "#d0b178",
      shadow: "0 24px 72px rgba(41, 92, 111, 0.14)",
      pageGradient:
        "radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 24%), radial-gradient(circle at 82% 16%, rgba(121, 175, 190, 0.2), transparent 22%), linear-gradient(180deg, #f8fcff 0%, #edf4f5 48%, #dfecef 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.26), rgba(198,221,226,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(148, 196, 205, 0.24), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "'Hoefler Text', Garamond, serif"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=80",
    heroLayout: "panorama"
  },
  {
    id: "classical-soiree",
    name: "Heirloom Rings",
    label: "Detail-led and intimate",
    description: "A close-up, detail-driven template with ring-inspired motifs, layered cards, and a luxurious keepsake feel.",
    season: "Formal / year-round",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(38,33,28,0.12), rgba(38,33,28,0.08)), url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#efebe5",
      foreground: "#1e1b18",
      surface: "rgba(255, 252, 247, 0.78)",
      surfaceStrong: "#fffdf9",
      border: "rgba(58, 49, 42, 0.18)",
      accent: "#8f7a55",
      accentSoft: "rgba(143, 122, 85, 0.16)",
      accentStrong: "#32281d",
      accentContrast: "#fffaf1",
      muted: "#54483f",
      gold: "#c6a96a",
      shadow: "0 28px 80px rgba(34, 27, 20, 0.14)",
      pageGradient:
        "radial-gradient(circle at 15% 2%, rgba(255,255,255,0.86), transparent 24%), radial-gradient(circle at 85% 12%, rgba(198, 169, 106, 0.18), transparent 22%), linear-gradient(180deg, #faf6f0 0%, #efebe5 50%, #e4ddd2 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,248,236,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(198, 169, 106, 0.2), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.14), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "Didot, 'Bodoni MT', serif"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=80",
    heroLayout: "collage"
  },
  {
    id: "tailored-vows",
    name: "Tailored Vows",
    label: "Black tie detail",
    description: "A close-up formalwear template with blazer texture, boutonniere details, and a sharper luxury feel.",
    season: "Formal / autumn / winter",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(18,22,24,0.18), rgba(18,22,24,0.18)), url('https://images.pexels.com/photos/33425288/pexels-photo-33425288.jpeg?auto=compress&cs=tinysrgb&w=1200')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f4f1ec",
      foreground: "#1d1c1a",
      surface: "rgba(255, 252, 247, 0.82)",
      surfaceStrong: "#fffdf9",
      border: "rgba(62, 57, 50, 0.16)",
      accent: "#8e7152",
      accentSoft: "rgba(142, 113, 82, 0.14)",
      accentStrong: "#1d1c1a",
      accentContrast: "#fff8f1",
      muted: "#5d564e",
      gold: "#caa868",
      shadow: "0 28px 78px rgba(32, 24, 21, 0.16)",
      pageGradient:
        "radial-gradient(circle at 10% 0%, rgba(255,255,255,0.92), transparent 24%), radial-gradient(circle at 86% 16%, rgba(202,168,104,0.16), transparent 22%), linear-gradient(180deg, #faf7f1 0%, #f1ece6 50%, #e8ddd1 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,248,236,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(202,168,104,0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.14), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "Didot, 'Bodoni MT', serif"
    }),
    heroImage:
      "https://images.pexels.com/photos/33425288/pexels-photo-33425288.jpeg?auto=compress&cs=tinysrgb&w=1600",
    heroLayout: "split"
  },
  {
    id: "ring-exchange",
    name: "Ring Exchange",
    label: "Moment-focused",
    description: "Built around the intimacy of the ring moment, with close-up hands and softer, romantic contrast.",
    season: "All season",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(34,28,24,0.16), rgba(34,28,24,0.16)), url('https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=1200')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f6efe8",
      foreground: "#29211d",
      surface: "rgba(255, 252, 248, 0.8)",
      surfaceStrong: "#fffaf5",
      border: "rgba(88, 69, 58, 0.14)",
      accent: "#a78062",
      accentSoft: "rgba(167, 128, 98, 0.14)",
      accentStrong: "#6c4f3a",
      accentContrast: "#fff8f2",
      muted: "#6c5b4f",
      gold: "#d2b17c",
      shadow: "0 24px 72px rgba(54, 34, 26, 0.12)",
      pageGradient:
        "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.88), transparent 24%), radial-gradient(circle at 82% 18%, rgba(210,177,124,0.18), transparent 22%), linear-gradient(180deg, #fbf6f0 0%, #f6efe8 54%, #ece1d6 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,248,242,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(210,177,124,0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "'Cormorant Garamond', 'Hoefler Text', Garamond, serif"
    }),
    heroImage:
      "https://images.pexels.com/photos/30268257/pexels-photo-30268257.jpeg?auto=compress&cs=tinysrgb&w=1600",
    heroLayout: "collage"
  },
  {
    id: "invitation-suite",
    name: "Invitation Suite",
    label: "Paper and keepsake",
    description: "A stationery-led template with invitation styling, tactile paper tones, and soft editorial framing.",
    season: "Spring / all season",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(42,38,34,0.08), rgba(42,38,34,0.08)), url('https://images.pexels.com/photos/29821868/pexels-photo-29821868.jpeg?auto=compress&cs=tinysrgb&w=1200')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f7f1ea",
      foreground: "#2d241f",
      surface: "rgba(255, 251, 247, 0.86)",
      surfaceStrong: "#fffaf5",
      border: "rgba(94, 74, 62, 0.14)",
      accent: "#8c6f58",
      accentSoft: "rgba(140, 111, 88, 0.12)",
      accentStrong: "#5d4537",
      accentContrast: "#fff8f1",
      muted: "#6f5b4d",
      gold: "#c7a56a",
      shadow: "0 24px 68px rgba(67, 45, 33, 0.12)",
      pageGradient:
        "radial-gradient(circle at top left, rgba(255,255,255,0.88), transparent 28%), radial-gradient(circle at 80% 18%, rgba(199,165,106,0.14), transparent 22%), linear-gradient(180deg, #fbf6f0 0%, #f7f1ea 55%, #efe4d8 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      heroGlow:
        "radial-gradient(circle at top right, rgba(199,165,106,0.16), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "Baskerville, 'Times New Roman', serif"
    }),
    heroImage:
      "https://images.pexels.com/photos/29821868/pexels-photo-29821868.jpeg?auto=compress&cs=tinysrgb&w=1600",
    heroLayout: "editorial-frame"
  },
  {
    id: "botanical-rings",
    name: "Botanical Rings",
    label: "Organic flat lay",
    description: "A ring-detail template with greenery, botanical texture, and a romantic detail-styling mood.",
    season: "Spring / summer",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(21,44,39,0.12), rgba(21,44,39,0.12)), url('https://images.pexels.com/photos/21928758/pexels-photo-21928758.jpeg?auto=compress&cs=tinysrgb&w=1200')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f2f5ef",
      foreground: "#243029",
      surface: "rgba(253, 255, 251, 0.84)",
      surfaceStrong: "#ffffff",
      border: "rgba(65, 98, 83, 0.14)",
      accent: "#6a8d7b",
      accentSoft: "rgba(106, 141, 123, 0.14)",
      accentStrong: "#355847",
      accentContrast: "#f6fff9",
      muted: "#5d7167",
      gold: "#ccb073",
      shadow: "0 24px 70px rgba(45, 76, 61, 0.12)",
      pageGradient:
        "radial-gradient(circle at 14% 0%, rgba(255,255,255,0.9), transparent 26%), radial-gradient(circle at 86% 16%, rgba(204,176,115,0.12), transparent 20%), linear-gradient(180deg, #f7fbf5 0%, #edf4ee 50%, #dde8df 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(240,248,243,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(130,170,152,0.2), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "'Palatino Linotype', Palatino, serif",
      fontDisplay: "'Cormorant Garamond', 'Hoefler Text', Garamond, serif"
    }),
    heroImage:
      "https://images.pexels.com/photos/21928758/pexels-photo-21928758.jpeg?auto=compress&cs=tinysrgb&w=1600",
    heroLayout: "panorama"
  },
  {
    id: "black-tie-details",
    name: "Black Tie Details",
    label: "Styled accessories",
    description: "A sharper detail template built around invitation styling, dress shoes, tie textures, and polished wedding accessories.",
    season: "Autumn / winter / formal",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(28,22,18,0.14), rgba(28,22,18,0.14)), url('https://images.pexels.com/photos/34433181/pexels-photo-34433181.jpeg?auto=compress&cs=tinysrgb&w=1200')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f5f0ea",
      foreground: "#2b221d",
      surface: "rgba(255, 252, 247, 0.82)",
      surfaceStrong: "#fffdf9",
      border: "rgba(89, 70, 57, 0.14)",
      accent: "#9a785d",
      accentSoft: "rgba(154, 120, 93, 0.14)",
      accentStrong: "#5b4435",
      accentContrast: "#fff8f0",
      muted: "#6c5b4e",
      gold: "#cba467",
      shadow: "0 24px 76px rgba(63, 45, 31, 0.14)",
      pageGradient:
        "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.9), transparent 26%), radial-gradient(circle at 84% 16%, rgba(203,164,103,0.16), transparent 20%), linear-gradient(180deg, #fbf7f2 0%, #f5f0ea 52%, #eadfd3 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,248,240,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(203,164,103,0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "Didot, 'Bodoni MT', serif"
    }),
    heroImage:
      "https://images.pexels.com/photos/34433181/pexels-photo-34433181.jpeg?auto=compress&cs=tinysrgb&w=1600",
    heroLayout: "full-bleed"
  },
  {
    id: "aegean-romance",
    name: "Aegean Romance",
    label: "Destination Greece",
    description: "Sun-washed whites, sea-glass blues, and warm stone neutrals for a Mediterranean wedding by the water.",
    season: "Spring / summer / destination",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(22,44,63,0.12), rgba(22,44,63,0.08)), url('https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#edf5f7",
      foreground: "#17313c",
      surface: "rgba(255, 253, 250, 0.82)",
      surfaceStrong: "#fffdf8",
      border: "rgba(76, 117, 132, 0.18)",
      accent: "#7aaec0",
      accentSoft: "rgba(122, 174, 192, 0.16)",
      accentStrong: "#2e667a",
      accentContrast: "#f8fdff",
      muted: "#5d7b84",
      gold: "#d4b57a",
      shadow: "0 24px 74px rgba(48, 96, 118, 0.14)",
      pageGradient:
        "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.92), transparent 26%), radial-gradient(circle at 86% 16%, rgba(122,174,192,0.18), transparent 22%), linear-gradient(180deg, #fcf7f0 0%, #eef5f7 42%, #dfeef2 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(241,249,251,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(122,174,192,0.2), transparent 30%), radial-gradient(circle at 72% 12%, rgba(212,181,122,0.14), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "'Palatino Linotype', Palatino, serif",
      fontDisplay: "'Cormorant Garamond', 'Hoefler Text', Garamond, serif",
      fontScript:
        "'Snell Roundhand', 'Apple Chancery', 'Zapfino', 'URW Chancery L', cursive"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1600&q=80",
    detailImage:
      "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=900",
    heroLayout: "panorama"
  },
  {
    id: "en-kipo-garden",
    name: "En Kipo Garden",
    label: "Santorini garden dinner",
    description: "Olive greens, warm stone, soft candlelight, and a more intimate Greek garden feel inspired by En Kipo.",
    season: "Spring / summer / destination",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(28,45,36,0.18), rgba(28,45,36,0.1)), url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f5f1e8",
      foreground: "#223129",
      surface: "rgba(255, 252, 247, 0.84)",
      surfaceStrong: "#fffdf8",
      border: "rgba(74, 97, 83, 0.16)",
      accent: "#7e9275",
      accentSoft: "rgba(126, 146, 117, 0.14)",
      accentStrong: "#465c4f",
      accentContrast: "#f7fbf6",
      muted: "#5f6f66",
      gold: "#c9ab72",
      shadow: "0 24px 72px rgba(47, 66, 56, 0.14)",
      pageGradient:
        "radial-gradient(circle at 12% 0%, rgba(255,255,255,0.92), transparent 26%), radial-gradient(circle at 84% 18%, rgba(201,171,114,0.16), transparent 22%), linear-gradient(180deg, #fbf7ef 0%, #f2efe6 45%, #e6e2d5 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(247,243,233,0.08))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(126,146,117,0.18), transparent 30%), radial-gradient(circle at 72% 14%, rgba(201,171,114,0.14), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
      fontBody: "'Palatino Linotype', Palatino, serif",
      fontDisplay: "'Cormorant Garamond', 'Hoefler Text', Garamond, serif",
      fontScript:
        "'Snell Roundhand', 'Apple Chancery', 'Zapfino', 'URW Chancery L', cursive"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
    detailImage:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900",
    heroLayout: "editorial-frame"
  },
  {
    id: "winter-velvet",
    name: "Winter Velvet",
    label: "Rich seasonal",
    description: "Mulberry, evergreen, and candlelight neutrals for late autumn and winter weddings.",
    season: "Late autumn / winter",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(4,28,20,0.22), rgba(4,28,20,0.28)), url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#06402b",
      foreground: "#eef4f0",
      surface: "rgba(6, 64, 43, 0.74)",
      surfaceStrong: "#0b4c34",
      border: "rgba(6, 64, 43, 0.24)",
      accent: "#157156",
      accentSoft: "rgba(6, 64, 43, 0.16)",
      accentStrong: "#06402b",
      accentContrast: "#f3f7f4",
      muted: "#cfe0d6",
      gold: "#d6bb82",
      shadow: "0 28px 82px rgba(6, 64, 43, 0.18)",
      pageGradient:
        "radial-gradient(circle at 14% 0%, rgba(255,255,255,0.2), transparent 20%), radial-gradient(circle at 84% 12%, rgba(21, 113, 86, 0.12), transparent 22%), linear-gradient(180deg, #082e20 0%, #06402b 38%, #0f513c 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(6,64,43,0.02))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(6, 64, 43, 0.34), transparent 32%), radial-gradient(circle at 72% 14%, rgba(21, 113, 86, 0.2), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.06), transparent)",
      fontBody: "'Palatino Linotype', Palatino, serif",
      fontDisplay: "'Cormorant Garamond', 'Hoefler Text', Garamond, serif",
      fontScript:
        "'Snell Roundhand', 'Apple Chancery', 'Zapfino', 'URW Chancery L', cursive"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
    heroLayout: "cinematic"
  },
  {
    id: "christmas-candlelight",
    name: "Christmas Candlelight",
    label: "Festive elegance",
    description: "Deep forest, merlot, and gold for a luxurious Christmas wedding feel.",
    season: "Christmas / winter",
    previewStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(20,39,34,0.22), rgba(20,39,34,0.24)), url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    style: createThemeStyle({
      background: "#f3ece4",
      foreground: "#1f201c",
      surface: "rgba(255, 250, 244, 0.8)",
      surfaceStrong: "#fffaf3",
      border: "rgba(31, 59, 50, 0.24)",
      accent: "#8f2f42",
      accentSoft: "rgba(31, 59, 50, 0.16)",
      accentStrong: "#1f3b32",
      accentContrast: "#f8f4ec",
      muted: "#4d5a53",
      gold: "#c9a55c",
      shadow: "0 30px 84px rgba(20, 40, 34, 0.2)",
      pageGradient:
        "radial-gradient(circle at top left, rgba(255,255,255,0.88), transparent 24%), radial-gradient(circle at 88% 14%, rgba(201, 165, 92, 0.18), transparent 22%), linear-gradient(180deg, #f8f3ec 0%, #f3ece4 42%, #e1d3c0 100%)",
      cardGlow:
        "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(201,165,92,0.05))",
      heroGlow:
        "radial-gradient(circle at top right, rgba(31, 59, 50, 0.24), transparent 30%), radial-gradient(circle at 72% 14%, rgba(143, 47, 66, 0.14), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.14), transparent)",
      fontBody: "Georgia, 'Times New Roman', serif",
      fontDisplay: "Didot, 'Bodoni MT', serif"
    }),
    heroImage:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=80",
    heroLayout: "split"
  }
];

export function getThemeById(themeId: string) {
  return weddingThemes.find((theme) => theme.id === themeId) ?? weddingThemes[0];
}
