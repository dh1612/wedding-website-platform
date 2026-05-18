import weddingData from "@/data/weddingData.json";
import type { MapSpot, RSVPFormQuestion, RSVPMealOption, WeddingData } from "@/types/wedding";

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
        source.type === "long" ||
        source.type === "yesno" ||
        source.type === "short" ||
        source.type === "select" ||
        source.type === "multiselect"
          ? source.type
          : "short";

      const options =
        Array.isArray(source.options) && (type === "select" || type === "multiselect")
          ? source.options
              .map((item) => (typeof item === "string" ? item.trim() : ""))
              .filter(Boolean)
          : undefined;

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
            : undefined,
        options: options?.length ? options : undefined
      };
    });

  return mapped.filter((item): item is RSVPFormQuestion => item !== null);
}

const defaultMealOptions: RSVPMealOption[] = [
  { value: "beef", label: "Beef", enabled: true },
  { value: "fish", label: "Fish", enabled: true },
  { value: "vegetarian", label: "Vegetarian", enabled: true },
  { value: "vegan", label: "Vegan", enabled: true },
  { value: "kids", label: "Kids meal", enabled: true },
  { value: "custom", label: "Custom / let us know below", enabled: true }
];

function coerceMealOptions(input: unknown): RSVPMealOption[] {
  if (!Array.isArray(input)) {
    return defaultMealOptions;
  }

  const allowedValues = new Set(defaultMealOptions.map((option) => option.value));
  const mapped = input
    .map<RSVPMealOption | null>((item) => {
      const source = item as Partial<RSVPMealOption>;
      const value = typeof source.value === "string" ? source.value.trim() : "";
      const label = typeof source.label === "string" ? source.label.trim() : "";

      if (!allowedValues.has(value as RSVPMealOption["value"])) {
        return null;
      }

      return {
        value: value as RSVPMealOption["value"],
        label: label || defaultMealOptions.find((option) => option.value === value)?.label || value,
        enabled: source.enabled ?? true
      };
    })
    .filter((item): item is RSVPMealOption => item !== null);

  if (!mapped.length) {
    return defaultMealOptions;
  }

  return defaultMealOptions.map((fallbackOption) => {
    const match = mapped.find((item) => item.value === fallbackOption.value);
    return match ?? fallbackOption;
  });
}

function coerceStringOptions(input: unknown): string[] | undefined {
  if (!Array.isArray(input)) {
    return undefined;
  }

  const options = input
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  return options.length ? options : undefined;
}

function coerceMapSpots(input: unknown, fallback: MapSpot[]) {
  if (!Array.isArray(input)) {
    return fallback;
  }

  if (input.length === 0) {
    return [];
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
    hero: {
      eyebrow: source.hero?.eyebrow ?? "Wedding Day",
      previewNote:
        source.hero?.previewNote ??
        "Sample wording is shown here for review. The couple can change all text before the site goes live.",
      primaryActionLabel: source.hero?.primaryActionLabel ?? "RSVP Details",
      primaryActionHref: source.hero?.primaryActionHref ?? "#rsvp",
      secondaryActionLabel: source.hero?.secondaryActionLabel ?? "Wedding Details",
      secondaryActionHref: source.hero?.secondaryActionHref ?? "#faq"
    },
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
      featureImage:
        typeof source.story?.featureImage === "string" && isValidRemoteImageUrl(source.story.featureImage)
          ? source.story.featureImage
          : undefined,
      paragraphs:
        Array.isArray(source.story?.paragraphs) ? source.story.paragraphs : fallback.story.paragraphs
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
    scheduleEyebrow:
      typeof source.scheduleEyebrow === "string"
        ? source.scheduleEyebrow.trim()
        : "Weekend Timeline",
    scheduleHeading:
      typeof source.scheduleHeading === "string"
        ? source.scheduleHeading.trim()
        : "What’s Happening And When",
    scheduleHeadingHtml:
      typeof source.scheduleHeadingHtml === "string" && source.scheduleHeadingHtml.trim()
        ? source.scheduleHeadingHtml
        : undefined,
    scheduleDescription:
      typeof source.scheduleDescription === "string"
        ? source.scheduleDescription.trim()
        : "A clear outline of the celebration so guests can settle in, enjoy the weekend, and know where they need to be.",
    scheduleDescriptionHtml:
      typeof source.scheduleDescriptionHtml === "string" && source.scheduleDescriptionHtml.trim()
        ? source.scheduleDescriptionHtml
        : undefined,
    scheduleNote:
      typeof source.scheduleNote === "string"
        ? source.scheduleNote.trim()
        : "A gentle flow is part of the destination-wedding charm, so use this as your guide and leave a little room for island time.",
    scheduleNoteHtml:
      typeof source.scheduleNoteHtml === "string" && source.scheduleNoteHtml.trim()
        ? source.scheduleNoteHtml
        : undefined,
    scheduleStepLabel:
      typeof source.scheduleStepLabel === "string" && source.scheduleStepLabel.trim()
        ? source.scheduleStepLabel.trim()
        : "Moment",
    schedule: Array.isArray(source.schedule) ? source.schedule : fallback.schedule,
    dayTwo: {
      eyebrow:
        typeof source.dayTwo?.eyebrow === "string"
          ? source.dayTwo.eyebrow.trim()
          : "Day Two",
      title:
        typeof source.dayTwo?.title === "string"
          ? source.dayTwo.title.trim()
          : "Keep The Celebrations Going",
      titleHtml:
        typeof source.dayTwo?.titleHtml === "string" && source.dayTwo.titleHtml.trim()
          ? source.dayTwo.titleHtml
          : undefined,
      description:
        typeof source.dayTwo?.description === "string"
          ? source.dayTwo.description.trim()
          : "If you are extending the weekend, use this space for the second-day plan so guests know what is happening next.",
      descriptionHtml:
        typeof source.dayTwo?.descriptionHtml === "string" &&
        source.dayTwo.descriptionHtml.trim()
          ? source.dayTwo.descriptionHtml
          : undefined,
      panelEyebrow:
        typeof source.dayTwo?.panelEyebrow === "string"
          ? source.dayTwo.panelEyebrow.trim()
          : "Day Two Details",
      panelTitle:
        typeof source.dayTwo?.panelTitle === "string"
          ? source.dayTwo.panelTitle.trim()
          : "Join us for one more celebration",
      panelTitleHtml:
        typeof source.dayTwo?.panelTitleHtml === "string" &&
        source.dayTwo.panelTitleHtml.trim()
          ? source.dayTwo.panelTitleHtml
          : undefined,
      details:
        typeof source.dayTwo?.details === "string"
          ? source.dayTwo.details.trim()
          : "Add the timing, location, and any dress code or transport notes here.",
      detailsHtml:
        typeof source.dayTwo?.detailsHtml === "string" &&
        source.dayTwo.detailsHtml.trim()
          ? source.dayTwo.detailsHtml
          : undefined
    },
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
      mapUtilityEyebrow:
        typeof source.travel?.mapUtilityEyebrow === "string" && source.travel.mapUtilityEyebrow.trim()
          ? source.travel.mapUtilityEyebrow
          : "Map & Area",
      mapUtilityTitle:
        typeof source.travel?.mapUtilityTitle === "string" && source.travel.mapUtilityTitle.trim()
          ? source.travel.mapUtilityTitle
          : "Useful locations at a glance",
      mapUtilityTitleHtml:
        typeof source.travel?.mapUtilityTitleHtml === "string" && source.travel.mapUtilityTitleHtml.trim()
          ? source.travel.mapUtilityTitleHtml
          : undefined,
      mapUtilityDescription:
        typeof source.travel?.mapUtilityDescription === "string" && source.travel.mapUtilityDescription.trim()
          ? source.travel.mapUtilityDescription
          : "A quick guide to the places guests are most likely to need before and during the wedding weekend.",
      mapUtilityDescriptionHtml:
        typeof source.travel?.mapUtilityDescriptionHtml === "string" && source.travel.mapUtilityDescriptionHtml.trim()
          ? source.travel.mapUtilityDescriptionHtml
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
        typeof source.travel?.relaxedNote === "string"
          ? source.travel.relaxedNote.trim()
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
    accommodationEyebrow:
      typeof source.accommodationEyebrow === "string"
        ? source.accommodationEyebrow.trim()
        : "Accommodation",
    accommodationTitle:
      typeof source.accommodationTitle === "string"
        ? source.accommodationTitle.trim()
        : "Places To Stay",
    accommodationTitleHtml:
      typeof source.accommodationTitleHtml === "string" && source.accommodationTitleHtml.trim()
        ? source.accommodationTitleHtml
        : undefined,
    accommodationDescription:
      typeof source.accommodationDescription === "string"
        ? source.accommodationDescription.trim()
        : "A couple of nearby options for guests travelling in for the celebration.",
    accommodationDescriptionHtml:
      typeof source.accommodationDescriptionHtml === "string" &&
      source.accommodationDescriptionHtml.trim()
        ? source.accommodationDescriptionHtml
        : undefined,
    accommodation:
      Array.isArray(source.accommodation) ? source.accommodation : fallback.accommodation,
    faq: Array.isArray(source.faq) ? source.faq : fallback.faq,
    rsvp: {
      eyebrow:
        typeof source.rsvp?.eyebrow === "string"
          ? source.rsvp.eyebrow.trim()
          : "RSVP",
      title:
        typeof source.rsvp?.title === "string"
          ? source.rsvp.title.trim()
          : "Let Us Know If You Can Make It",
      titleHtml:
        typeof source.rsvp?.titleHtml === "string" && source.rsvp.titleHtml.trim()
          ? source.rsvp.titleHtml
          : undefined,
      label: source.rsvp?.label ?? fallback.rsvp.label,
      description: source.rsvp?.description ?? fallback.rsvp.description,
      descriptionHtml:
        typeof source.rsvp?.descriptionHtml === "string" && source.rsvp.descriptionHtml.trim()
          ? source.rsvp.descriptionHtml
          : undefined,
      url: source.rsvp?.url ?? fallback.rsvp.url,
      deadlineEyebrow:
        typeof source.rsvp?.deadlineEyebrow === "string"
          ? source.rsvp.deadlineEyebrow.trim()
          : "Deadline",
      deadline: source.rsvp?.deadline ?? fallback.rsvp.deadline,
      panelDescription:
        typeof source.rsvp?.panelDescription === "string"
          ? source.rsvp.panelDescription.trim()
          : "Guests can reply here with the standard wedding details you would usually need, including attendance, dietary requirements, and optional notes.",
      panelDescriptionHtml:
        typeof source.rsvp?.panelDescriptionHtml === "string" &&
        source.rsvp.panelDescriptionHtml.trim()
          ? source.rsvp.panelDescriptionHtml
          : undefined,
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
        dietaryInputType:
          source.rsvp?.form?.dietaryInputType === "select" ||
          source.rsvp?.form?.dietaryInputType === "multiselect"
            ? source.rsvp.form.dietaryInputType
            : "text",
        dietaryOptions: coerceStringOptions(source.rsvp?.form?.dietaryOptions),
        mealOptions: coerceMealOptions(source.rsvp?.form?.mealOptions),
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
      images: Array.isArray(source.gallery?.images)
        ? coerceImageList(source.gallery?.images, [])
        : fallback.gallery.images
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
      note: source.contact?.note ?? fallback.contact.note,
      rsvpNotificationEmail:
        typeof source.contact?.rsvpNotificationEmail === "string"
          ? source.contact.rsvpNotificationEmail.trim()
          : undefined
    },
    aiConciergeEnabled:
      source.aiConciergeEnabled ?? fallback.aiConciergeEnabled,
    sectionVisibility: {
      heroEyebrow: source.sectionVisibility?.heroEyebrow ?? true,
      date: source.sectionVisibility?.date ?? true,
      locationSummary: source.sectionVisibility?.locationSummary ?? true,
      tagline: source.sectionVisibility?.tagline ?? true,
      announcement: source.sectionVisibility?.announcement ?? true,
      heroActions: source.sectionVisibility?.heroActions ?? true,
      previewNote: source.sectionVisibility?.previewNote ?? true,
      schedule: source.sectionVisibility?.schedule ?? true,
      travel: source.sectionVisibility?.travel ?? true,
      ceremonyCard: source.sectionVisibility?.ceremonyCard ?? true,
      receptionCard: source.sectionVisibility?.receptionCard ?? true,
      transportCard: source.sectionVisibility?.transportCard ?? true,
      directionsCard: source.sectionVisibility?.directionsCard ?? true,
      relaxedNote: source.sectionVisibility?.relaxedNote ?? true,
      accommodation: source.sectionVisibility?.accommodation ?? true,
      dayTwo: source.sectionVisibility?.dayTwo ?? false,
      story: source.sectionVisibility?.story ?? true,
      gallery: source.sectionVisibility?.gallery ?? true,
      registry: source.sectionVisibility?.registry ?? true,
      rsvp: source.sectionVisibility?.rsvp ?? true,
      faq: source.sectionVisibility?.faq ?? true,
      aiConcierge: source.sectionVisibility?.aiConcierge ?? true
    }
  };
}
