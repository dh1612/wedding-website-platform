"use server";

import { redirect } from "next/navigation";
import { coerceWeddingData } from "@/lib/wedding-data";
import {
  createWeddingDraft,
  deleteWeddingDraftBySlug,
  getWeddingRecordForAdmin,
  updateWeddingBySlug
} from "@/lib/production-repositories";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseAccommodationLine(line: string) {
  const parts = line
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!parts.length) {
    return null;
  }

  const [name, second, third] = parts;
  const link = second?.startsWith("http://") || second?.startsWith("https://") ? second : undefined;
  const note = link ? third : second;

  return {
    name,
    link,
    note: note || "Recommended for guests travelling to the wedding."
  };
}

function stripHtml(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildCustomQuestionId(label: string, index: number) {
  const slug = slugify(label).slice(0, 40);
  return slug ? `custom-${slug}` : `custom-question-${index + 1}`;
}

function parseCustomQuestionLine(line: string, index: number) {
  const parts = line
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!parts.length) {
    return null;
  }

  const [label, typePart, requiredPart, ...placeholderParts] = parts;

  if (!label) {
    return null;
  }

  const type =
    typePart === "long" || typePart === "yesno" || typePart === "short"
      ? typePart
      : "short";

  const requirement = requiredPart?.toLowerCase();
  const required = requirement === "required";
  const placeholder = placeholderParts.join(" | ").trim() || undefined;

  return {
    id: buildCustomQuestionId(label, index),
    label,
    type,
    required,
    placeholder
  };
}

function isValidRemoteImageUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function createWeddingDraftAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const date = String(formData.get("eventDate") || "").trim();

  if (!title) {
    return;
  }

  const slugBase = slugify(title);
  const slug = `${slugBase}-${Date.now().toString().slice(-5)}`;

  await createWeddingDraft({
    slug,
    title,
    eventDate: date ? new Date(date) : undefined
  });

  redirect("/admin");
}

export async function deleteWeddingDraftAction(formData: FormData) {
  const slug = String(formData.get("slug") || "").trim();

  if (!slug) {
    redirect("/admin");
  }

  await deleteWeddingDraftBySlug(slug);

  redirect("/admin");
}

export async function updateWeddingContentAction(formData: FormData) {
  const currentSlug = String(formData.get("currentSlug") || "").trim();
  const nextSlug = slugify(String(formData.get("slug") || "").trim());
  const title = String(formData.get("title") || "").trim();

  if (!currentSlug || !nextSlug || !title) {
    redirect("/admin");
  }

  const existing = await getWeddingRecordForAdmin(currentSlug);

  if (!existing?.contentJson) {
    redirect("/admin");
  }

  const weddingData = coerceWeddingData(existing.contentJson);
  const plannerSettings = (existing.plannerSettingsJson ?? {}) as {
    packageTier?: "basic" | "smart" | "premium";
    portalPassword?: string;
    intake?: Record<string, unknown>;
  };

  const storyParagraphs = String(formData.get("storyParagraphs") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const storyRichText = String(formData.get("storyRichText") || "").trim();
  const storyHeadingRichText = String(formData.get("storyHeading") || "").trim();
  const galleryHeadingRichText = String(formData.get("galleryHeading") || "").trim();
  const galleryDescriptionRichText = String(formData.get("galleryDescription") || "").trim();
  const storyRichTextParagraphs = stripHtml(storyRichText)
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const announcementRichText = String(formData.get("announcementRichText") || "").trim();
  const locationSummaryRichText = String(formData.get("locationSummary") || "").trim();
  const taglineRichText = String(formData.get("tagline") || "").trim();
  const travelHeadingRichText = String(formData.get("travelHeading") || "").trim();
  const travelDescriptionRichText = String(formData.get("travelDescription") || "").trim();
  const locationOverviewTitleRichText = String(formData.get("locationOverviewTitle") || "").trim();
  const locationOverviewRichText = String(formData.get("locationOverview") || "").trim();
  const ceremonyDescriptionRichText = String(formData.get("ceremonyDescription") || "").trim();
  const receptionDescriptionRichText = String(formData.get("receptionDescription") || "").trim();
  const travelTransportRichText = String(formData.get("travelTransport") || "").trim();
  const travelParkingRichText = String(formData.get("travelParking") || "").trim();
  const travelDirectionsRichText = String(formData.get("travelDirections") || "").trim();
  const rsvpFormIntroRichText = String(formData.get("rsvpFormIntro") || "").trim();

  const scheduleItems = String(formData.get("scheduleText") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [timePart, ...rest] = line.split("-");
      const details = rest.join("-").trim();
      return {
        time: timePart?.trim() || `Stop ${index + 1}`,
        title: details || `Wedding moment ${index + 1}`,
        details: details || line
      };
    });

  const faqItems = String(formData.get("faqText") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...rest] = line.split("?");
      const answer = rest.join("?").replace(/^[-:\s]+/, "").trim();
      return {
        q: line.includes("?") ? `${question.trim()}?` : line,
        a: answer || "Further details will be shared with guests soon."
      };
    });

  const accommodationItems = String(formData.get("accommodationText") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(parseAccommodationLine)
    .filter((item): item is NonNullable<ReturnType<typeof parseAccommodationLine>> => Boolean(item));

  const customQuestions = String(formData.get("rsvpCustomQuestions") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(parseCustomQuestionLine)
    .filter((item): item is NonNullable<ReturnType<typeof parseCustomQuestionLine>> => Boolean(item));
  const galleryImages = String(formData.get("galleryImages") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter(isValidRemoteImageUrl);

  const nextContent = {
    ...weddingData,
    couple: String(formData.get("couple") || "").trim() || weddingData.couple,
    date: String(formData.get("date") || "").trim() || weddingData.date,
    theme: String(formData.get("theme") || "").trim() || weddingData.theme,
    locationSummary:
      stripHtml(locationSummaryRichText) || weddingData.locationSummary,
    locationSummaryHtml:
      locationSummaryRichText || weddingData.locationSummaryHtml,
    tagline: stripHtml(taglineRichText) || weddingData.tagline,
    taglineHtml:
      taglineRichText || weddingData.taglineHtml,
    announcement: stripHtml(announcementRichText) || weddingData.announcement,
    announcementHtml: announcementRichText || weddingData.announcementHtml,
    heroImage: String(formData.get("heroImage") || "").trim() || weddingData.heroImage,
    story: {
      ...weddingData.story,
      heading: stripHtml(storyHeadingRichText) || weddingData.story.heading,
      headingHtml: storyHeadingRichText || weddingData.story.headingHtml,
      paragraphs:
        storyRichTextParagraphs.length
          ? storyRichTextParagraphs
          : storyParagraphs.length
            ? storyParagraphs
            : weddingData.story.paragraphs,
      html: storyRichText || weddingData.story.html
    },
    gallery: {
      ...weddingData.gallery,
      heading: stripHtml(galleryHeadingRichText) || weddingData.gallery.heading,
      headingHtml: galleryHeadingRichText || weddingData.gallery.headingHtml,
      description:
        stripHtml(galleryDescriptionRichText) || weddingData.gallery.description,
      descriptionHtml:
        galleryDescriptionRichText || weddingData.gallery.descriptionHtml,
      images: galleryImages.length ? galleryImages : weddingData.gallery.images
    },
    ceremony: {
      ...weddingData.ceremony,
      time: String(formData.get("ceremonyTime") || "").trim() || weddingData.ceremony.time,
      location:
        String(formData.get("ceremonyLocation") || "").trim() || weddingData.ceremony.location,
      address:
        String(formData.get("ceremonyAddress") || "").trim() || weddingData.ceremony.address,
      description:
        stripHtml(ceremonyDescriptionRichText) || weddingData.ceremony.description,
      descriptionHtml:
        ceremonyDescriptionRichText || weddingData.ceremony.descriptionHtml
    },
    reception: {
      ...weddingData.reception,
      time: String(formData.get("receptionTime") || "").trim() || weddingData.reception.time,
      location:
        String(formData.get("receptionLocation") || "").trim() || weddingData.reception.location,
      address:
        String(formData.get("receptionAddress") || "").trim() || weddingData.reception.address,
      description:
        stripHtml(receptionDescriptionRichText) || weddingData.reception.description,
      descriptionHtml:
        receptionDescriptionRichText || weddingData.reception.descriptionHtml
    },
    schedule: scheduleItems.length ? scheduleItems : weddingData.schedule,
    travel: {
      ...weddingData.travel,
      heading:
        stripHtml(travelHeadingRichText) || weddingData.travel.heading,
      headingHtml:
        travelHeadingRichText || weddingData.travel.headingHtml,
      description:
        stripHtml(travelDescriptionRichText) || weddingData.travel.description,
      descriptionHtml:
        travelDescriptionRichText || weddingData.travel.descriptionHtml,
      locationOverviewTitle:
        stripHtml(locationOverviewTitleRichText) || weddingData.travel.locationOverviewTitle,
      locationOverviewTitleHtml:
        locationOverviewTitleRichText || weddingData.travel.locationOverviewTitleHtml,
      locationOverviewHtml:
        locationOverviewRichText || weddingData.travel.locationOverviewHtml,
      transport:
        stripHtml(travelTransportRichText) || weddingData.travel.transport,
      transportHtml:
        travelTransportRichText || weddingData.travel.transportHtml,
      parking:
        stripHtml(travelParkingRichText) || weddingData.travel.parking,
      parkingHtml:
        travelParkingRichText || weddingData.travel.parkingHtml,
      directions:
        stripHtml(travelDirectionsRichText) || weddingData.travel.directions,
      directionsHtml:
        travelDirectionsRichText || weddingData.travel.directionsHtml,
      mapLink:
        String(formData.get("travelMapLink") || "").trim() || weddingData.travel.mapLink
    },
    accommodation: accommodationItems.length ? accommodationItems : weddingData.accommodation,
    faq: faqItems.length ? faqItems : weddingData.faq,
    contact: {
      ...weddingData.contact,
      email: String(formData.get("contactEmail") || "").trim() || weddingData.contact.email
    },
    rsvp: {
      ...weddingData.rsvp,
      deadline: String(formData.get("rsvpDeadline") || "").trim() || weddingData.rsvp.deadline,
      form: {
        ...weddingData.rsvp.form,
        title:
          String(formData.get("rsvpFormTitle") || "").trim() ||
          weddingData.rsvp.form?.title ||
          "Let Us Know If You Can Make It",
        intro:
          stripHtml(rsvpFormIntroRichText) ||
          weddingData.rsvp.form?.intro ||
          "Share your reply here, including any dietary requirements or extra notes the couple should know.",
        introHtml:
          rsvpFormIntroRichText || weddingData.rsvp.form?.introHtml,
        attendingLabel:
          String(formData.get("rsvpAttendingLabel") || "").trim() ||
          weddingData.rsvp.form?.attendingLabel ||
          "Yes, I'll be there",
        declinedLabel:
          String(formData.get("rsvpDeclinedLabel") || "").trim() ||
          weddingData.rsvp.form?.declinedLabel ||
          "Sorry, I can't make it",
        submitLabel:
          String(formData.get("rsvpSubmitLabel") || "").trim() ||
          weddingData.rsvp.form?.submitLabel ||
          "Send RSVP",
        enableGuestCount: formData.has("rsvpEnableGuestCount"),
        enableMealChoice: formData.has("rsvpEnableMealChoice"),
        enableDietaryNotes: formData.has("rsvpEnableDietaryNotes"),
        enableSongRequest: formData.has("rsvpEnableSongRequest"),
        enableMessageToCouple: formData.has("rsvpEnableMessageToCouple"),
        customQuestions
      }
    },
    aiConciergeEnabled: String(formData.get("packageTier") || "") !== "basic",
    sectionVisibility: {
      locationSummary: formData.has("showLocationSummary"),
      tagline: formData.has("showTagline"),
      announcement: formData.has("showAnnouncement"),
      schedule: formData.has("showSchedule"),
      travel: formData.has("showTravel"),
      ceremonyCard: formData.has("showCeremonyCard"),
      receptionCard: formData.has("showReceptionCard"),
      transportCard: formData.has("showTransportCard"),
      directionsCard: formData.has("showDirectionsCard"),
      accommodation: formData.has("showAccommodation"),
      story: formData.has("showStory"),
      gallery: formData.has("showGallery"),
      registry: formData.has("showRegistry"),
      rsvp: formData.has("showRsvp"),
      faq: formData.has("showFaq"),
      aiConcierge: formData.has("showAiConcierge")
    }
  };

  const nextPlannerSettings = {
    ...plannerSettings,
    packageTier: String(formData.get("packageTier") || "").trim() || plannerSettings.packageTier,
    portalPassword: String(formData.get("portalPassword") || "").trim(),
    intake: {
      ...(plannerSettings.intake ?? {}),
      couple: nextContent.couple,
      email: nextContent.contact.email,
      date: nextContent.date,
      locationSummary: nextContent.locationSummary,
      packageTier: String(formData.get("packageTier") || "").trim() || plannerSettings.packageTier,
      themePreference: nextContent.theme
    }
  };

  await updateWeddingBySlug({
    currentSlug,
    slug: nextSlug,
    title,
    eventDate: nextContent.date ? new Date(nextContent.date) : undefined,
    contentJson: nextContent,
    plannerSettingsJson: nextPlannerSettings,
    status: (String(formData.get("status") || existing.status) as "draft" | "approved" | "live")
  });

  redirect(`/admin/weddings/${nextSlug}/edit?saved=1`);
}
