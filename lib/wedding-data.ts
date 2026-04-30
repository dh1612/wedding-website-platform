import weddingData from "@/data/weddingData.json";
import type { MapSpot, RSVPFormQuestion, WeddingData } from "@/types/wedding";

const defaultWeddingData = weddingData as unknown as WeddingData;

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

function coerceCustomQuestions(input: unknown): RSVPFormQuestion[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const mapped = input.map<RSVPFormQuestion | null>((item, index) => {
      const source = item as Partial<RSVPFormQuestion>;
      const label = typeof source.label === "string" ? source.label.trim() : "";
      if (!label) return null;

      const type =
        source.type === "long" || source.type === "yesno" || source.type === "short"
          ? source.type
          : "short";

      return {
        id:
          typeof source.id === "string" && source.id.trim()
            ? source.id
            : `custom-question-${index + 1}`,
        label,
        type,
        required: Boolean(source.required),
        placeholder:
          typeof source.placeholder === "string" && source.placeholder.trim()
            ? source.placeholder.trim()
            : undefined
      };
    });

  return mapped.filter((item): item is RSVPFormQuestion => item !== null);
}

function coerceMapSpots(input: unknown, fallback: MapSpot[]) {
  if (!Array.isArray(input)) {
    return fallback;
  }

  const mapped = input
    .map<MapSpot | null>((item) => {
      const source = item as Partial<MapSpot>;
      const label = typeof source.label === "string" ? source.label.trim() : "";
      const detail = typeof source.detail === "string" ? source.detail.trim() : "";

      if (!label || !detail) {
        return null;
      }

      return {
        label,
        detail,
        href:
          typeof source.href === "string" && source.href.trim()
            ? source.href.trim()
            : undefined
      };
    })
    .filter((item): item is MapSpot => item !== null);

  return mapped.length ? mapped : fallback;
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
    locationSummaryHtml:
      typeof source.locationSummaryHtml === "string" && source.locationSummaryHtml.trim()
        ? source.locationSummaryHtml
        : undefined,
    tagline: source.tagline ?? fallback.tagline,
    taglineHtml:
      typeof source.taglineHtml === "string" && source.taglineHtml.trim()
        ? source.taglineHtml
        : undefined,
    announcement: source.announcement ?? fallback.announcement,
    announcementHtml:
      typeof source.announcementHtml === "string" && source.announcementHtml.trim()
        ? source.announcementHtml
        : undefined,
    heroImage: isValidRemoteImageUrl(source.heroImage)
      ? source.heroImage
      : fallback.heroImage,
    story: {
      heading: source.story?.heading ?? fallback.story.heading,
      headingHtml:
        typeof source.story?.headingHtml === "string" && source.story.headingHtml.trim()
          ? source.story.headingHtml
          : undefined,
      html:
        typeof source.story?.html === "string" && source.story.html.trim()
          ? source.story.html
          : undefined,
      paragraphs:
        source.story?.paragraphs?.length ? source.story.paragraphs : fallback.story.paragraphs
    },
    ceremony: {
      title: source.ceremony?.title ?? fallback.ceremony.title,
      time: source.ceremony?.time ?? fallback.ceremony.time,
      location: source.ceremony?.location ?? fallback.ceremony.location,
      address: source.ceremony?.address ?? fallback.ceremony.address,
      mapLink:
        typeof source.ceremony?.mapLink === "string" && source.ceremony.mapLink.trim()
          ? source.ceremony.mapLink
          : fallback.ceremony.mapLink,
      description:
        source.ceremony?.description ?? fallback.ceremony.description,
      descriptionHtml:
        typeof source.ceremony?.descriptionHtml === "string" && source.ceremony.descriptionHtml.trim()
          ? source.ceremony.descriptionHtml
          : undefined
    },
    reception: {
      title: source.reception?.title ?? fallback.reception.title,
      time: source.reception?.time ?? fallback.reception.time,
      location: source.reception?.location ?? fallback.reception.location,
      address: source.reception?.address ?? fallback.reception.address,
      mapLink:
        typeof source.reception?.mapLink === "string" && source.reception.mapLink.trim()
          ? source.reception.mapLink
          : fallback.reception.mapLink,
      description:
        source.reception?.description ?? fallback.reception.description,
      descriptionHtml:
        typeof source.reception?.descriptionHtml === "string" && source.reception.descriptionHtml.trim()
          ? source.reception.descriptionHtml
          : undefined
    },
    schedule: source.schedule?.length ? source.schedule : fallback.schedule,
    travel: {
      heading: source.travel?.heading ?? "Where To Go",
      headingHtml:
        typeof source.travel?.headingHtml === "string" && source.travel.headingHtml.trim()
          ? source.travel.headingHtml
          : undefined,
      description:
        source.travel?.description ??
        "Key locations and practical notes for the ceremony and celebrations.",
      descriptionHtml:
        typeof source.travel?.descriptionHtml === "string" && source.travel.descriptionHtml.trim()
          ? source.travel.descriptionHtml
          : undefined,
      locationOverviewTitle: source.travel?.locationOverviewTitle ?? "",
      locationOverviewTitleHtml:
        typeof source.travel?.locationOverviewTitleHtml === "string" && source.travel.locationOverviewTitleHtml.trim()
          ? source.travel.locationOverviewTitleHtml
          : undefined,
      locationOverviewHtml:
        typeof source.travel?.locationOverviewHtml === "string" && source.travel.locationOverviewHtml.trim()
          ? source.travel.locationOverviewHtml
          : undefined,
      sneakPeekImage:
        typeof source.travel?.sneakPeekImage === "string" && isValidRemoteImageUrl(source.travel.sneakPeekImage)
          ? source.travel.sneakPeekImage
          : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
      relaxedNote:
        typeof source.travel?.relaxedNote === "string" && source.travel.relaxedNote.trim()
          ? source.travel.relaxedNote
          : fallback.travel.relaxedNote,
      mapSpots: coerceMapSpots(source.travel?.mapSpots, fallback.travel.mapSpots ?? []),
      transport: source.travel?.transport ?? fallback.travel.transport,
      transportHtml:
        typeof source.travel?.transportHtml === "string" && source.travel.transportHtml.trim()
          ? source.travel.transportHtml
          : undefined,
      parking: source.travel?.parking ?? fallback.travel.parking,
      parkingHtml:
        typeof source.travel?.parkingHtml === "string" && source.travel.parkingHtml.trim()
          ? source.travel.parkingHtml
          : undefined,
      directions: source.travel?.directions ?? fallback.travel.directions,
      directionsHtml:
        typeof source.travel?.directionsHtml === "string" && source.travel.directionsHtml.trim()
          ? source.travel.directionsHtml
          : undefined,
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
        introHtml:
          typeof source.rsvp?.form?.introHtml === "string" && source.rsvp.form.introHtml.trim()
            ? source.rsvp.form.introHtml
            : undefined,
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
          source.rsvp?.form?.enableMessageToCouple ?? true,
        customQuestions: coerceCustomQuestions(source.rsvp?.form?.customQuestions)
      }
    },
    gallery: {
      heading: source.gallery?.heading ?? fallback.gallery.heading,
      headingHtml:
        typeof source.gallery?.headingHtml === "string" && source.gallery.headingHtml.trim()
          ? source.gallery.headingHtml
          : undefined,
      description: source.gallery?.description ?? fallback.gallery.description,
      descriptionHtml:
        typeof source.gallery?.descriptionHtml === "string" && source.gallery.descriptionHtml.trim()
          ? source.gallery.descriptionHtml
          : undefined,
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
      locationSummary: source.sectionVisibility?.locationSummary ?? true,
      tagline: source.sectionVisibility?.tagline ?? true,
      announcement: source.sectionVisibility?.announcement ?? true,
      schedule: source.sectionVisibility?.schedule ?? true,
      travel: source.sectionVisibility?.travel ?? true,
      ceremonyCard: source.sectionVisibility?.ceremonyCard ?? true,
      receptionCard: source.sectionVisibility?.receptionCard ?? true,
      transportCard: source.sectionVisibility?.transportCard ?? true,
      directionsCard: source.sectionVisibility?.directionsCard ?? true,
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
