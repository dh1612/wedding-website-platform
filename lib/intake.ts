import OpenAI from "openai";
import type { WeddingData } from "@/types/wedding";
import { coerceWeddingData, getWeddingData } from "@/lib/wedding-data";

export type IntakePackage = "basic" | "smart" | "premium";

export type IntakeSubmission = {
  packageTier: IntakePackage;
  couple: string;
  email: string;
  date: string;
  locationSummary: string;
  themePreference?: string;
  ceremonyTime?: string;
  ceremonyLocation?: string;
  ceremonyAddress?: string;
  receptionTime?: string;
  receptionLocation?: string;
  receptionAddress?: string;
  scheduleText?: string;
  accommodationText?: string;
  travelText?: string;
  faqText?: string;
  storyText?: string;
  imageUrls?: string[];
};

export const intakePackages: Array<{
  id: IntakePackage;
  name: string;
  price: string;
  summary: string;
}> = [
  {
    id: "basic",
    name: "Basic",
    price: "EUR245",
    summary: "A beautiful wedding website built from your information."
  },
  {
    id: "smart",
    name: "Smart",
    price: "EUR395",
    summary: "Website plus AI-assisted content polishing and optional concierge."
  },
  {
    id: "premium",
    name: "Premium",
    price: "EUR645",
    summary: "Website plus premium planning features and a fuller portal setup."
  }
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildCoupleSlugBase(couple: string) {
  const parts = couple
    .split(/\s+(?:and|&)\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  const firstNames = parts
    .map((part) => part.split(/\s+/)[0])
    .filter(Boolean)
    .slice(0, 2)
    .map(slugify)
    .filter(Boolean);

  if (firstNames.length === 2) {
    return `${firstNames[0]}-and-${firstNames[1]}`;
  }

  if (firstNames.length === 1) {
    return firstNames[0];
  }

  return slugify(couple);
}

function formatSentence(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function parseLineList(value?: string) {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseScheduleLines(value?: string) {
  return parseLineList(value).map((line, index) => {
    const [timePart, ...rest] = line.split("-");
    const details = rest.join("-").trim();
    return {
      time: timePart?.trim() || `Stop ${index + 1}`,
      title: details || `Wedding moment ${index + 1}`,
      details: details || line
    };
  });
}

function parseAccommodationLines(value?: string) {
  return parseLineList(value).map((line) => ({
    name: line,
    note: "Recommended for guests travelling to the wedding."
  }));
}

function parseFaqLines(value?: string) {
  return parseLineList(value).map((line) => {
    const [question, ...rest] = line.split("?");
    const answer = rest.join("?").replace(/^[-:\s]+/, "").trim();

    if (answer) {
      return {
        q: `${question.trim()}?`,
        a: answer
      };
    }

    return {
      q: line,
      a: "Further details will be shared with guests soon."
    };
  });
}

function filterImageUrls(values?: string[]) {
  return (values ?? []).filter((value) => {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  });
}

function chooseTheme(submission: IntakeSubmission) {
  const location = `${submission.locationSummary} ${submission.ceremonyLocation} ${submission.receptionLocation}`.toLowerCase();
  if (location.includes("greece") || location.includes("santorini") || location.includes("mykonos")) {
    return "aegean-romance";
  }

  return submission.themePreference || getWeddingData().theme;
}

async function maybePolishText(submission: IntakeSubmission) {
  const shouldUseAi =
    submission.packageTier !== "basic" && process.env.OPENAI_API_KEY;

  const rawStory = submission.storyText?.trim() || "";
  const rawTravel = submission.travelText?.trim() || "";
  const rawFaq = submission.faqText?.trim() || "";

  if (!shouldUseAi) {
    return {
      storyParagraphs: rawStory
        ? rawStory.split(/\n+/).map((part) => formatSentence(part))
        : [],
      announcement: rawTravel
        ? formatSentence(rawTravel)
        : "",
      faq: parseFaqLines(rawFaq)
    };
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "You rewrite raw wedding intake notes into polished, concise website copy. Return valid JSON only with keys storyParagraphs, announcement, and faq. Keep facts intact and do not invent missing details."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({
                story: rawStory,
                travel: rawTravel,
                faq: rawFaq
              })
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "wedding_intake_polish",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              storyParagraphs: {
                type: "array",
                items: { type: "string" }
              },
              announcement: { type: "string" },
              faq: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    q: { type: "string" },
                    a: { type: "string" }
                  },
                  required: ["q", "a"]
                }
              }
            },
            required: ["storyParagraphs", "announcement", "faq"]
          }
        }
      }
    });

    const parsed = JSON.parse(response.output_text || "{}") as {
      storyParagraphs?: string[];
      announcement?: string;
      faq?: Array<{ q: string; a: string }>;
    };

    return {
      storyParagraphs:
        parsed.storyParagraphs?.length
          ? parsed.storyParagraphs
          : [],
      announcement: parsed.announcement || "",
      faq: parsed.faq?.length ? parsed.faq : parseFaqLines(rawFaq)
    };
  } catch {
    return {
      storyParagraphs: rawStory
        ? rawStory.split(/\n+/).map((part) => formatSentence(part))
        : [],
      announcement: rawTravel
        ? formatSentence(rawTravel)
        : "",
      faq: parseFaqLines(rawFaq)
    };
  }
}

export async function buildWeddingDataFromIntake(
  submission: IntakeSubmission
): Promise<WeddingData> {
  const defaults = getWeddingData();
  const polished = await maybePolishText(submission);
  const schedule = parseScheduleLines(submission.scheduleText);
  const accommodation = parseAccommodationLines(submission.accommodationText);
  const imageUrls = filterImageUrls(submission.imageUrls);
  const hasCeremonyDetails = Boolean(
    submission.ceremonyTime?.trim() ||
      submission.ceremonyLocation?.trim() ||
      submission.ceremonyAddress?.trim()
  );
  const hasReceptionDetails = Boolean(
    submission.receptionTime?.trim() ||
      submission.receptionLocation?.trim() ||
      submission.receptionAddress?.trim()
  );
  const hasTravelContent = Boolean(
    submission.travelText?.trim() || hasCeremonyDetails || hasReceptionDetails
  );
  const hasStory = polished.storyParagraphs.length > 0;
  const hasGallery = imageUrls.length > 0;
  const hasSchedule = schedule.length > 0;
  const hasAccommodation = accommodation.length > 0;
  const hasFaq = polished.faq.length > 0;

  const storyParagraphs = hasStory
    ? polished.storyParagraphs
    : ["Your story can be added here before the site goes live."];
  const scheduleItems = hasSchedule
    ? schedule
    : [
        {
          time: "Add timing",
          title: "Add a weekend event here",
          details:
            "The weekend timeline can be added here once the couple confirms the details."
        }
      ];
  const accommodationItems = hasAccommodation
    ? accommodation
    : [
        {
          name: "Add accommodation option",
          note:
            "Recommended hotels or nearby stays can be added here before the site goes live."
        }
      ];
  const faqItems = hasFaq
    ? polished.faq
    : [
        {
          q: "Add a guest question here",
          a: "Answers about travel, timings, dress code, or local details can be added here before the site goes live."
        }
      ];
  const travelDescription = submission.travelText?.trim()
    ? formatSentence(submission.travelText)
    : "Venue details, directions, transport notes, and local guidance can be added here before the site goes live.";
  const ceremonyDescription = hasCeremonyDetails
    ? ""
    : "Ceremony details can be added here before the site goes live.";
  const receptionDescription = hasReceptionDetails
    ? ""
    : "Reception details can be added here before the site goes live.";
  const transportDescription = submission.travelText?.trim()
    ? submission.travelText.trim()
    : "Travel notes or transport arrangements can be added here before the site goes live.";

  return coerceWeddingData({
    couple: submission.couple,
    date: submission.date,
    theme: chooseTheme(submission),
    locationSummary: submission.locationSummary,
    tagline: "",
    announcement:
      polished.announcement || "A short welcome message for guests can be added here before the site goes live.",
    heroImage: imageUrls[0] || defaults.heroImage,
    story: {
      heading: "Our Story",
      paragraphs: storyParagraphs
    },
    ceremony: {
      title: "Ceremony",
      time: submission.ceremonyTime || "",
      location: submission.ceremonyLocation || "",
      address: submission.ceremonyAddress || "",
      description: ceremonyDescription
    },
    reception: {
      title: "Reception",
      time: submission.receptionTime || "",
      location: submission.receptionLocation || "",
      address: submission.receptionAddress || "",
      description: receptionDescription
    },
    schedule: scheduleItems,
    accommodation: accommodationItems,
    travel: {
      heading: "Venue & Travel",
      description: travelDescription,
      transport: transportDescription,
      parking: "",
      directions: "",
      mapLink: "",
      mapSpots: [],
      relaxedNote: ""
    },
    faq: faqItems,
    contact: {
      email: submission.email,
      note: "If you need anything before the wedding, please get in touch."
    },
    aiConciergeEnabled: submission.packageTier !== "basic",
    gallery: {
      heading: defaults.gallery.heading,
      description: defaults.gallery.description,
      images: imageUrls
    },
    rsvp: {
      label: "Contact Us",
      description:
        "Please get in touch with any questions, updates, or changes before the wedding.",
      url: `mailto:${submission.email}`,
      deadline: "As soon as possible"
    },
    registry: {
      message: "",
      links: []
    },
    sectionVisibility: {
      heroEyebrow: true,
      date: true,
      locationSummary: Boolean(submission.locationSummary?.trim()),
      tagline: false,
      announcement: Boolean(polished.announcement),
      heroActions: true,
      previewNote: true,
      schedule: true,
      travel: true,
      ceremonyCard: true,
      receptionCard: true,
      transportCard: true,
      directionsCard: false,
      accommodation: true,
      story: true,
      gallery: hasGallery,
      registry: false,
      rsvp: true,
      faq: true,
      aiConcierge: submission.packageTier !== "basic"
    }
  });
}

export function buildWeddingSlug(couple: string, date: string) {
  const yearPart = date ? date.slice(0, 4) : "";
  const base = buildCoupleSlugBase(couple);
  return `${base}${yearPart ? `-${slugify(yearPart)}` : ""}-${Math.random()
    .toString(36)
    .slice(2, 5)}`;
}
