import weddingData from "@/data/weddingData.json";
import type { WeddingData } from "@/types/wedding";

const defaultWeddingData = weddingData as WeddingData;

function isValidRemoteImageUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function coerceImageList(input: unknown, fallback: string[]) {
  if (!Array.isArray(input)) {
    return fallback;
  }

  const validImages = input.filter(isValidRemoteImageUrl);
  return validImages.length ? validImages : fallback;
}

export function getWeddingData(): WeddingData {
  return defaultWeddingData;
}

export function coerceWeddingData(input: unknown): WeddingData {
  const source = (input ?? {}) as Partial<WeddingData>;
  const fallback = defaultWeddingData;

  return {
    couple: source.couple ?? fallback.couple,
    date: source.date ?? fallback.date,
    theme: source.theme ?? fallback.theme,
    locationSummary: source.locationSummary ?? fallback.locationSummary,
    tagline: source.tagline ?? fallback.tagline,
    announcement: source.announcement ?? fallback.announcement,
    heroImage: isValidRemoteImageUrl(source.heroImage)
      ? source.heroImage
      : fallback.heroImage,
    story: {
      heading: source.story?.heading ?? fallback.story.heading,
      paragraphs:
        source.story?.paragraphs?.length ? source.story.paragraphs : fallback.story.paragraphs
    },
    ceremony: {
      title: source.ceremony?.title ?? fallback.ceremony.title,
      time: source.ceremony?.time ?? fallback.ceremony.time,
      location: source.ceremony?.location ?? fallback.ceremony.location,
      address: source.ceremony?.address ?? fallback.ceremony.address,
      description:
        source.ceremony?.description ?? fallback.ceremony.description
    },
    reception: {
      title: source.reception?.title ?? fallback.reception.title,
      time: source.reception?.time ?? fallback.reception.time,
      location: source.reception?.location ?? fallback.reception.location,
      address: source.reception?.address ?? fallback.reception.address,
      description:
        source.reception?.description ?? fallback.reception.description
    },
    schedule: source.schedule?.length ? source.schedule : fallback.schedule,
    travel: {
      transport: source.travel?.transport ?? fallback.travel.transport,
      parking: source.travel?.parking ?? fallback.travel.parking,
      directions: source.travel?.directions ?? fallback.travel.directions,
      mapLink: source.travel?.mapLink ?? fallback.travel.mapLink
    },
    accommodation:
      source.accommodation?.length ? source.accommodation : fallback.accommodation,
    faq: source.faq?.length ? source.faq : fallback.faq,
    rsvp: {
      label: source.rsvp?.label ?? fallback.rsvp.label,
      description: source.rsvp?.description ?? fallback.rsvp.description,
      url: source.rsvp?.url ?? fallback.rsvp.url,
      deadline: source.rsvp?.deadline ?? fallback.rsvp.deadline,
      form: {
        title:
          source.rsvp?.form?.title ??
          "Let Us Know If You Can Make It",
        intro:
          source.rsvp?.form?.intro ??
          "Share your reply here, including any dietary requirements or extra notes the couple should know.",
        attendingLabel:
          source.rsvp?.form?.attendingLabel ?? "Yes, I'll be there",
        declinedLabel:
          source.rsvp?.form?.declinedLabel ?? "Sorry, I can't make it",
        submitLabel:
          source.rsvp?.form?.submitLabel ?? "Send RSVP",
        enableGuestCount:
          source.rsvp?.form?.enableGuestCount ?? true,
        enableMealChoice:
          source.rsvp?.form?.enableMealChoice ?? true,
        enableDietaryNotes:
          source.rsvp?.form?.enableDietaryNotes ?? true,
        enableSongRequest:
          source.rsvp?.form?.enableSongRequest ?? true,
        enableMessageToCouple:
          source.rsvp?.form?.enableMessageToCouple ?? true
      }
    },
    gallery: {
      heading: source.gallery?.heading ?? fallback.gallery.heading,
      description: source.gallery?.description ?? fallback.gallery.description,
      images: coerceImageList(source.gallery?.images, fallback.gallery.images)
    },
    registry: {
      message: source.registry?.message ?? fallback.registry.message,
      links:
        source.registry?.links && Array.isArray(source.registry.links)
          ? source.registry.links
          : fallback.registry.links
    },
    contact: {
      email: source.contact?.email ?? fallback.contact.email,
      note: source.contact?.note ?? fallback.contact.note
    },
    aiConciergeEnabled:
      source.aiConciergeEnabled ?? fallback.aiConciergeEnabled,
    sectionVisibility: {
      schedule: source.sectionVisibility?.schedule ?? true,
      travel: source.sectionVisibility?.travel ?? true,
      accommodation: source.sectionVisibility?.accommodation ?? true,
      story: source.sectionVisibility?.story ?? true,
      gallery: source.sectionVisibility?.gallery ?? true,
      registry: source.sectionVisibility?.registry ?? true,
      rsvp: source.sectionVisibility?.rsvp ?? true,
      faq: source.sectionVisibility?.faq ?? true,
      aiConcierge: source.sectionVisibility?.aiConcierge ?? true
    }
  };
}
