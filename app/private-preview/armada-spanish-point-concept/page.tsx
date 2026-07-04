import type { Metadata } from "next";
import { WeddingSitePage } from "@/components/wedding-site-page";
import { getThemeById } from "@/lib/themes";
import type { WeddingData } from "@/types/wedding";

export const metadata: Metadata = {
  title: "Spanish Point Wedding Weekend",
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
    eyebrow: "Wedding Weekend",
    previewNote:
      "This is a private concept page prepared for selective sharing and venue outreach only.",
    primaryActionLabel: "View the weekend",
    primaryActionHref: "#schedule",
    secondaryActionLabel: "Stay nearby",
    secondaryActionHref: "#accommodation"
  },
  locationSummary: "Spanish Point, Co. Clare",
  tagline:
    "A west coast wedding weekend shaped around sea views, warm hospitality, and a setting guests will still be talking about after the last dance.",
  announcement:
    "Set above the Atlantic in Spanish Point, Armada brings together the drama of the Clare coastline with the kind of comfort and atmosphere that makes a full wedding weekend feel effortless.",
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
    location: "Armada Hotel",
    address: "Spanish Point, Co. Clare",
    mapLink: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point",
    description:
      "Guests are invited to arrive in good time so the afternoon can begin slowly and without any rush."
  },
  reception: {
    title: "Reception",
    time: "5:00 PM",
    location: "Armada Hotel",
    address: "Spanish Point, Co. Clare",
    mapLink: "https://maps.google.com/?q=Armada+Hotel+Spanish+Point",
    description:
      "Drinks, dinner, and the evening celebration all continue in one place overlooking the Atlantic, with Armada's beautiful food and setting carrying the whole evening effortlessly."
  },
  scheduleEyebrow: "Wedding Weekend",
  scheduleHeading: "A Celebration Across The Coast",
  scheduleDescription:
    "A clear outline of the wedding day and the relaxed moments around it, so guests can enjoy the weekend without over-planning every hour.",
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
      title: "Guests arrive at Armada Hotel",
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
      "Everything guests usually want first, from where to stay and arrive to how the weekend fits together along this beautiful stretch of coast.",
    mapUtilityEyebrow: "Map & Area",
    mapUtilityTitle: "The shape of the weekend",
    mapUtilityDescription:
      "A quick look at the places guests are most likely to need when planning where to stay and how to move around Spanish Point.",
    locationOverviewTitle: "Why this stretch of coast works so well",
    locationOverviewHtml:
      "<p>Spanish Point gives guests that lovely balance of dramatic sea views, a real sense of occasion, and the feeling that the wedding can unfold over more than a few hurried hours.</p><p>Armada suits that especially well, with its Atlantic setting, beautifully designed hotel spaces, memorable food, and the kind of atmosphere that encourages guests to settle in and make a proper weekend of it.</p>",
    mapSpots: [
      {
        label: "Shannon Airport",
        detail: "The most straightforward arrival point for many guests travelling in.",
        href: "https://maps.google.com/?q=Shannon+Airport"
      },
      {
        label: "Armada Hotel",
        detail: "Ceremony, drinks, dinner, and the main celebration all in one beautiful coastal setting.",
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
    "A mix of nearby options that let guests choose between staying right at Armada, keeping close to the celebrations, or making a fuller west coast weekend of it.",
  accommodation: [
    {
      name: "The Armada Hotel",
      note:
        "The most seamless option for guests who want the full Armada experience, with beautiful rooms, standout food, ocean views, and the celebrations all in one place.",
      link: "https://www.armadahotel.com/",
      linkLabel: "View Armada Hotel"
    },
    {
      name: "Bellbridge House Hotel",
      note:
        "A nearby Spanish Point option for guests who want to stay close to the coast and within easy reach of the wedding weekend.",
      link: "https://www.bellbridgehousehotelclare.com/",
      linkLabel: "View Bellbridge House Hotel"
    },
    {
      name: "Lahinch Coast Hotel",
      note:
        "A good option for anyone who would like a livelier seaside base with extra restaurants, surf-town energy, and a slightly broader range of plans around the weekend.",
      link: "https://www.lahinchcoasthotel.ie/",
      linkLabel: "View Lahinch Coast Hotel"
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
      a: "Yes. Replies, dietary notes, and guest questions can all be gathered through the website in one place."
    }
  ],
  rsvp: {
    eyebrow: "Guest Replies",
    title: "RSVP & Guest Details",
    label: "RSVP example",
    description:
      "This section can gather replies, meal choices, and practical guest notes cleanly in one place.",
    url: "mailto:hello@craftedweddingsites.ie?subject=Armada%20coastal%20concept",
    interactiveFormEnabled: false,
    deadlineEyebrow: "Typical timeline",
    deadline: "Replies by six to eight weeks before the wedding",
    panelDescription:
      "In a live wedding version, guests would reply here while keeping everything calm, clear, and easy to manage."
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
      "For couples, this kind of page keeps the guest experience polished from the first look through to RSVPs, timings, and travel details."
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
  const baseTheme = getThemeById("summer-coast");
  const theme = {
    ...baseTheme,
    style: {
      ...baseTheme.style,
      "--font-body": "var(--font-montserrat), Arial, sans-serif"
    }
  };

  return (
    <div className="armada-concept-page">
      <WeddingSitePage
        currentPath={routePath}
        siteBasePath={routePath}
        activeTheme={theme}
        weddingData={weddingData}
      />
    </div>
  );
}
