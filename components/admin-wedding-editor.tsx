import Link from "next/link";
import { updateWeddingContentAction } from "@/app/admin/actions";
import { PageHero } from "@/components/page-hero";
import { RichTextEditorField } from "@/components/rich-text-editor-field";
import { SiteFrame } from "@/components/site-frame";
import { buildOperatorWeddingNavItems } from "@/lib/site-navigation";
import { getThemeById, weddingThemes } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";

type AdminWeddingEditorProps = {
  record: {
    slug: string;
    title: string;
    status: "draft" | "approved" | "live";
    contentJson: unknown;
    plannerSettingsJson: unknown;
  };
  saved?: boolean;
  error?: string;
};

export function AdminWeddingEditor({
  record,
  saved = false,
  error
}: AdminWeddingEditorProps) {
  function escapeHtml(value: string) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function paragraphHtml(paragraphs: string[]) {
    return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  }

  function simpleTextHtml(value: string | undefined) {
    const trimmed = (value ?? "").trim();
    if (!trimmed) {
      return "";
    }

    return trimmed
      .split(/\n{2,}/)
      .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
      .join("");
  }

  const weddingData = coerceWeddingData(record.contentJson);
  const plannerSettings = (record.plannerSettingsJson ?? {}) as {
    packageTier?: "basic" | "smart" | "premium";
    portalPassword?: string;
  };
  const theme = getThemeById(weddingData.theme);
  const accommodationLines = weddingData.accommodation
    .map((item) => [item.name, item.link, item.note].filter(Boolean).join(" | "))
    .join("\n");
  const galleryImageLines = weddingData.gallery.images.join("\n");
  const mapSpotLines = (weddingData.travel.mapSpots ?? [])
    .map((spot) => [spot.label, spot.detail, spot.href].filter(Boolean).join(" | "))
    .join("\n");
  const visibility = weddingData.sectionVisibility;
  const rsvpForm = weddingData.rsvp.form;
  const customQuestionLines = (rsvpForm?.customQuestions ?? [])
    .map((question) =>
      [
        question.label,
        question.type,
        question.required ? "required" : "optional",
        question.placeholder ?? ""
      ]
        .filter(Boolean)
        .join(" | ")
    )
    .join("\n");
  const announcementHtml = weddingData.announcementHtml
    ? weddingData.announcementHtml
    : `<p>${escapeHtml(weddingData.announcement)}</p>`;
  const storyHtml = weddingData.story.html
    ? weddingData.story.html
    : paragraphHtml(weddingData.story.paragraphs);
  const locationSummaryHtml = weddingData.locationSummaryHtml
    ? weddingData.locationSummaryHtml
    : simpleTextHtml(weddingData.locationSummary);
  const taglineHtml = weddingData.taglineHtml
    ? weddingData.taglineHtml
    : simpleTextHtml(weddingData.tagline);
  const storyHeadingHtml = weddingData.story.headingHtml
    ? weddingData.story.headingHtml
    : simpleTextHtml(weddingData.story.heading);
  const travelDescriptionHtml = weddingData.travel.descriptionHtml
    ? weddingData.travel.descriptionHtml
    : simpleTextHtml(weddingData.travel.description);
  const travelHeadingHtml = weddingData.travel.headingHtml
    ? weddingData.travel.headingHtml
    : simpleTextHtml(weddingData.travel.heading);
  const locationOverviewTitleHtml = weddingData.travel.locationOverviewTitleHtml
    ? weddingData.travel.locationOverviewTitleHtml
    : simpleTextHtml(weddingData.travel.locationOverviewTitle);
  const locationOverviewHtml = weddingData.travel.locationOverviewHtml
    ? weddingData.travel.locationOverviewHtml
    : simpleTextHtml("");
  const ceremonyDescriptionHtml = weddingData.ceremony.descriptionHtml
    ? weddingData.ceremony.descriptionHtml
    : simpleTextHtml(weddingData.ceremony.description);
  const receptionDescriptionHtml = weddingData.reception.descriptionHtml
    ? weddingData.reception.descriptionHtml
    : simpleTextHtml(weddingData.reception.description);
  const travelTransportHtml = weddingData.travel.transportHtml
    ? weddingData.travel.transportHtml
    : simpleTextHtml(weddingData.travel.transport);
  const travelParkingHtml = weddingData.travel.parkingHtml
    ? weddingData.travel.parkingHtml
    : simpleTextHtml(weddingData.travel.parking);
  const travelDirectionsHtml = weddingData.travel.directionsHtml
    ? weddingData.travel.directionsHtml
    : simpleTextHtml(weddingData.travel.directions);
  const rsvpIntroHtml = weddingData.rsvp.form?.introHtml
    ? weddingData.rsvp.form.introHtml
    : simpleTextHtml(rsvpForm?.intro ?? "");
  const galleryHeadingHtml = weddingData.gallery.headingHtml
    ? weddingData.gallery.headingHtml
    : simpleTextHtml(weddingData.gallery.heading);
  const galleryDescriptionHtml = weddingData.gallery.descriptionHtml
    ? weddingData.gallery.descriptionHtml
    : simpleTextHtml(weddingData.gallery.description);
  const sectionToggles = [
    { name: "showTravel", label: "Venue & Travel", checked: visibility?.travel ?? true },
    { name: "showCeremonyCard", label: "Ceremony card", checked: visibility?.ceremonyCard ?? true },
    { name: "showReceptionCard", label: "Reception card", checked: visibility?.receptionCard ?? true },
    { name: "showTransportCard", label: "Transport card", checked: visibility?.transportCard ?? true },
    { name: "showDirectionsCard", label: "Parking & directions card", checked: visibility?.directionsCard ?? true },
    { name: "showAccommodation", label: "Accommodation", checked: visibility?.accommodation ?? true },
    { name: "showStory", label: "Story copy", checked: visibility?.story ?? true },
    { name: "showGallery", label: "Gallery images", checked: visibility?.gallery ?? true },
    { name: "showSchedule", label: "Schedule", checked: visibility?.schedule ?? true },
    { name: "showRsvp", label: "RSVP section", checked: visibility?.rsvp ?? true },
    { name: "showAiConcierge", label: "AI concierge", checked: visibility?.aiConcierge ?? true },
    { name: "showFaq", label: "FAQ", checked: visibility?.faq ?? true },
    { name: "showRegistry", label: "Registry", checked: visibility?.registry ?? true }
  ] as const;
  const editorSections = [
    { id: "core-setup", label: "Core setup" },
    { id: "hero-copy", label: "Hero" },
    { id: "images", label: "Images" },
    { id: "venue-stay", label: "Venue & stay" },
    { id: "story-sections", label: "Story & sections" },
    { id: "key-details", label: "Key details" },
    { id: "rsvp-form", label: "RSVP form" }
  ] as const;

  return (
    <SiteFrame
      currentPath={`/admin/weddings/${record.slug}/edit`}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="operator"
      adminNavItemsOverride={buildOperatorWeddingNavItems(record.slug)}
      showFooter={false}
    >
      <PageHero
        eyebrow="Wedding Editor"
        title={`Edit ${record.title}`}
        description="Update the wedding content, switch the template, and add guest-facing details like venue and accommodation links from one place."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link href="/admin" className="accent-panel rounded-full px-4 py-2 text-sm">
            Back To Admin
          </Link>
          <Link href={`/admin/weddings/${record.slug}`} className="accent-panel rounded-full px-4 py-2 text-sm">
            Wedding Workspace
          </Link>
          <Link href={`/preview/${record.slug}`} className="accent-panel rounded-full px-4 py-2 text-sm">
            Open Review Draft
          </Link>
          <Link href={`/couple-portal/${record.slug}`} className="accent-panel rounded-full px-4 py-2 text-sm">
            Open Couple Portal
          </Link>
          <Link href={`/rsvp-dashboard/${record.slug}`} className="accent-panel rounded-full px-4 py-2 text-sm">
            Manage RSVPs
          </Link>
          <Link href={`/plan-your-tables/${record.slug}`} className="accent-panel rounded-full px-4 py-2 text-sm">
            Manage Seating
          </Link>
        </div>

        {saved ? (
          <div className="mb-6 rounded-[1.3rem] border border-[#184b38]/14 bg-[#f6fbf8] px-5 py-4 text-sm leading-6 text-[#486159]">
            Wedding updated successfully. The latest version is now saved.
          </div>
        ) : null}

        {error === "upload" ? (
          <div className="mb-6 rounded-[1.3rem] border border-[#9a5f45]/20 bg-[#fff6f1] px-5 py-4 text-sm leading-6 text-[#7d4c37]">
            Image upload failed. Please check that Blob storage is configured in Vercel, then try again.
          </div>
        ) : null}

        <form action={updateWeddingContentAction} className="space-y-8" encType="multipart/form-data">
          <input type="hidden" name="currentSlug" value={record.slug} />

          <div className="sticky top-4 z-20 rounded-[1.4rem] border border-[var(--border)] bg-white/92 p-4 shadow-[var(--shadow)] backdrop-blur">
            <div className="flex flex-wrap gap-2">
              {editorSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="accent-outline rounded-full px-4 py-2 text-sm font-medium"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>

          <div id="core-setup" className="section-shell scroll-mt-24 rounded-[2rem] p-8">
            <p className="eyebrow">Core Setup</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input name="title" defaultValue={record.title} placeholder="Wedding title" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              <input name="slug" defaultValue={record.slug} placeholder="Slug" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              <input name="couple" defaultValue={weddingData.couple} placeholder="Couple names" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              <input name="date" type="date" defaultValue={weddingData.date} className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              <select name="packageTier" defaultValue={plannerSettings.packageTier ?? "smart"} className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none">
                <option value="basic">Basic</option>
                <option value="smart">Smart</option>
                <option value="premium">Premium</option>
              </select>
              <select name="status" defaultValue={record.status} className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none">
                <option value="draft">Draft</option>
                <option value="approved">Approved</option>
                <option value="live">Live</option>
              </select>
              <div className="rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3 text-sm text-[var(--foreground)]">
                Current template: <span className="font-medium">{theme.name}</span>
              </div>
              <label className="flex items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3 text-sm text-[var(--foreground)]">
                <input type="checkbox" name="showLocationSummary" defaultChecked={visibility?.locationSummary ?? true} className="h-4 w-4" />
                <span>Show location summary on the website</span>
              </label>
            </div>
            <div className="mt-5 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
              <p className="eyebrow">Design Template</p>
              <h2 className="mt-3 text-2xl">Switch the website look if the couple changes their mind</h2>
              <p className="prose-copy mt-3">
                Choose a different design direction here and save. The wedding will keep its
                content, but the guest-facing website will render in the newly selected template.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {weddingThemes.map((item) => {
                  const isActive = item.id === weddingData.theme;
                  return (
                    <label key={item.id} className={`overflow-hidden rounded-[1.4rem] border cursor-pointer ${isActive ? "border-[#184b38] bg-[#184b38] text-white" : "border-[var(--border)] bg-[#faf7f2] text-[var(--foreground)]"}`}>
                      <input type="radio" name="theme" value={item.id} defaultChecked={isActive} className="sr-only" />
                      <div className="h-24 w-full" style={item.previewStyle} />
                      <div className="p-4">
                        <p className="text-lg font-medium">{item.name}</p>
                        <p className={`mt-2 text-sm leading-6 ${isActive ? "text-white/78" : "text-[#6d655d]"}`}>
                          {item.label}. {item.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div id="hero-copy" className="section-shell scroll-mt-24 rounded-[2rem] p-8">
            <p className="eyebrow">Hero Copy</p>
            <div className="mt-5 grid gap-4">
              <RichTextEditorField
                name="locationSummary"
                label="Location summary"
                description="This is the short location line shown with the date near the top of the site."
                defaultValue={locationSummaryHtml}
                minHeightClassName="min-h-[110px]"
              />
              <label className="flex items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3 text-sm text-[var(--foreground)]">
                <input type="checkbox" name="showTagline" defaultChecked={visibility?.tagline ?? true} className="h-4 w-4" />
                <span>Show tagline on the website</span>
              </label>
              <RichTextEditorField
                name="tagline"
                label="Tagline"
                description="Format the main supporting line under the couple names if you want more emphasis or italics."
                defaultValue={taglineHtml}
                minHeightClassName="min-h-[120px]"
              />
              <label className="flex items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3 text-sm text-[var(--foreground)]">
                <input type="checkbox" name="showAnnouncement" defaultChecked={visibility?.announcement ?? true} className="h-4 w-4" />
                <span>Show announcement / intro copy on the website</span>
              </label>
              <RichTextEditorField
                name="announcementRichText"
                label="Announcement / intro copy"
                description="Use the toolbar to add bold, italics, headings, lists, quotes, or a different font treatment."
                defaultValue={announcementHtml}
                minHeightClassName="min-h-[150px]"
              />
            </div>
          </div>

          <div id="images" className="section-shell scroll-mt-24 rounded-[2rem] p-8">
            <p className="eyebrow">Images</p>
            <div className="mt-5 grid gap-4">
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
                <p className="eyebrow">Hero Image</p>
                <p className="prose-copy mt-3">
                  Upload a JPG or PNG directly, or paste a direct image URL if you prefer. A new upload will override the URL field.
                </p>
                <input
                  name="heroImageFile"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  className="mt-4 block w-full text-sm text-[var(--foreground)] file:mr-4 file:rounded-full file:border-0 file:bg-[#184b38] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                />
                <input
                  name="heroImage"
                  defaultValue={weddingData.heroImage}
                  placeholder="https://..."
                  className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
              </div>
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
                <p className="eyebrow">Gallery Images</p>
                <p className="prose-copy mt-3">
                  Upload one or more gallery images here, or keep using one image URL per line. Uploaded images are added to the gallery in the order selected.
                </p>
                <input
                  name="galleryImageFiles"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  multiple
                  className="mt-4 block w-full text-sm text-[var(--foreground)] file:mr-4 file:rounded-full file:border-0 file:bg-[#184b38] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                />
                <textarea
                  name="galleryImages"
                  defaultValue={galleryImageLines}
                  rows={7}
                  placeholder={`https://...\nhttps://...\nhttps://...`}
                  className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
                />
              </div>
            </div>
          </div>

          <div id="venue-stay" className="section-shell scroll-mt-24 rounded-[2rem] p-8">
            <p className="eyebrow">Venue & Guest Stay</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <RichTextEditorField
                  name="travelHeading"
                  label="Section title"
                  description="This is the main title for the venue and travel section."
                  defaultValue={travelHeadingHtml}
                  minHeightClassName="min-h-[110px]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Section intro</label>
                <RichTextEditorField
                  name="travelDescription"
                  label="Section intro"
                  description="Format the venue and travel intro exactly how you want guests to read it."
                  defaultValue={travelDescriptionHtml}
                  minHeightClassName="min-h-[160px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2f473f]">Ceremony venue</label>
                <input name="ceremonyLocation" defaultValue={weddingData.ceremony.location} placeholder="Ceremony venue name" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2f473f]">Ceremony time</label>
                <input name="ceremonyTime" defaultValue={weddingData.ceremony.time} placeholder="Ceremony time" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Ceremony address</label>
                <input name="ceremonyAddress" defaultValue={weddingData.ceremony.address} placeholder="Ceremony address" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Ceremony Google Maps link</label>
                <input name="ceremonyMapLink" defaultValue={weddingData.ceremony.mapLink ?? ""} placeholder="https://maps.google.com/..." className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <RichTextEditorField
                  name="locationOverviewTitle"
                  label="About the location title"
                  description="Use this for an area note like About Chania or About Santorini."
                  defaultValue={locationOverviewTitleHtml}
                  minHeightClassName="min-h-[100px]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <RichTextEditorField
                  name="locationOverview"
                  label="About the location copy"
                  description="A short destination note for the couple's city, island, or venue area."
                  defaultValue={weddingData.travel.locationOverviewHtml ?? ""}
                  minHeightClassName="min-h-[150px]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Sneak peek venue image</label>
                <input
                  name="travelSneakPeekImageFile"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  className="w-full text-sm text-[var(--foreground)] file:mr-4 file:rounded-full file:border-0 file:bg-[#184b38] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                />
                <input
                  name="travelSneakPeekImage"
                  defaultValue={weddingData.travel.sneakPeekImage ?? ""}
                  placeholder="https://..."
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <p className="text-sm leading-6 text-[var(--muted)]">
                  This powers the interactive door reveal card in the venue section. Uploading a new image will override the URL field.
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <RichTextEditorField
                  name="ceremonyDescription"
                  label="Ceremony description"
                  description="Add guest-facing ceremony notes with emphasis, italics, or gentle formatting."
                  defaultValue={ceremonyDescriptionHtml}
                  minHeightClassName="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2f473f]">Reception venue</label>
                <input name="receptionLocation" defaultValue={weddingData.reception.location} placeholder="Reception venue name" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2f473f]">Reception time</label>
                <input name="receptionTime" defaultValue={weddingData.reception.time} placeholder="Reception time" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Reception address</label>
                <input name="receptionAddress" defaultValue={weddingData.reception.address} placeholder="Reception address" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Reception Google Maps link</label>
                <input name="receptionMapLink" defaultValue={weddingData.reception.mapLink ?? ""} placeholder="https://maps.google.com/..." className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <RichTextEditorField
                  name="receptionDescription"
                  label="Reception description"
                  description="Use this for dinner, dancing, transfers, or any reception-specific notes."
                  defaultValue={receptionDescriptionHtml}
                  minHeightClassName="min-h-[150px]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <RichTextEditorField
                  name="travelTransport"
                  label="Transport"
                  description="Format travel guidance clearly if couples want ferries, shuttles, taxis, or transfer details."
                  defaultValue={travelTransportHtml}
                  minHeightClassName="min-h-[160px]"
                />
              </div>
              <div className="space-y-2">
                <RichTextEditorField
                  name="travelParking"
                  label="Parking"
                  description="Useful for valet, street parking, or arrival instructions."
                  defaultValue={travelParkingHtml}
                  minHeightClassName="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <RichTextEditorField
                  name="travelDirections"
                  label="Directions"
                  description="Use this for step-by-step directions or arrival tips guests should not miss."
                  defaultValue={travelDirectionsHtml}
                  minHeightClassName="min-h-[150px]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Map link</label>
                <input name="travelMapLink" defaultValue={weddingData.travel.mapLink} placeholder="https://maps.google.com/..." className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Relaxed itinerary note</label>
                <textarea
                  name="travelRelaxedNote"
                  defaultValue={weddingData.travel.relaxedNote ?? ""}
                  rows={3}
                  placeholder="Greek weddings can run on a more relaxed rhythm, so leave yourself time to enjoy the island pace."
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#2f473f]">Map & area spots</label>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Use one line per spot in this format:
                  <span className="font-medium text-[var(--foreground)]"> Label | detail | Google Maps link (optional)</span>.
                </p>
                <textarea
                  name="travelMapSpots"
                  defaultValue={mapSpotLines}
                  rows={5}
                  placeholder={`Airport | Chania International Airport for arrivals and taxis\nVenue | En Kipo for the ceremony and celebrations | https://maps.google.com/...`}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
                />
              </div>
            </div>

            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
              <p className="eyebrow">Guest Accommodation</p>
              <h2 className="mt-3 text-2xl">Add hotels and booking links clearly</h2>
              <p className="prose-copy mt-3">
                Use one line per hotel in this format:
                <span className="font-medium text-[var(--foreground)]"> Hotel name | booking link | short note</span>.
                If you only have the hotel name for now, that is fine too.
              </p>
              <textarea name="accommodationText" defaultValue={accommodationLines} rows={6} placeholder="The Harbour Hotel | https://hotel-example.com | 8 minutes from the venue" className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
            </div>

            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-[#fbfcfb] p-5">
              <p className="eyebrow">Guest-Facing Preview Summary</p>
              <h2 className="mt-3 text-2xl">How this section currently reads on the website</h2>
              <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="rounded-[1.25rem] border border-[var(--border)] bg-white p-5">
                  <p className="eyebrow">Venue Details</p>
                  <div className="mt-3 space-y-4 text-sm leading-6 text-[#41564e]">
                    <div>
                      <p className="font-medium text-[#1c2622]">Ceremony</p>
                      <p>{weddingData.ceremony.location}</p>
                      <p>{weddingData.ceremony.time}</p>
                      <p>{weddingData.ceremony.address}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#1c2622]">Reception</p>
                      <p>{weddingData.reception.location}</p>
                      <p>{weddingData.reception.time}</p>
                      <p>{weddingData.reception.address}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-[var(--border)] bg-white p-5">
                  <p className="eyebrow">Accommodation</p>
                  <div className="mt-3 space-y-4">
                    {weddingData.accommodation.length ? (
                      weddingData.accommodation.map((item) => (
                        <div key={`${item.name}-${item.link ?? "hotel"}`} className="border-b border-[var(--border)] pb-4 last:border-b-0 last:pb-0">
                          <p className="font-medium text-[#1c2622]">{item.name}</p>
                          <p className="mt-1 text-sm leading-6 text-[#41564e]">{item.note}</p>
                          {item.link ? (
                            <p className="mt-2 text-sm text-[#0f5a43]">Guest button: View hotel</p>
                          ) : (
                            <p className="mt-2 text-sm text-[#6e7e78]">No hotel link added yet</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm leading-6 text-[#6e7e78]">No guest accommodation has been added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="story-sections" className="section-shell scroll-mt-24 rounded-[2rem] p-8">
            <p className="eyebrow">Story & Sections</p>
            <div className="mt-5 grid gap-4">
              <RichTextEditorField
                name="storyHeading"
                label="Story heading"
                description="Use this if you want to style the Our Story heading differently."
                defaultValue={storyHeadingHtml}
                minHeightClassName="min-h-[100px]"
              />
              <RichTextEditorField
                name="storyRichText"
                label="Story copy"
                description="Format the story as needed for this couple. This is ideal for emphasis, elegant headings, and italic details."
                defaultValue={storyHtml}
                minHeightClassName="min-h-[240px]"
              />
              <RichTextEditorField
                name="galleryHeading"
                label="Gallery heading"
                description="This is the title shown above the gallery when that section appears."
                defaultValue={galleryHeadingHtml}
                minHeightClassName="min-h-[100px]"
              />
              <RichTextEditorField
                name="galleryDescription"
                label="Gallery intro"
                description="Optional intro text for the gallery and favourite moments section."
                defaultValue={galleryDescriptionHtml}
                minHeightClassName="min-h-[140px]"
              />
              <textarea name="scheduleText" defaultValue={weddingData.schedule.map((item) => `${item.time} - ${item.title}`).join("\n")} rows={6} placeholder="Schedule lines" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              <textarea name="faqText" defaultValue={weddingData.faq.map((item) => `${item.q} ${item.a}`).join("\n")} rows={6} placeholder="FAQ lines" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
            </div>
            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
              <p className="eyebrow">Section Visibility</p>
              <h2 className="mt-3 text-2xl">Hide anything the couple does not need</h2>
              <p className="prose-copy mt-3">
                Untick any section you do not want shown on the live website for this wedding.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {sectionToggles.map(({ name, label, checked }) => (
                  <label key={name} className="flex items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3 text-sm text-[var(--foreground)]">
                    <input type="checkbox" name={name} defaultChecked={Boolean(checked)} className="h-4 w-4" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div id="key-details" className="section-shell scroll-mt-24 rounded-[2rem] p-8">
            <p className="eyebrow">Key Details</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input name="contactEmail" defaultValue={weddingData.contact.email} placeholder="Contact email" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              <input name="rsvpDeadline" defaultValue={weddingData.rsvp.deadline} placeholder="RSVP deadline" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
            </div>
            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
              <p className="eyebrow">Portal Access</p>
              <h2 className="mt-3 text-2xl">Set or reset the couple’s portal password</h2>
              <p className="prose-copy mt-3">
                Save a wedding-specific password here if you want this couple to have their own
                private portal access. If you leave it blank, the shared default portal password is
                used instead.
              </p>
              <input
                name="portalPassword"
                defaultValue={plannerSettings.portalPassword ?? ""}
                placeholder="Private portal password for this wedding"
                className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
            </div>
          </div>

          <div id="rsvp-form" className="section-shell scroll-mt-24 rounded-[2rem] p-8">
            <p className="eyebrow">RSVP Form</p>
            <h2 className="mt-3 text-2xl">Control what guests are asked</h2>
            <p className="prose-copy mt-3">
              These settings shape the guest-facing RSVP form for this wedding without needing a database migration.
            </p>
            <div className="mt-5 grid gap-4">
              <input
                name="rsvpFormTitle"
                defaultValue={rsvpForm?.title ?? ""}
                placeholder="RSVP form title"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="rsvpFormIntro"
                label="RSVP intro"
                description="This is the copy guests see before answering the RSVP form."
                defaultValue={rsvpIntroHtml}
                minHeightClassName="min-h-[150px]"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="rsvpAttendingLabel"
                  defaultValue={rsvpForm?.attendingLabel ?? ""}
                  placeholder="Attending option label"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="rsvpDeclinedLabel"
                  defaultValue={rsvpForm?.declinedLabel ?? ""}
                  placeholder="Declined option label"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
              </div>
              <input
                name="rsvpSubmitLabel"
                defaultValue={rsvpForm?.submitLabel ?? ""}
                placeholder="Submit button label"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
            </div>
            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
              <p className="eyebrow">Standard Questions</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {[
                  { name: "rsvpEnableGuestCount", label: "Guest count", checked: rsvpForm?.enableGuestCount ?? true },
                  { name: "rsvpEnableMealChoice", label: "Meal choice", checked: rsvpForm?.enableMealChoice ?? true },
                  { name: "rsvpEnableDietaryNotes", label: "Dietary requirements", checked: rsvpForm?.enableDietaryNotes ?? true },
                  { name: "rsvpEnableSongRequest", label: "Song request", checked: rsvpForm?.enableSongRequest ?? true },
                  { name: "rsvpEnableMessageToCouple", label: "Message to the couple", checked: rsvpForm?.enableMessageToCouple ?? true }
                ].map((item) => (
                  <label
                    key={item.name}
                    className="flex items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3 text-sm text-[var(--foreground)]"
                  >
                    <input
                      type="checkbox"
                      name={item.name}
                      defaultChecked={item.checked}
                      className="h-4 w-4"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
              <p className="eyebrow">Custom Questions</p>
              <h3 className="mt-3 text-xl">Add wedding-specific questions when a couple needs them</h3>
              <p className="prose-copy mt-3">
                Add one question per line in this format:
                <span className="font-medium text-[var(--foreground)]">
                  {" "}Question label | short/long/yesno | required/optional | placeholder
                </span>.
                The placeholder is optional. Delete a line to remove that question from the form.
              </p>
              <textarea
                name="rsvpCustomQuestions"
                defaultValue={customQuestionLines}
                rows={7}
                placeholder={`Do you need a coach seat? | yesno | optional\nWill you stay for brunch? | yesno | required\nAny accessibility notes? | long | optional | Share anything helpful here`}
                className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="accent-button rounded-full px-6 py-3 text-sm font-medium">
              Save Wedding Changes
            </button>
            <Link href={`/preview/${record.slug}`} className="accent-panel rounded-full px-6 py-3 text-sm">
              Back To Review
            </Link>
          </div>
        </form>
      </section>
    </SiteFrame>
  );
}
