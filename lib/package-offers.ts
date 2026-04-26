import type { IntakePackage } from "@/lib/intake";

export type PackageFeature = {
  title: string;
  copy: string;
};

export type PackageOffer = {
  id: IntakePackage;
  name: string;
  price: string;
  summary: string;
  brochureCopy: string;
  heroTitle: string;
  heroCopy: string;
  valueNote: string;
  included: string[];
  features: PackageFeature[];
  accentLabel: string;
};

export const packageOffers: PackageOffer[] = [
  {
    id: "basic",
    name: "Basic",
    price: "EUR245",
    summary: "A polished wedding website, prepared from the details already shared.",
    brochureCopy: "A polished guest-facing website, prepared from the details already shared.",
    heroTitle: "A beautiful ready-to-share wedding website, without the DIY work",
    heroCopy:
      "Basic is for couples who want the website handled properly without being pulled into a builder. The important information is shaped into a clear public-facing site, then reviewed before anything goes live.",
    valueNote: "Ideal if the main goal is a guest-ready wedding website with minimal effort from the couple.",
    included: [
      "Done-for-you website setup",
      "Schedule, travel, FAQ and RSVP sections",
      "Private review before it is shared",
      "One premium design direction"
    ],
    features: [
      {
        title: "Guest-ready public website",
        copy:
          "Names, date, schedule, travel notes, FAQs and key wedding information are turned into a clear site guests can actually use."
      },
      {
        title: "Private review before it goes live",
        copy:
          "The first version is prepared for review first, so the couple can check tone, details and layout before sharing anything publicly."
      },
      {
        title: "Low-effort start",
        copy:
          "Only the essentials are needed to begin. Rough notes are enough to get the first version moving."
      }
    ],
    accentLabel: "Website-first package"
  },
  {
    id: "smart",
    name: "Smart",
    price: "EUR395",
    summary: "A more polished first version, shaped faster with support behind the scenes.",
    brochureCopy: "Adds AI-assisted copy polish and a more refined first version.",
    heroTitle: "A faster, more finished first version with extra polish behind the scenes",
    heroCopy:
      "Smart keeps the done-for-you feel of Basic, but adds more help shaping rough notes into cleaner website wording and a more polished first draft.",
    valueNote: "Best for couples who want the website to feel more finished from the first review link, with less back-and-forth.",
    included: [
      "Everything in Basic",
      "AI-supported first draft",
      "More finished first version",
      "Optional concierge touches"
    ],
    features: [
      {
        title: "AI-supported wording polish",
        copy:
          "Rough phrasing, patchy notes and half-finished details can be shaped into cleaner website copy before the first version is sent for review."
      },
      {
        title: "Less manual tidying",
        copy:
          "Couples do not need to overthink how they write things. Smart helps lift the first version closer to guest-ready straight away."
      },
      {
        title: "Human review still included",
        copy:
          "This is not an AI-only product. A real person still checks the site, guides edits and makes sure the finished result feels right."
      }
    ],
    accentLabel: "Most chosen package"
  },
  {
    id: "premium",
    name: "Premium",
    price: "EUR645",
    summary: "Includes the website, the private planning area, and a guided premium handover.",
    brochureCopy: "Includes the website plus the private couple area and planning support.",
    heroTitle: "The wedding website plus a supported private planning area",
    heroCopy:
      "Premium combines the guest-facing website with a calmer private space for the couple. It is designed for people who want the website sorted and also want help keeping RSVPs, deadlines and planning details more organised.",
    valueNote: "Best value if the couple wants the website plus practical planning support, not just a public page.",
    included: [
      "Everything in Smart",
      "Private couple area",
      "Checklist, RSVP and planning tools",
      "1-hour walkthrough call"
    ],
    features: [
      {
        title: "RSVPs that stay connected to the wedding",
        copy:
          "Guest responses live alongside the wedding setup, so the couple can see replies and planning context together rather than juggling separate systems."
      },
      {
        title: "A private checklist and key-dates planner",
        copy:
          "Important tasks, reminders, supplier deadlines and wedding-week timings stay in one place, which helps the final stretch feel calmer."
      },
      {
        title: "Desktop-first seating planner",
        copy:
          "The seating plan gives a visual way to think through tables and guest groups, with the strongest experience on desktop or tablet when the couple is ready to sit down and map it out properly."
      },
      {
        title: "1-hour walkthrough call",
        copy:
          "Premium includes a guided call so the couple is shown exactly how to use the private area and can ask questions instead of being left alone with software."
      }
    ],
    accentLabel: "Premium planning support"
  }
];

export const packageOfferMap = Object.fromEntries(
  packageOffers.map((offer) => [offer.id, offer])
) as Record<IntakePackage, PackageOffer>;
