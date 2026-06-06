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
    summary: "An elegant information-only wedding website, prepared from the details already shared.",
    brochureCopy: "A polished guest-facing website focused on guest information, not RSVP collection.",
    heroTitle: "A beautiful ready-to-share wedding website, without the DIY work",
    heroCopy:
      "Basic is for couples who want the website handled properly without being pulled into a builder. The important information is shaped into a clear guest-facing site, then reviewed before anything goes live.",
    valueNote: "Ideal if the main goal is a beautiful information website guests can rely on, without extra planning tools.",
    included: [
      "Done-for-you website setup",
      "Schedule, travel, stay and FAQ sections",
      "Private review before it is shared",
      "One premium design direction"
    ],
    features: [
      {
        title: "Information-first guest website",
        copy:
          "Names, date, schedule, travel notes, stay suggestions, FAQs and key wedding information are turned into a clear site guests can actually use."
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
    summary: "Adds website RSVP with guest tracking and a guided walkthrough.",
    brochureCopy: "Adds RSVP through the website, guest tracking, and a guided walkthrough call.",
    heroTitle: "A more complete guest website, with RSVP and smarter support built in",
    heroCopy:
      "Smart keeps the done-for-you feel of Basic, but adds the pieces most couples actually need once replies begin: website RSVP, guest tracking, and a walkthrough call so everything feels clear.",
    valueNote: "Best for couples who want guest replies and a clearer handover without moving up to the full planning portal.",
    included: [
      "Everything in Basic",
      "RSVP via the website",
      "Guest tracking dashboard",
      "1-hour walkthrough call"
    ],
    features: [
      {
        title: "Website RSVP without extra tools",
        copy:
          "Smart adds the RSVP experience directly into the website, so guests can respond in one place without the couple having to bolt on another system."
      },
      {
        title: "A clearer guest tracking view",
        copy:
          "Replies are collected through the website and shown back in the dashboard, so the couple can keep track of guest numbers and notes in one place."
      },
      {
        title: "A real walkthrough still included",
        copy:
          "Smart includes a 1-hour walkthrough call, so everything feels clear from the start and the final handover stays calm and guided."
      }
    ],
    accentLabel: "Most practical package"
  },
  {
    id: "premium",
    name: "Premium",
    price: "EUR645",
    summary: "The full experience, including the private couple portal, AI concierge, and every planning feature.",
    brochureCopy: "Includes the website, the private couple portal, AI concierge access, and the full planning side.",
    heroTitle: "The full wedding website and planning setup, handled in one place",
    heroCopy:
      "Premium combines the guest-facing website with the full private couple portal. It is for couples who want the website sorted and also want the planning side — RSVPs, deadlines, seating and organisation — to live in one calmer system.",
    valueNote: "Best value if the couple wants access to everything, not just the public-facing website.",
    included: [
      "Everything in Smart",
      "Private couple portal",
      "AI concierge access",
      "Checklist, seating plan and planning tools",
      "Full premium access"
    ],
    features: [
      {
        title: "The full private portal",
        copy:
          "Premium opens the couple portal properly, so the website, guest replies, and planning tools are all connected rather than scattered."
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
        title: "Everything from Smart still included",
        copy:
          "Premium still includes the RSVP setup, AI concierge access, and guided walkthrough — it simply adds the fuller planning side on top."
      }
    ],
    accentLabel: "Premium planning support"
  }
];

export const packageOfferMap = Object.fromEntries(
  packageOffers.map((offer) => [offer.id, offer])
) as Record<IntakePackage, PackageOffer>;
