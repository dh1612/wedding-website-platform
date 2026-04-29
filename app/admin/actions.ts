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
  const storyRichTextParagraphs = stripHtml(storyRichText)
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const announcementRichText = String(formData.get("announcementRichText") || "").trim();

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

  const nextContent = {
    ...weddingData,
    couple: String(formData.get("couple") || "").trim() || weddingData.couple,
    date: String(formData.get("date") || "").trim() || weddingData.date,
    theme: String(formData.get("theme") || "").trim() || weddingData.theme,
    locationSummary:
      String(formData.get("locationSummary") || "").trim() || weddingData.locationSummary,
    tagline: String(formData.get("tagline") || "").trim() || weddingData.tagline,
    announcement: stripHtml(announcementRichText) || weddingData.announcement,
    announcementHtml: announcementRichText || weddingData.announcementHtml,
    heroImage: String(formData.get("heroImage") || "").trim() || weddingData.heroImage,
    story: {
      ...weddingData.story,
      paragraphs:
        storyRichTextParagraphs.length
          ? storyRichTextParagraphs
          : storyParagraphs.length
            ? storyParagraphs
            : weddingData.story.paragraphs,
      html: storyRichText || weddingData.story.html
    },
    ceremony: {
      ...weddingData.ceremony,
      time: String(formData.get("ceremonyTime") || "").trim() || weddingData.ceremony.time,
      location:
        String(formData.get("ceremonyLocation") || "").trim() || weddingData.ceremony.location,
      address:
        String(formData.get("ceremonyAddress") || "").trim() || weddingData.ceremony.address,
      description:
        String(formData.get("ceremonyDescription") || "").trim() ||
        weddingData.ceremony.description
    },
    reception: {
      ...weddingData.reception,
      time: String(formData.get("receptionTime") || "").trim() || weddingData.reception.time,
      location:
        String(formData.get("receptionLocation") || "").trim() || weddingData.reception.location,
      address:
        String(formData.get("receptionAddress") || "").trim() || weddingData.reception.address,
      description:
        String(formData.get("receptionDescription") || "").trim() ||
        weddingData.reception.description
    },
    schedule: scheduleItems.length ? scheduleItems : weddingData.schedule,
    travel: {
      ...weddingData.travel,
      heading:
        String(formData.get("travelHeading") || "").trim() || weddingData.travel.heading,
      description:
        String(formData.get("travelDescription") || "").trim() ||
        weddingData.travel.description,
      transport:
        String(formData.get("travelTransport") || formData.get("travelText") || "").trim() ||
        weddingData.travel.transport,
      parking:
        String(formData.get("travelParking") || "").trim() || weddingData.travel.parking,
      directions:
        String(formData.get("travelDirections") || "").trim() || weddingData.travel.directions,
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
          String(formData.get("rsvpFormIntro") || "").trim() ||
          weddingData.rsvp.form?.intro ||
          "Share your reply here, including any dietary requirements or extra notes the couple should know.",
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
