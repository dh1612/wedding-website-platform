import type { Metadata } from "next";
import { WeddingSitePage } from "@/components/wedding-site-page";
import { getThemeById } from "@/lib/themes";
import type { WeddingData } from "@/types/wedding";

export const metadata: Metadata = {
  title: "Private Coastal Concept",
  robots: {
    index: false,
    follow: false
  }
};

const routePath = "/private-preview/armada-spanish-point-concept";

const weddingData: WeddingData = {
  couple: "Maeve & Ronan",
  date: "September 18, 2027",
  theme: "summer-coast",
  hero: {
    eyebrow: "Private Coastal Concept",
    previewNote:
      "This is a private concept page prepared for selective sharing and venue outreach only.",
    primaryActionLabel: "View the weekend",
    primaryActionHref: "#schedule",
    secondaryActionLabel: "Stay nearby",
    secondaryActionHref: "#stay"
  },
  locationSummary: "Spanish Point, Co. Clare",
  tagline:
    "A west coast wedding weekend shaped around sea views, good food, and the kind of atmosphere that lets guests settle in properly.",
  announcement:
    "This concept shows how a venue-led wedding website can feel both beautifully personal and genuinely useful from the first glance.",
  heroImage: "/armada-concept/shoreline-wide.jpg",
  story: {
    heading: "Our Story So Far",
    paragraphs: [],
    timelineOnly: true,
    timeline: [
      {
        dateLabel: "Spring 2022",
        title: "We met by the coast",
        note:
          "One easy conversation turned into long walks, coffee stops, and the beginning of something that felt quietly certain.",
        image: "/armada-concept/bright-coast.jpg"
      },
      {
        dateLabel: "Autumn 2023",
        title: "Weekend escapes became our thing",
        note:
          "Whenever life felt busy, the west coast was where we went to reset and properly catch up.",
        image: "/armada-concept/coast-view-1.jpg"
      },
      {
        dateLabel: "Summer 2025",
        title: "We knew how we wanted it to feel",
        note:
          "Sea air, good hospitality, and a place guests could enjoy for more than a single evening.",
        image: "/armada-concept/coastal-path.jpg"
      },
      {
        dateLabel: "Winter 2026",
        title: "We got engaged",
        note:
          "A small moment, a very easy yes, and a lot of excited planning afterwards.",
        image: "/armada-concept/armada-evening.jpg"
      },
      {
        dateLabel: "Autumn 2027",
        title: "Now we gather by the Atlantic",
        note:
          "A wedding weekend with time to settle in, celebrate properly, and make a little holiday of it.",
        image: "/armada-concept/shoreline-wide.jpg"
      }
    ]
  },
  ceremony: {
    title: "Ceremony",
    time: "3:00 PM",
    location: "Armada House",
    address: "Spanish Point, Co. Clare",
    mapLink: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point",
    description:
      "Guests are invited to arrive in good time so the afternoon can begin slowly and without any rush."
  },
  reception: {
    title: "Reception",
    time: "5:00 PM",
    location: "Armada House",
    address: "Spanish Point, Co. Clare",
    mapLink: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point",
    description:
      "Drinks, dinner, and the evening celebration all continue in one place overlooking the Atlantic."
  },
  scheduleEyebrow: "Wedding Weekend",
  scheduleHeading: "A Celebration Across The Coast",
  scheduleDescription:
    "A clear outline of the wedding day and the relaxed moments around it, so guests can enjoy the trip without over-planning every hour.",
  scheduleNote:
    "With so much close at hand, the weekend can feel easy from the moment guests arrive.",
  scheduleStepLabel: "Moment",
  schedule: [
    {
      time: "Friday evening",
      title: "Arrivals on the coast",
      details:
        "Guests check in, get their bearings, and settle into Spanish Point or nearby villages."
    },
    {
      time: "Saturday, 1:30 PM",
      title: "Guests arrive at Armada House",
      details:
        "A little breathing room before the ceremony begins, with time to greet people and take in the view."
    },
    {
      time: "Saturday, 3:00 PM",
      title: "Ceremony",
      details:
        "The wedding ceremony begins, followed by drinks and a gentle turn into the evening."
    },
    {
      time: "Saturday, 5:00 PM",
      title: "Dinner & celebration",
      details:
        "Dinner, speeches, and a full evening celebration overlooking the Atlantic."
    },
    {
      time: "Sunday, 11:30 AM",
      title: "A slower send-off",
      details:
        "A final catch-up over coffee or brunch before guests begin making their way home."
    }
  ],
  dayTwo: {
    eyebrow: "Day Two",
    title: "A final coastal catch-up",
    description:
      "For anyone staying on, Sunday can stay informal and easy, with time for coffee, sea air, and one last proper catch-up.",
    panelEyebrow: "Sunday",
    panelTitle: "Brunch and a slow morning",
    details:
      "The final timings can stay flexible, but the shape of the weekend leaves space for one more easy gathering before everyone heads off.",
    mapLink: "https://maps.google.com/?q=Spanish+Point+County+Clare"
  },
  travel: {
    heading: "Travel & Key Locations",
    description:
      "Everything guests usually want first, from where to stay and arrive to how the weekend fits together on the coast.",
    mapUtilityEyebrow: "Map & Area",
    mapUtilityTitle: "The shape of the weekend",
    mapUtilityDescription:
      "A quick look at the places guests are most likely to need when planning where to stay and how to move around Spanish Point.",
    locationOverviewTitle: "Why this stretch of coast works so well",
    locationOverviewHtml:
      "<p>Spanish Point gives guests that lovely balance of sea views, a strong sense of place, and the feeling that the wedding can unfold over more than a few hurried hours.</p><p>It works especially well for couples who want the website to feel like part invitation, part practical guide, and part glimpse of the atmosphere guests are arriving into.</p>",
    mapSpots: [
      {
        label: "Shannon Airport",
        detail: "The most straightforward arrival point for many guests travelling in.",
        href: "https://maps.google.com/?q=Shannon+Airport"
      },
      {
        label: "Armada House",
        detail: "Ceremony, drinks, dinner, and the main celebration all in one place.",
        href: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point"
      },
      {
        label: "Spanish Point",
        detail: "A calm coastal base for guests who want to stay close to the celebration."
      },
      {
        label: "Lahinch",
        detail: "A nearby option for extra accommodation, cafes, and a busier seaside atmosphere."
      }
    ],
    transport:
      "Most guests would find a car helpful on the west coast, though staying close to the venue keeps the wedding day itself very straightforward.",
    parking:
      "Parking can be kept simple when the main wedding-day events happen in one venue location.",
    directions:
      "Spanish Point sits along the Clare coast within easy reach of Shannon Airport and other nearby guest bases such as Lahinch and Miltown Malbay.",
    mapLink: "https://maps.google.com/?q=Spanish+Point+County+Clare",
    sneakPeekImage: "/armada-concept/coast-view-1.jpg",
    relaxedNote:
      "Sea air, changeable weather, and a little extra time between stops all tend to make the weekend feel better rather than more tightly planned."
  },
  accommodationEyebrow: "Accommodation",
  accommodationTitle: "Places To Stay",
  accommodationDescription:
    "A mix of nearby options that let guests choose between staying on the coast, keeping close to the venue, or making a fuller west coast weekend of it.",
  accommodation: [
    {
      name: "Stay on site",
      note:
        "Ideal for close family, the wedding party, or guests who want everything in one polished place."
    },
    {
      name: "Spanish Point & Miltown Malbay",
      note:
        "A relaxed local base for guests who want to stay near the coast and keep the wedding day easy."
    },
    {
      name: "Lahinch",
      note:
        "A good option for anyone who would like a livelier seaside base with extra restaurants and accommodation choices."
    }
  ],
  suppliersEyebrow: "Suppliers",
  suppliersTitle: "Local Recommendations",
  suppliersDescription: "",
  suppliers: [],
  faq: [
    {
      q: "Do we need a car for the weekend?",
      a: "A car is helpful on the west coast, but guests staying close to Spanish Point can keep the wedding day itself very simple."
    },
    {
      q: "Can we make a full weekend of it?",
      a: "Absolutely. The idea suits guests who want to arrive early, stay overnight, and enjoy the coast rather than rushing straight home."
    },
    {
      q: "What should guests pack?",
      a: "Layers are always a good idea on the Atlantic coast, even when the forecast looks mild earlier in the day."
    },
    {
      q: "Could this also include RSVP and meal choices?",
      a: "Yes. In a live version, replies, dietary notes, and guest questions can all be gathered through the website."
    }
  ],
  rsvp: {
    eyebrow: "Guest Replies",
    title: "RSVP & Guest Details",
    label: "Ask about this concept",
    description:
      "In a live wedding version, this section can gather replies, meal choices, and practical guest notes cleanly in one place.",
    url: "mailto:hello@craftedweddingsites.ie?subject=Armada%20coastal%20concept",
    interactiveFormEnabled: false,
    deadlineEyebrow: "Example",
    deadline: "Replies by six to eight weeks before the wedding",
    panelDescription:
      "This concept keeps the guest journey visible without turning the page into a public-facing live RSVP."
  },
  gallery: {
    heading: "Coastal Details",
    description: "A sense of place before the weekend begins.",
    images: []
  },
  registry: {
    message: "",
    links: []
  },
  contact: {
    email: "hello@craftedweddingsites.ie",
    note:
      "If you would like a private venue-tailored concept page prepared like this, you can get in touch directly."
  },
  aiConciergeEnabled: false,
  styleOptions: {
    disableSectionOrnaments: true,
    compactSplitHero: true,
    heroImageBrightness: 1.06,
    heroImageObjectPosition: "center 58%"
  },
  sectionVisibility: {
    heroEyebrow: true,
    date: true,
    locationSummary: true,
    tagline: true,
    announcement: true,
    heroActions: true,
    previewNote: false,
    schedule: true,
    travel: true,
    ceremonyCard: true,
    receptionCard: true,
    transportCard: true,
    directionsCard: true,
    relaxedNote: true,
    accommodation: true,
    suppliers: false,
    dayTwo: true,
    story: true,
    gallery: false,
    registry: false,
    rsvp: true,
    faq: true,
    aiConcierge: false
  }
};

export default function ArmadaSpanishPointConceptPage() {
  const theme = getThemeById("summer-coast");

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-6 pt-6 lg:px-8">
        <div className="rounded-full border border-slate-200 bg-white/95 px-5 py-3 text-center text-sm text-slate-600 shadow-sm">
          Private concept page for selective sharing only. It is not linked publicly or indexed in
          search.
        </div>
      </div>
      <WeddingSitePage
        currentPath={routePath}
        siteBasePath={routePath}
        activeTheme={theme}
        weddingData={weddingData}
      />
    </>
  );
}
