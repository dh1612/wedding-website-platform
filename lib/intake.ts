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
        : getWeddingData().story.paragraphs,
      announcement: rawTravel
        ? formatSentence(rawTravel)
        : getWeddingData().announcement,
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
          : getWeddingData().story.paragraphs,
      announcement: parsed.announcement || getWeddingData().announcement,
      faq: parsed.faq?.length ? parsed.faq : parseFaqLines(rawFaq)
    };
  } catch {
    return {
      storyParagraphs: rawStory
        ? rawStory.split(/\n+/).map((part) => formatSentence(part))
        : getWeddingData().story.paragraphs,
      announcement: rawTravel
        ? formatSentence(rawTravel)
        : getWeddingData().announcement,
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

  return coerceWeddingData({
    couple: submission.couple,
    date: submission.date,
    theme: chooseTheme(submission),
    locationSummary: submission.locationSummary,
    tagline: `We cannot wait to celebrate with everyone we love.`,
    announcement:
      polished.announcement ||
      "Everything you need for the wedding day is gathered here.",
    heroImage: imageUrls[0] || defaults.heroImage,
    story: {
      heading: "Our Story",
      paragraphs: polished.storyParagraphs
    },
    ceremony: {
      title: "Ceremony",
      time: submission.ceremonyTime || defaults.ceremony.time,
      location: submission.ceremonyLocation || defaults.ceremony.location,
      address: submission.ceremonyAddress || defaults.ceremony.address,
      description: "We look forward to welcoming guests before the ceremony begins."
    },
    reception: {
      title: "Reception",
      time: submission.receptionTime || defaults.reception.time,
      location: submission.receptionLocation || defaults.reception.location,
      address: submission.receptionAddress || defaults.reception.address,
      description: "Join us afterwards for food, drinks, and celebrations."
    },
    schedule: schedule.length ? schedule : defaults.schedule,
    accommodation: accommodation.length ? accommodation : defaults.accommodation,
    travel: {
      transport:
        submission.travelText?.trim() ||
        defaults.travel.transport,
      parking: defaults.travel.parking,
      directions: defaults.travel.directions,
      mapLink: defaults.travel.mapLink
    },
    faq: polished.faq.length ? polished.faq : defaults.faq,
    contact: {
      email: submission.email,
      note: "If you need anything before the wedding, please get in touch."
    },
    aiConciergeEnabled: submission.packageTier !== "basic",
    gallery: {
      heading: defaults.gallery.heading,
      description: defaults.gallery.description,
      images: imageUrls.length ? imageUrls : defaults.gallery.images
    },
    rsvp: {
      label: "Contact Us",
      description:
        "Please get in touch with any questions, updates, or changes before the wedding.",
      url: `mailto:${submission.email}`,
      deadline: "As soon as possible"
    },
    registry: defaults.registry
  });
}

export function buildWeddingSlug(couple: string, date: string) {
  const yearPart = date ? date.slice(0, 4) : "";
  const base = buildCoupleSlugBase(couple);
  return `${base}${yearPart ? `-${slugify(yearPart)}` : ""}-${Math.random()
    .toString(36)
    .slice(2, 5)}`;
}
