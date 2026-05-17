"use server";

import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { hashPassword } from "@/lib/passwords";
import { coerceWeddingData } from "@/lib/wedding-data";
import {
  createWeddingDraft,
  deleteWeddingDraftBySlug,
  getWeddingRecordForAdmin,
  updateWeddingBySlug,
  upsertWeddingPortalUser
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

function parseCustomQuestionRow({
  id,
  label,
  typePart,
  required,
  placeholder,
  optionsValue,
  index = 0
}: {
  id?: string;
  label?: string;
  typePart?: string;
  required?: boolean;
  placeholder?: string;
  optionsValue?: string;
  index?: number;
}) {
  const cleanedLabel = label?.trim() || "";
  if (!cleanedLabel) {
    return null;
  }

  const type =
    typePart === "long" ||
    typePart === "yesno" ||
    typePart === "short" ||
    typePart === "select" ||
    typePart === "multiselect"
      ? typePart
      : "short";

  const options =
    type === "select" || type === "multiselect"
      ? (optionsValue ?? "")
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean)
      : undefined;
  const safePlaceholder =
    type === "short" || type === "long" ? placeholder?.trim() || undefined : undefined;

  return {
    id: id?.trim() || buildCustomQuestionId(cleanedLabel, index),
    label: cleanedLabel,
    type,
    required,
    placeholder: safePlaceholder,
    options: options?.length ? options : undefined
  };
}

function parseMapSpotLine(line: string) {
  const parts = line
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  if (parts.length < 2) {
    return null;
  }

  const [label, detail, href] = parts;

  return {
    label,
    detail,
    href: href && isValidRemoteImageUrl(href) ? href : undefined
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

function sanitizeFilenamePart(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFileExtension(filename: string) {
  const parts = filename.split(".");
  return parts.length > 1 ? sanitizeFilenamePart(parts.at(-1) || "") : "jpg";
}

async function uploadImageFile({
  file,
  weddingSlug,
  folder,
  fallbackLabel
}: {
  file: File | null;
  weddingSlug: string;
  folder: string;
  fallbackLabel: string;
}) {
  if (!file || file.size === 0) {
    return null;
  }

  const extension = getFileExtension(file.name);
  const timestamp = Date.now();
  const safeSlug = sanitizeFilenamePart(weddingSlug) || "wedding";
  const pathname = `weddings/${safeSlug}/${folder}/${fallbackLabel}-${timestamp}.${extension}`;

  const uploaded = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true
  });

  return uploaded.url;
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
  const publishLive = String(formData.get("publishLive") || "").trim() === "true";

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
  const portalUserEmail = String(formData.get("portalUserEmail") || "").trim().toLowerCase();
  const portalUserPassword = String(formData.get("portalUserPassword") || "").trim();

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
  const mapUtilityEyebrow = String(formData.get("travelMapUtilityEyebrow") || "").trim();
  const mapUtilityTitleRichText = String(formData.get("travelMapUtilityTitle") || "").trim();
  const mapUtilityDescriptionRichText = String(formData.get("travelMapUtilityDescription") || "").trim();
  const locationOverviewTitleRichText = String(formData.get("locationOverviewTitle") || "").trim();
  const locationOverviewRichText = String(formData.get("locationOverview") || "").trim();
  const ceremonyDescriptionRichText = String(formData.get("ceremonyDescription") || "").trim();
  const receptionDescriptionRichText = String(formData.get("receptionDescription") || "").trim();
  const travelTransportRichText = String(formData.get("travelTransport") || "").trim();
  const travelParkingRichText = String(formData.get("travelParking") || "").trim();
  const travelDirectionsRichText = String(formData.get("travelDirections") || "").trim();
  const rsvpFormIntroRichText = String(formData.get("rsvpFormIntro") || "").trim();

  const scheduleText = String(formData.get("scheduleText") || "");
  const scheduleItems = scheduleText
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((line) => {
      const [timePart, titlePart, ...rest] = line.split("-").map((part) => part.trim());
      const details = rest.join(" - ").trim();
      return {
        time: timePart || "",
        title: titlePart || "",
        details
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
    .map((line, index) => {
      const parts = line
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean);

      if (!parts.length) {
        return null;
      }

      const [label, typePart, requiredPart, ...extraParts] = parts;
      return parseCustomQuestionRow({
        id: buildCustomQuestionId(label, index),
        label,
        typePart,
        required: requiredPart?.toLowerCase() === "required",
        placeholder: extraParts.join(" | ").trim(),
        optionsValue: extraParts.join(" | ").trim(),
        index
      });
    })
    .filter((item): item is NonNullable<ReturnType<typeof parseCustomQuestionRow>> => Boolean(item));
  const mapSpots = String(formData.get("travelMapSpots") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(parseMapSpotLine)
    .filter((item): item is NonNullable<ReturnType<typeof parseMapSpotLine>> => Boolean(item));
  const galleryImages = String(formData.get("galleryImages") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter(isValidRemoteImageUrl);

  const questionLabels = formData.getAll("rsvpQuestionLabel").map((value) => String(value));
  const questionIds = formData.getAll("rsvpQuestionId").map((value) => String(value));
  const questionTypes = formData.getAll("rsvpQuestionType").map((value) => String(value));
  const questionPlaceholders = formData
    .getAll("rsvpQuestionPlaceholder")
    .map((value) => String(value));
  const questionOptions = formData.getAll("rsvpQuestionOptions").map((value) => String(value));
  const questionRequiredValues = formData
    .getAll("rsvpQuestionRequired")
    .map((value) => String(value));

  const structuredCustomQuestions = questionLabels
    .map((label, index) =>
      parseCustomQuestionRow({
        id: questionIds[index],
        label,
        typePart: questionTypes[index],
        required: questionRequiredValues[index] === "required",
        placeholder: questionPlaceholders[index],
        optionsValue: questionOptions[index],
        index
      })
    )
    .filter((item): item is NonNullable<ReturnType<typeof parseCustomQuestionRow>> => Boolean(item));

  const mealOptionValues = ["beef", "fish", "vegetarian", "vegan", "kids", "custom"] as const;
  const mealOptions = mealOptionValues.map((value) => ({
    value,
    label:
      String(formData.get(`mealOptionLabel_${value}`) || "").trim() ||
      {
        beef: "Beef",
        fish: "Fish",
        vegetarian: "Vegetarian",
        vegan: "Vegan",
        kids: "Kids meal",
        custom: "Custom / let us know below"
      }[value],
    enabled: formData.has(`mealOptionEnabled_${value}`)
  }));

  const dietaryOptions = String(formData.get("rsvpDietaryOptions") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  let uploadedHeroImage: string | null = null;
  let uploadedSneakPeekImage: string | null = null;
  let uploadedGalleryImages: string[] = [];

  try {
    uploadedHeroImage = await uploadImageFile({
      file: formData.get("heroImageFile") as File | null,
      weddingSlug: nextSlug,
      folder: "hero",
      fallbackLabel: "hero"
    });

    uploadedSneakPeekImage = await uploadImageFile({
      file: formData.get("travelSneakPeekImageFile") as File | null,
      weddingSlug: nextSlug,
      folder: "venue",
      fallbackLabel: "sneak-peek"
    });

    const galleryFileUploads = await Promise.all(
      formData
        .getAll("galleryImageFiles")
        .filter((entry): entry is File => entry instanceof File && entry.size > 0)
        .map((file, index) =>
          uploadImageFile({
            file,
            weddingSlug: nextSlug,
            folder: "gallery",
            fallbackLabel: `gallery-${index + 1}`
          })
        )
    );

    uploadedGalleryImages = galleryFileUploads.filter(
      (value): value is string => Boolean(value)
    );
  } catch (error) {
    console.error("Image upload failed", error);
    redirect(`/admin/weddings/${currentSlug}/edit?error=upload`);
  }

  const mergedGalleryImages =
    uploadedGalleryImages.length || galleryImages.length
      ? [...uploadedGalleryImages, ...galleryImages]
      : weddingData.gallery.images;

  const nextContent = {
    ...weddingData,
    couple: String(formData.get("couple") || "").trim() || weddingData.couple,
    date: String(formData.get("date") || "").trim() || weddingData.date,
    theme: String(formData.get("theme") || "").trim() || weddingData.theme,
    hero: {
      ...weddingData.hero,
      eyebrow:
        String(formData.get("heroEyebrow") || "").trim() ||
        weddingData.hero?.eyebrow ||
        "Wedding Day",
      previewNote:
        String(formData.get("heroPreviewNote") || "").trim() ||
        weddingData.hero?.previewNote ||
        "Sample wording is shown here for review. The couple can change all text before the site goes live.",
      primaryActionLabel:
        String(formData.get("heroPrimaryActionLabel") || "").trim() ||
        weddingData.hero?.primaryActionLabel ||
        "RSVP Details",
      primaryActionHref:
        String(formData.get("heroPrimaryActionHref") || "").trim() ||
        weddingData.hero?.primaryActionHref ||
        "#rsvp",
      secondaryActionLabel:
        String(formData.get("heroSecondaryActionLabel") || "").trim() ||
        weddingData.hero?.secondaryActionLabel ||
        "Wedding Details",
      secondaryActionHref:
        String(formData.get("heroSecondaryActionHref") || "").trim() ||
        weddingData.hero?.secondaryActionHref ||
        "#faq"
    },
    locationSummary:
      stripHtml(locationSummaryRichText) || weddingData.locationSummary,
    locationSummaryHtml:
      locationSummaryRichText || weddingData.locationSummaryHtml,
    tagline: stripHtml(taglineRichText) || weddingData.tagline,
    taglineHtml:
      taglineRichText || weddingData.taglineHtml,
    announcement: stripHtml(announcementRichText) || weddingData.announcement,
    announcementHtml: announcementRichText || weddingData.announcementHtml,
    heroImage:
      uploadedHeroImage ||
      String(formData.get("heroImage") || "").trim() ||
      weddingData.heroImage,
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
      images: mergedGalleryImages,
    },
    ceremony: {
      ...weddingData.ceremony,
      time: String(formData.get("ceremonyTime") || "").trim() || weddingData.ceremony.time,
      location:
        String(formData.get("ceremonyLocation") || "").trim() || weddingData.ceremony.location,
      address:
        String(formData.get("ceremonyAddress") || "").trim() || weddingData.ceremony.address,
      mapLink:
        String(formData.get("ceremonyMapLink") || "").trim() || weddingData.ceremony.mapLink,
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
      mapLink:
        String(formData.get("receptionMapLink") || "").trim() || weddingData.reception.mapLink,
      description:
        stripHtml(receptionDescriptionRichText) || weddingData.reception.description,
      descriptionHtml:
        receptionDescriptionRichText || weddingData.reception.descriptionHtml
    },
    schedule: scheduleText.trim() ? scheduleItems : [],
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
      mapUtilityEyebrow:
        mapUtilityEyebrow || weddingData.travel.mapUtilityEyebrow,
      mapUtilityTitle:
        stripHtml(mapUtilityTitleRichText) || weddingData.travel.mapUtilityTitle,
      mapUtilityTitleHtml:
        mapUtilityTitleRichText || weddingData.travel.mapUtilityTitleHtml,
      mapUtilityDescription:
        stripHtml(mapUtilityDescriptionRichText) || weddingData.travel.mapUtilityDescription,
      mapUtilityDescriptionHtml:
        mapUtilityDescriptionRichText || weddingData.travel.mapUtilityDescriptionHtml,
      locationOverviewTitle:
        stripHtml(locationOverviewTitleRichText) || weddingData.travel.locationOverviewTitle,
      locationOverviewTitleHtml:
        locationOverviewTitleRichText || weddingData.travel.locationOverviewTitleHtml,
      locationOverviewHtml:
        locationOverviewRichText || weddingData.travel.locationOverviewHtml,
      sneakPeekImage:
        uploadedSneakPeekImage ||
        String(formData.get("travelSneakPeekImage") || "").trim() ||
        weddingData.travel.sneakPeekImage,
      relaxedNote:
        String(formData.get("travelRelaxedNote") || "").trim() || weddingData.travel.relaxedNote,
      mapSpots: mapSpots.length ? mapSpots : weddingData.travel.mapSpots,
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
        dietaryInputType:
          String(formData.get("rsvpDietaryInputType") || "").trim() === "select" ||
          String(formData.get("rsvpDietaryInputType") || "").trim() === "multiselect"
            ? (String(formData.get("rsvpDietaryInputType") || "").trim() as "select" | "multiselect")
            : "text",
        dietaryOptions: dietaryOptions.length ? dietaryOptions : undefined,
        mealOptions,
        customQuestions: structuredCustomQuestions.length ? structuredCustomQuestions : customQuestions
      }
    },
    aiConciergeEnabled: String(formData.get("packageTier") || "") !== "basic",
    sectionVisibility: {
      heroEyebrow: formData.has("showHeroEyebrow"),
      date: formData.has("showDate"),
      locationSummary: formData.has("showLocationSummary"),
      tagline: formData.has("showTagline"),
      announcement: formData.has("showAnnouncement"),
      heroActions: formData.has("showHeroActions"),
      previewNote: formData.has("showPreviewNote"),
      schedule: formData.has("showSchedule"),
      travel: formData.has("showTravel"),
      ceremonyCard: formData.has("showCeremonyCard"),
      receptionCard: formData.has("showReceptionCard"),
      transportCard: formData.has("showTransportCard"),
      directionsCard: formData.has("showDirectionsCard"),
      relaxedNote: formData.has("showRelaxedNote"),
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
    intake: {
      ...(plannerSettings.intake ?? {}),
      couple: nextContent.couple,
      email: nextContent.contact.email,
      date: nextContent.date,
      locationSummary: nextContent.locationSummary,
      packageTier: String(formData.get("packageTier") || "").trim() || plannerSettings.packageTier,
      themePreference: nextContent.theme
    },
    ...(publishLive
      ? {
          websiteUnlocked: true,
          unlockRequestedAt: null
        }
      : {})
  };

  await updateWeddingBySlug({
    currentSlug,
    slug: nextSlug,
    title,
    eventDate: nextContent.date ? new Date(nextContent.date) : undefined,
    contentJson: nextContent,
    liveContentJson: publishLive ? nextContent : undefined,
    plannerSettingsJson: nextPlannerSettings,
    status: publishLive
      ? "live"
      : (String(formData.get("status") || existing.status) as "draft" | "approved" | "live"),
    publishedAt: publishLive ? new Date() : undefined
  });

  if (existing.id && portalUserEmail) {
    const passwordHash = portalUserPassword ? await hashPassword(portalUserPassword) : undefined;

    await upsertWeddingPortalUser({
      weddingId: existing.id,
      email: portalUserEmail,
      passwordHash
    });
  }

  redirect(`/admin/weddings/${nextSlug}/edit?saved=1${publishLive ? "&published=1" : ""}`);
}
