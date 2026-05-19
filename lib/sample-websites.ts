import type { SampleWeddingId } from "@/data/sample-weddings";

export type SampleWebsiteShowcase = {
  sampleId: SampleWeddingId;
  themeId: string;
  title: string;
  label: string;
  location: string;
  image: string;
  blurb: string;
  tone: "romantic" | "coastal" | "editorial";
  accent: string;
  kicker: string;
};

export const sampleWebsiteShowcases: SampleWebsiteShowcase[] = [
  {
    sampleId: "manor-house",
    themeId: "soft-blush",
    title: "Manor House Romance",
    label: "Country house weekend",
    location: "Ballymagarvey Village, Co. Meath",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
    blurb:
      "A polished countryside example with accommodation, suppliers, RSVP flow, and a proper day-two brunch section.",
    tone: "romantic",
    accent: "Soft ivory, candlelight, and country-house warmth",
    kicker: "Country house weekend"
  },
  {
    sampleId: "atlantic-weekend",
    themeId: "summer-garden",
    title: "Cliffs & Coast Weekend",
    label: "Atlantic destination feel",
    location: "Spanish Point, Co. Clare",
    image:
      "https://images.unsplash.com/photo-1546986294-d9cdc4873420?auto=format&fit=crop&fm=jpg&q=80&w=1400",
    blurb:
      "A fuller wedding-weekend example with travel planning, stay options, local suppliers, and a standout day-two event.",
    tone: "coastal",
    accent: "Atlantic blues, open skies, and destination energy",
    kicker: "Atlantic destination feel"
  },
  {
    sampleId: "black-tie-city",
    themeId: "tailored-vows",
    title: "Black Tie City Celebration",
    label: "Formal and editorial",
    location: "The Merrion, Dublin",
    image:
      "https://images.pexels.com/photos/33425288/pexels-photo-33425288.jpeg?auto=compress&cs=tinysrgb&w=1400",
    blurb:
      "A sharper formal example with city-stay recommendations, RSVP, and a more invitation-led look and feel.",
    tone: "editorial",
    accent: "Black-tie structure, city polish, and invitation-led styling",
    kicker: "Formal and editorial"
  }
];

export const defaultSampleWebsiteShowcase = sampleWebsiteShowcases[0];
