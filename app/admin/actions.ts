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
    intake?: Record<string, unknown>;
  };

  const storyParagraphs = String(formData.get("storyParagraphs") || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

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
    .map((line) => ({
      name: line,
      note: "Recommended for guests travelling to the wedding."
    }));

  const nextContent = {
    ...weddingData,
    couple: String(formData.get("couple") || "").trim() || weddingData.couple,
    date: String(formData.get("date") || "").trim() || weddingData.date,
    theme: String(formData.get("theme") || "").trim() || weddingData.theme,
    locationSummary:
      String(formData.get("locationSummary") || "").trim() || weddingData.locationSummary,
    tagline: String(formData.get("tagline") || "").trim() || weddingData.tagline,
    announcement:
      String(formData.get("announcement") || "").trim() || weddingData.announcement,
    heroImage: String(formData.get("heroImage") || "").trim() || weddingData.heroImage,
    story: {
      ...weddingData.story,
      paragraphs: storyParagraphs.length ? storyParagraphs : weddingData.story.paragraphs
    },
    ceremony: {
      ...weddingData.ceremony,
      time: String(formData.get("ceremonyTime") || "").trim() || weddingData.ceremony.time,
      location:
        String(formData.get("ceremonyLocation") || "").trim() || weddingData.ceremony.location,
      address:
        String(formData.get("ceremonyAddress") || "").trim() || weddingData.ceremony.address
    },
    reception: {
      ...weddingData.reception,
      time: String(formData.get("receptionTime") || "").trim() || weddingData.reception.time,
      location:
        String(formData.get("receptionLocation") || "").trim() || weddingData.reception.location,
      address:
        String(formData.get("receptionAddress") || "").trim() || weddingData.reception.address
    },
    schedule: scheduleItems.length ? scheduleItems : weddingData.schedule,
    travel: {
      ...weddingData.travel,
      transport:
        String(formData.get("travelText") || "").trim() || weddingData.travel.transport
    },
    accommodation: accommodationItems.length ? accommodationItems : weddingData.accommodation,
    faq: faqItems.length ? faqItems : weddingData.faq,
    contact: {
      ...weddingData.contact,
      email: String(formData.get("contactEmail") || "").trim() || weddingData.contact.email
    },
    rsvp: {
      ...weddingData.rsvp,
      deadline: String(formData.get("rsvpDeadline") || "").trim() || weddingData.rsvp.deadline
    },
    aiConciergeEnabled: String(formData.get("packageTier") || "") !== "basic"
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

  redirect(`/admin/weddings/${nextSlug}?saved=1`);
}
