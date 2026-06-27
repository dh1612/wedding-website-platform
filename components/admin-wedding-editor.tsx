import Link from "next/link";
import type { Route } from "next";
import {
  getAdminDashboardPath,
  getAdminWeddingWorkspacePath
} from "@/lib/admin-path";
import { updateWeddingContentAction } from "@/app/admin/actions";
import { PageHero } from "@/components/page-hero";
import { RichTextEditorField } from "@/components/rich-text-editor-field";
import { SiteFrame } from "@/components/site-frame";
import { BRAND_DOMAIN } from "@/lib/brand";
import { fontPresets, getFontPresetById } from "@/lib/font-presets";
import { buildOperatorWeddingNavItems } from "@/lib/site-navigation";
import { getThemeById, weddingThemes } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";

type AdminWeddingEditorProps = {
  record: {
    slug: string;
    title: string;
    status: "draft" | "approved" | "live";
    contentJson: unknown;
    liveContentJson?: unknown;
    plannerSettingsJson: unknown;
    publishedAt?: Date | null;
    adminUsers?: Array<{
      id: string;
      email: string;
      role: "owner" | "planner";
      createdAt: Date;
    }>;
  };
  saved?: boolean;
  published?: boolean;
  error?: string;
};

type EditorAccordionSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

function EditorAccordionSection({
  id,
  eyebrow,
  title,
  description,
  defaultOpen = false,
  children
}: EditorAccordionSectionProps) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="section-shell scroll-mt-24 rounded-[2rem] border border-[var(--border)] bg-white/90"
    >
      <summary className="list-none cursor-pointer p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 text-2xl">{title}</h2>
            <p className="prose-copy mt-3 max-w-3xl">{description}</p>
          </div>
          <span className="accent-outline mt-1 inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium">
            Open
          </span>
        </div>
      </summary>
      <div className="border-t border-[var(--border)] px-8 pb-8 pt-6">{children}</div>
    </details>
  );
}

type SectionToggleProps = {
  name: string;
  label: string;
  checked: boolean;
};

function SectionToggle({ name, label, checked }: SectionToggleProps) {
  return (
    <label className="flex items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3 text-sm text-[var(--foreground)]">
      <input type="checkbox" name={name} defaultChecked={checked} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}

export function AdminWeddingEditor({
  record,
  saved = false,
  published = false,
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
  const invitation = weddingData.invitation;
  const plannerSettings = (record.plannerSettingsJson ?? {}) as {
    packageTier?: "basic" | "smart" | "premium";
  };
  const portalUser = record.adminUsers?.[0] ?? null;
  const theme = getThemeById(weddingData.theme);
  const selectedFontPreset = getFontPresetById(weddingData.fontPreset);
  const accommodationLines = weddingData.accommodation
    .map((item) => [item.name, item.link, item.note, item.linkLabel].filter(Boolean).join(" | "))
    .join("\n");
  const supplierLines = weddingData.suppliers
    .map((item) => [item.name, item.category, item.note, item.link].filter(Boolean).join(" | "))
    .join("\n");
  const galleryImageLines = weddingData.gallery.images.join("\n");
  const mapSpotLines = (weddingData.travel.mapSpots ?? [])
    .map((spot) => [spot.label, spot.detail, spot.href].filter(Boolean).join(" | "))
    .join("\n");
  const visualMapNodeLines = (weddingData.travel.visualMap?.nodes ?? [])
    .map((node) => [node.id, node.label, node.detail ?? "", String(node.x), String(node.y), node.tone ?? "neutral"].join(" | "))
    .join("\n");
  const visualMapConnectionLines = (weddingData.travel.visualMap?.connections ?? [])
    .map((connection) => [connection.from, connection.to, connection.label ?? ""].filter(Boolean).join(" | "))
    .join("\n");
  const styleOptions = weddingData.styleOptions ?? {};
  const visibility = weddingData.sectionVisibility;
  const websiteUrl = `https://${BRAND_DOMAIN}/${record.slug}`;
  const previewUrl = `https://${BRAND_DOMAIN}/preview/${record.slug}`;
  const couplePortalUrl = `https://${BRAND_DOMAIN}/couple-portal/${record.slug}`;
  const rsvpForm = weddingData.rsvp.form;
  const customQuestions = rsvpForm?.customQuestions ?? [];
  const customQuestionRowCount = Math.max(customQuestions.length + 4, 8);
  const customQuestionLines = (rsvpForm?.customQuestions ?? [])
    .map((question) =>
      [
        question.label,
        question.type,
        question.required ? "required" : "optional",
        question.type === "select" || question.type === "multiselect"
          ? (question.options ?? []).join("; ")
          : question.placeholder ?? ""
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
  const mapUtilityTitleHtml = weddingData.travel.mapUtilityTitleHtml
    ? weddingData.travel.mapUtilityTitleHtml
    : simpleTextHtml(weddingData.travel.mapUtilityTitle ?? "Useful locations at a glance");
  const mapUtilityDescriptionHtml = weddingData.travel.mapUtilityDescriptionHtml
    ? weddingData.travel.mapUtilityDescriptionHtml
    : simpleTextHtml(
        weddingData.travel.mapUtilityDescription ??
          "A quick guide to the places guests are most likely to need before and during the wedding weekend."
      );
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
  const rsvpSectionTitleHtml = weddingData.rsvp.titleHtml
    ? weddingData.rsvp.titleHtml
    : simpleTextHtml(weddingData.rsvp.title ?? "Let Us Know If You Can Make It");
  const rsvpSectionDescriptionHtml = weddingData.rsvp.descriptionHtml
    ? weddingData.rsvp.descriptionHtml
    : simpleTextHtml(weddingData.rsvp.description);
  const rsvpPanelDescriptionHtml = weddingData.rsvp.panelDescriptionHtml
    ? weddingData.rsvp.panelDescriptionHtml
    : simpleTextHtml(
        weddingData.rsvp.panelDescription ??
          "Guests can reply here with the standard wedding details you would usually need, including attendance, dietary requirements, and optional notes."
      );
  const galleryHeadingHtml = weddingData.gallery.headingHtml
    ? weddingData.gallery.headingHtml
    : simpleTextHtml(weddingData.gallery.heading);
  const galleryDescriptionHtml = weddingData.gallery.descriptionHtml
    ? weddingData.gallery.descriptionHtml
    : simpleTextHtml(weddingData.gallery.description);
  const scheduleHeadingHtml = weddingData.scheduleHeadingHtml
    ? weddingData.scheduleHeadingHtml
    : simpleTextHtml(weddingData.scheduleHeading ?? "What’s Happening And When");
  const scheduleDescriptionHtml = weddingData.scheduleDescriptionHtml
    ? weddingData.scheduleDescriptionHtml
    : simpleTextHtml(
        weddingData.scheduleDescription ??
          "A clear outline of the celebration so guests can settle in, enjoy the weekend, and know where they need to be."
      );
  const scheduleNoteHtml = weddingData.scheduleNoteHtml
    ? weddingData.scheduleNoteHtml
    : simpleTextHtml(
        weddingData.scheduleNote ??
          "A gentle flow is part of the destination-wedding charm, so use this as your guide and leave a little room for island time."
      );
  const accommodationTitleHtml = weddingData.accommodationTitleHtml
    ? weddingData.accommodationTitleHtml
    : simpleTextHtml(weddingData.accommodationTitle ?? "Places To Stay");
  const accommodationDescriptionHtml = weddingData.accommodationDescriptionHtml
    ? weddingData.accommodationDescriptionHtml
    : simpleTextHtml(
        weddingData.accommodationDescription ??
          "A couple of nearby options for guests travelling in for the celebration."
      );
  const suppliersTitleHtml = weddingData.suppliersTitleHtml
    ? weddingData.suppliersTitleHtml
    : simpleTextHtml(weddingData.suppliersTitle ?? "Helpful Local Contacts");
  const suppliersDescriptionHtml = weddingData.suppliersDescriptionHtml
    ? weddingData.suppliersDescriptionHtml
    : simpleTextHtml(
        weddingData.suppliersDescription ??
          "Recommended local beauty, hair, and wedding-day extras guests may want to book ahead of time."
      );
  const dayTwoTitleHtml = weddingData.dayTwo?.titleHtml
    ? weddingData.dayTwo.titleHtml
    : simpleTextHtml(weddingData.dayTwo?.title ?? "Keep The Celebrations Going");
  const dayTwoDescriptionHtml = weddingData.dayTwo?.descriptionHtml
    ? weddingData.dayTwo.descriptionHtml
    : simpleTextHtml(
        weddingData.dayTwo?.description ??
          "If you are extending the weekend, use this space for the second-day plan so guests know what is happening next."
      );
  const dayTwoPanelTitleHtml = weddingData.dayTwo?.panelTitleHtml
    ? weddingData.dayTwo.panelTitleHtml
    : simpleTextHtml(weddingData.dayTwo?.panelTitle ?? "Join us for one more celebration");
  const dayTwoDetailsHtml = weddingData.dayTwo?.detailsHtml
    ? weddingData.dayTwo.detailsHtml
    : simpleTextHtml(
        weddingData.dayTwo?.details ??
          "Add the timing, location, and any dress code or transport notes here."
      );
  const editorSections = [
    { id: "core-setup", label: "Core setup" },
    { id: "hero-copy", label: "Opening section" },
    { id: "invitation-suite", label: "Invitations" },
    { id: "images", label: "Images" },
    { id: "venue-travel", label: "Venue & travel" },
    { id: "accommodation", label: "Accommodation" },
    { id: "weekend-timeline", label: "Weekend timeline" },
    { id: "day-two", label: "Day two" },
    { id: "rsvp-form", label: "RSVP form" },
    { id: "suppliers", label: "Suppliers" },
    { id: "our-story", label: "Our story" },
    { id: "ai-concierge", label: "AI concierge" },
    { id: "faq", label: "FAQ" },
    { id: "key-details", label: "Key details" }
  ] as const;

  return (
    <SiteFrame
      currentPath={getAdminWeddingWorkspacePath(record.slug) + "/edit"}
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="operator"
      adminNavItemsOverride={buildOperatorWeddingNavItems(record.slug)}
      weddingData={weddingData}
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
          <Link href={getAdminDashboardPath()} className="accent-panel rounded-full px-4 py-2 text-sm">
            Back To Admin
          </Link>
          <Link href={getAdminWeddingWorkspacePath(record.slug)} className="accent-panel rounded-full px-4 py-2 text-sm">
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
          <Link href={`${getAdminWeddingWorkspacePath(record.slug)}/invitation`} className="accent-panel rounded-full px-4 py-2 text-sm">
            Open Invitation Suite
          </Link>
        </div>

        {saved ? (
          <div className="mb-6 rounded-[1.3rem] border border-[#184b38]/14 bg-[#f6fbf8] px-5 py-4 text-sm leading-6 text-[#486159]">
            Wedding updated successfully. The latest version is now saved to the draft editor.
          </div>
        ) : null}

        {published ? (
          <div className="mb-6 rounded-[1.3rem] border border-[#7a652d]/18 bg-[#fff9ef] px-5 py-4 text-sm leading-6 text-[#6a5530]">
            The current draft has also been published to the live guest website.
          </div>
        ) : null}

        {record.status === "live" ? (
          <div className="mb-6 rounded-[1.3rem] border border-[#7a652d]/18 bg-[#fff9ef] px-5 py-4 text-sm leading-6 text-[#6a5530]">
            This wedding is live. Changes you make here update the draft version only until you
            publish again from the wedding workspace in admin.
            {record.publishedAt ? ` Last published ${record.publishedAt.toLocaleDateString("en-IE")}.` : ""}
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

          <EditorAccordionSection
            id="core-setup"
            eyebrow="Core Setup"
            title="The essentials for this wedding"
            description="Update the wedding title, the shareable website link, the couple portal link, status, package, and overall design direction from one place."
            defaultOpen
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input name="title" defaultValue={record.title} placeholder="Wedding title" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              <div className="grid gap-2">
                <input
                  name="slug"
                  defaultValue={record.slug}
                  placeholder="website-link-slug"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <p className="text-sm leading-6 text-[var(--muted)]">
                  This slug controls both the guest website and the couple portal link.
                </p>
              </div>
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
              <select
                name="fontPreset"
                defaultValue={selectedFontPreset.id}
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              >
                {fontPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] px-4 py-3 text-sm text-[var(--muted)]">
              Site-wide font style:{" "}
              <span className="font-medium text-[var(--foreground)]">{selectedFontPreset.label}</span>
              <br />
              {selectedFontPreset.description}
            </div>
            <div className="mt-4 rounded-[1.3rem] border border-[var(--border)] bg-[#fafcfb] p-5">
              <p className="eyebrow">Current Links</p>
              <div className="mt-3 grid gap-3 text-sm leading-6 text-[var(--foreground)]">
                <p>
                  Guest website:
                  <br />
                  <span className="font-medium">{websiteUrl}</span>
                </p>
                <p>
                  Couple portal:
                  <br />
                  <span className="font-medium">{couplePortalUrl}</span>
                </p>
                <p>
                  Preview:
                  <br />
                  <span className="font-medium">{previewUrl}</span>
                </p>
              </div>
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
          </EditorAccordionSection>

          <EditorAccordionSection
            id="hero-copy"
            eyebrow="Hero Copy"
            title="The first thing guests will read"
            description="Edit the top-of-page location line, tagline, and introduction without touching the rest of the site."
          >
            <div className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-2">
                <SectionToggle
                  name="showHeroEyebrow"
                  label="Show eyebrow label"
                  checked={visibility?.heroEyebrow ?? true}
                />
                <SectionToggle
                  name="showDate"
                  label="Show date"
                  checked={visibility?.date ?? true}
                />
                <SectionToggle
                  name="showLocationSummary"
                  label="Show location summary on the website"
                  checked={visibility?.locationSummary ?? true}
                />
                <SectionToggle
                  name="showTagline"
                  label="Show tagline on the website"
                  checked={visibility?.tagline ?? true}
                />
                <SectionToggle
                  name="showAnnouncement"
                  label="Show announcement / intro copy"
                  checked={visibility?.announcement ?? true}
                />
                <SectionToggle
                  name="showPreviewNote"
                  label="Show preview note"
                  checked={visibility?.previewNote ?? true}
                />
                <SectionToggle
                  name="showHeroActions"
                  label="Show hero buttons"
                  checked={visibility?.heroActions ?? true}
                />
              </div>
              <input
                name="heroEyebrow"
                defaultValue={weddingData.hero?.eyebrow ?? "Wedding Day"}
                placeholder="Wedding Day"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="locationSummary"
                label="Location summary"
                description="This is the short location line shown with the date near the top of the site."
                defaultValue={locationSummaryHtml}
                minHeightClassName="min-h-[110px]"
              />
              <RichTextEditorField
                name="tagline"
                label="Tagline"
                description="Format the main supporting line under the couple names if you want more emphasis or italics."
                defaultValue={taglineHtml}
                minHeightClassName="min-h-[120px]"
              />
              <RichTextEditorField
                name="announcementRichText"
                label="Announcement / intro copy"
                description="Use the toolbar to add bold, italics, headings, lists, quotes, or a different font treatment."
                defaultValue={announcementHtml}
                minHeightClassName="min-h-[150px]"
              />
              <textarea
                name="heroPreviewNote"
                defaultValue={weddingData.hero?.previewNote ?? ""}
                rows={3}
                placeholder="Sample wording is shown here for review..."
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="heroPrimaryActionLabel"
                  defaultValue={weddingData.hero?.primaryActionLabel ?? "RSVP Details"}
                  placeholder="Primary button label"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="heroPrimaryActionHref"
                  defaultValue={weddingData.hero?.primaryActionHref ?? "#rsvp"}
                  placeholder="#rsvp"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="heroSecondaryActionLabel"
                  defaultValue={weddingData.hero?.secondaryActionLabel ?? "Wedding Details"}
                  placeholder="Secondary button label"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="heroSecondaryActionHref"
                  defaultValue={weddingData.hero?.secondaryActionHref ?? "#faq"}
                  placeholder="#faq"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
              </div>
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
                <p className="eyebrow">Presentation Controls</p>
                <p className="prose-copy mt-3">
                  Use these only when a couple wants a slightly more tailored look without changing the overall template.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <SectionToggle
                    name="compactSplitHero"
                    label="Compact top hero panel"
                    checked={styleOptions.compactSplitHero ?? false}
                  />
                  <SectionToggle
                    name="disableSectionOrnaments"
                    label="Remove section ornaments"
                    checked={styleOptions.disableSectionOrnaments ?? false}
                  />
                  <SectionToggle
                    name="hideHeaderCorners"
                    label="Remove header corner ornaments"
                    checked={styleOptions.hideHeaderCorners ?? false}
                  />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input
                    name="heroImageBrightness"
                    defaultValue={styleOptions.heroImageBrightness ?? ""}
                    placeholder="Hero image brightness e.g. 1.1"
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                  />
                  <input
                    name="heroImageObjectPosition"
                    defaultValue={styleOptions.heroImageObjectPosition ?? ""}
                    placeholder="Hero crop position e.g. 52% 34%"
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                  />
                </div>
              </div>
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="invitation-suite"
            eyebrow="Invitation Suite"
            title="Shape the digital invitation before you send it"
            description="These fields control the invitation wording used on the admin-only invitation suite. Couples do not see this in their portal."
          >
            <div className="grid gap-4">
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-[#fafcfb] p-5 text-sm leading-6 text-[var(--muted)]">
                The invitation suite stays operator-only. Use it to refine the formal invite wording,
                then print or save a PDF and share it with the couple manually when it is ready.
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="invitationEyebrow"
                  defaultValue={invitation?.eyebrow ?? "Wedding Invitation"}
                  placeholder="Wedding Invitation"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="invitationHostLine"
                  defaultValue={invitation?.hostLine ?? "Together with their families"}
                  placeholder="Together with their families"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="invitationLine"
                  defaultValue={invitation?.invitationLine ?? "request the pleasure of your company"}
                  placeholder="request the pleasure of your company"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="invitationCelebrationLine"
                  defaultValue={invitation?.celebrationLine ?? "to celebrate their marriage"}
                  placeholder="to celebrate their marriage"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="invitationReceptionLine"
                  defaultValue={invitation?.receptionLine ?? "Reception to follow"}
                  placeholder="Reception to follow"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="invitationWebsiteLine"
                  defaultValue={
                    invitation?.websiteLine ?? "Please visit our wedding website for full details and RSVP"
                  }
                  placeholder="Please visit our wedding website for full details and RSVP"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="invitationDetailsTitle"
                  defaultValue={invitation?.detailsCardTitle ?? "For the day"}
                  placeholder="For the day"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="invitationStayTitle"
                  defaultValue={invitation?.stayTitle ?? "Stay"}
                  placeholder="Stay"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
                <input
                  name="invitationDayTwoTitle"
                  defaultValue={invitation?.dayTwoTitle ?? "Keep the celebrations going"}
                  placeholder="Keep the celebrations going"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none md:col-span-2"
                />
              </div>
              <div>
                <Link
                  href={`${getAdminWeddingWorkspacePath(record.slug)}/invitation`}
                  className="accent-button inline-flex rounded-full px-5 py-3 text-sm font-medium"
                >
                  Open Invitation Suite
                </Link>
              </div>
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="images"
            eyebrow="Images"
            title="Swap visuals without relying on external links"
            description="Upload the main images used across the wedding website so they stay stable and easy to manage."
          >
            <div className="grid gap-4">
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
          </EditorAccordionSection>

          <EditorAccordionSection
            id="venue-travel"
            eyebrow="Venue & Travel"
            title="Where guests need to go and how they will get there"
            description="This is the practical travel section: ceremony, reception, travel notes, area details, maps, and transport guidance."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <SectionToggle
                  name="showTravel"
                  label="Show venue & travel section"
                  checked={visibility?.travel ?? true}
                />
                <SectionToggle
                  name="showCeremonyCard"
                  label="Show ceremony card"
                  checked={visibility?.ceremonyCard ?? true}
                />
                <SectionToggle
                  name="showReceptionCard"
                  label="Show reception card"
                  checked={visibility?.receptionCard ?? true}
                />
                <SectionToggle
                  name="showTransportCard"
                  label="Show transport card"
                  checked={visibility?.transportCard ?? true}
                />
                <SectionToggle
                  name="showDirectionsCard"
                  label="Show parking & directions card"
                  checked={visibility?.directionsCard ?? true}
                />
                <SectionToggle
                  name="showRelaxedNote"
                  label="Show relaxed itinerary note"
                  checked={visibility?.relaxedNote ?? true}
                />
              </div>
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2f473f]">Map & area eyebrow</label>
                <input
                  name="travelMapUtilityEyebrow"
                  defaultValue={weddingData.travel.mapUtilityEyebrow ?? "Map & Area"}
                  placeholder="Map & Area"
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <RichTextEditorField
                  name="travelMapUtilityTitle"
                  label="Map & area title"
                  description="This is the large title shown above the useful locations cards."
                  defaultValue={mapUtilityTitleHtml}
                  minHeightClassName="min-h-[110px]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <RichTextEditorField
                  name="travelMapUtilityDescription"
                  label="Map & area intro"
                  description="Use this for the short supporting text under the title."
                  defaultValue={mapUtilityDescriptionHtml}
                  minHeightClassName="min-h-[140px]"
                />
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
              <div className="space-y-2 md:col-span-2 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
                <p className="eyebrow">Optional visual weekend map</p>
                <p className="prose-copy mt-3">
                  This powers the custom visual map card. Use one node per line in this format:
                  <span className="font-medium text-[var(--foreground)]"> id | label | detail | x | y | tone</span>.
                  Tones can be <span className="font-medium text-[var(--foreground)]">neutral</span>, <span className="font-medium text-[var(--foreground)]">highlight</span>, or <span className="font-medium text-[var(--foreground)]">secondary</span>.
                </p>
                <div className="mt-4 grid gap-4">
                  <input
                    name="travelVisualMapEyebrow"
                    defaultValue={weddingData.travel.visualMap?.eyebrow ?? ""}
                    placeholder="Weekend map"
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                  />
                  <input
                    name="travelVisualMapTitle"
                    defaultValue={weddingData.travel.visualMap?.title ?? ""}
                    placeholder="Where each part of the weekend sits"
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                  />
                  <textarea
                    name="travelVisualMapDescription"
                    defaultValue={weddingData.travel.visualMap?.description ?? ""}
                    rows={3}
                    placeholder="A simple visual guide to the key bases, airports, and celebrations across the weekend."
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
                  />
                  <textarea
                    name="travelVisualMapNodes"
                    defaultValue={visualMapNodeLines}
                    rows={8}
                    placeholder={`chania-airport | Chania Airport | Main arrival point for most guests. | 18 | 18 | secondary\nagia-marina | Agia Marina | Likely transport base for the main wedding day. | 46 | 40 | highlight`}
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
                  />
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    Connections use this format:
                    <span className="font-medium text-[var(--foreground)]"> from-id | to-id | label (optional)</span>.
                  </p>
                  <textarea
                    name="travelVisualMapConnections"
                    defaultValue={visualMapConnectionLines}
                    rows={5}
                    placeholder={`chania-airport | chania-old-town | arrivals\nagia-marina | day-2 | wedding day`}
                    className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-[#fbfcfb] p-5">
              <p className="eyebrow">Guest-Facing Preview Summary</p>
              <h2 className="mt-3 text-2xl">How this section currently reads on the website</h2>
              <div className="mt-5 rounded-[1.25rem] border border-[var(--border)] bg-white p-5">
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
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="accommodation"
            eyebrow="Accommodation"
            title="Where guests can stay"
            description="Keep hotel suggestions and booking links separate so this section is easy to update on its own."
          >
            <div className="grid gap-4">
              <SectionToggle
                name="showAccommodation"
                label="Show accommodation section"
                checked={visibility?.accommodation ?? true}
              />
              <input
                name="accommodationEyebrow"
                defaultValue={weddingData.accommodationEyebrow ?? "Accommodation"}
                placeholder="Accommodation"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="accommodationTitle"
                label="Accommodation heading"
                description="This controls the large heading at the top of the accommodation section."
                defaultValue={accommodationTitleHtml}
                minHeightClassName="min-h-[140px]"
              />
              <RichTextEditorField
                name="accommodationDescription"
                label="Accommodation intro"
                description="Use this for the supporting text beneath the accommodation heading."
                defaultValue={accommodationDescriptionHtml}
                minHeightClassName="min-h-[140px]"
              />
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
                <p className="eyebrow">Guest Accommodation</p>
                <h2 className="mt-3 text-2xl">Add hotels and booking links clearly</h2>
                <p className="prose-copy mt-3">
                  Use one line per hotel in this format:
                  <span className="font-medium text-[var(--foreground)]"> Hotel name | booking link | short note | button label</span>.
                  If you only have the hotel name for now, that is fine too.
                </p>
                <textarea
                  name="accommodationText"
                  defaultValue={accommodationLines}
                  rows={6}
                  placeholder="The Harbour Hotel | https://hotel-example.com | 8 minutes from the venue | View hotel"
                  className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
              </div>
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-[#fbfcfb] p-5">
                <p className="eyebrow">Guest-Facing Preview Summary</p>
                <h2 className="mt-3 text-2xl">How the accommodation section currently reads</h2>
                <div className="rounded-[1.25rem] border border-[var(--border)] bg-white p-5">
                  <p className="eyebrow">Accommodation</p>
                  <div className="mt-3 space-y-4">
                    {weddingData.accommodation.length ? (
                      weddingData.accommodation.map((item) => (
                        <div key={`${item.name}-${item.link ?? "hotel"}`} className="border-b border-[var(--border)] pb-4 last:border-b-0 last:pb-0">
                          <p className="font-medium text-[#1c2622]">{item.name}</p>
                          <p className="mt-1 text-sm leading-6 text-[#41564e]">{item.note}</p>
                          {item.link ? (
                            <p className="mt-2 text-sm text-[#0f5a43]">Guest button: {item.linkLabel || "View hotel"}</p>
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
          </EditorAccordionSection>

          <EditorAccordionSection
            id="weekend-timeline"
            eyebrow="Weekend Timeline"
            title="What happens and when"
            description="Keep the wedding weekend timing separate so you can shape the guest journey without hunting through the story content."
          >
            <div className="grid gap-4">
              <SectionToggle
                name="showSchedule"
                label="Show weekend timeline"
                checked={visibility?.schedule ?? true}
              />
              <input
                name="scheduleEyebrow"
                defaultValue={weddingData.scheduleEyebrow ?? "Weekend Timeline"}
                placeholder="Weekend Timeline"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="scheduleHeading"
                label="Timeline heading"
                description="This controls the large headline on the left-hand side of the weekend timeline."
                defaultValue={scheduleHeadingHtml}
                minHeightClassName="min-h-[140px]"
              />
              <RichTextEditorField
                name="scheduleDescription"
                label="Timeline intro"
                description="Use this for the supporting paragraph under the main weekend timeline heading."
                defaultValue={scheduleDescriptionHtml}
                minHeightClassName="min-h-[140px]"
              />
              <RichTextEditorField
                name="scheduleNote"
                label="Timeline note"
                description="This controls the smaller note card beneath the intro copy."
                defaultValue={scheduleNoteHtml}
                minHeightClassName="min-h-[140px]"
              />
              <input
                name="scheduleStepLabel"
                defaultValue={weddingData.scheduleStepLabel ?? "Moment"}
                placeholder="Moment"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <textarea
                name="scheduleText"
                defaultValue={weddingData.schedule.map((item) => `${item.time} - ${item.title}`).join("\n")}
                rows={8}
                placeholder={`Friday 7:00pm - Welcome drinks\nSaturday 3:00pm - Ceremony\nSunday 12:00pm - Brunch`}
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
              />
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="day-two"
            eyebrow="Day Two"
            title="An optional second-day celebration"
            description="Use this as a dedicated pillar when the next-day event deserves its own spotlight instead of living inside the main timeline."
          >
            <div className="grid gap-4">
              <SectionToggle
                name="showDayTwo"
                label="Show day two section"
                checked={visibility?.dayTwo ?? false}
              />
              <input
                name="dayTwoEyebrow"
                defaultValue={weddingData.dayTwo?.eyebrow ?? "Day Two"}
                placeholder="Day Two"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="dayTwoTitle"
                label="Day two heading"
                description="This is the large heading on the left side of the day two pillar."
                defaultValue={dayTwoTitleHtml}
                minHeightClassName="min-h-[140px]"
              />
              <RichTextEditorField
                name="dayTwoDescription"
                label="Day two intro"
                description="Use this for a short explanation of what the second day is about."
                defaultValue={dayTwoDescriptionHtml}
                minHeightClassName="min-h-[140px]"
              />
              <input
                name="dayTwoPanelEyebrow"
                defaultValue={weddingData.dayTwo?.panelEyebrow ?? "Day Two Details"}
                placeholder="Day Two Details"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="dayTwoPanelTitle"
                label="Details box heading"
                description="This controls the heading inside the fancy details card on the right."
                defaultValue={dayTwoPanelTitleHtml}
                minHeightClassName="min-h-[120px]"
              />
              <RichTextEditorField
                name="dayTwoDetails"
                label="Details box copy"
                description="Add the time, place, dress code, transport notes, or anything else guests need for day two."
                defaultValue={dayTwoDetailsHtml}
                minHeightClassName="min-h-[180px]"
              />
              <input
                name="dayTwoMapLink"
                defaultValue={weddingData.dayTwo?.mapLink ?? ""}
                placeholder="https://maps.google.com/..."
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="our-story"
            eyebrow="Our Story"
            title="The personal side of the wedding website"
            description="Edit the couple story and gallery intro here so it feels like one clear pillar rather than part of a larger mixed section."
          >
            <div className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-2">
                <SectionToggle
                  name="showStory"
                  label="Show story copy"
                  checked={visibility?.story ?? true}
                />
                <SectionToggle
                  name="showGallery"
                  label="Show gallery images"
                  checked={visibility?.gallery ?? true}
                />
              </div>
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
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
                <p className="eyebrow">Story Images</p>
                <p className="prose-copy mt-3">
                  Add up to three images to sit alongside the story section. You can upload files,
                  paste direct image URLs, or clear any slot completely.
                </p>
                {[0, 1, 2].map((index) => {
                  const slot = index + 1;
                  const existingImage =
                    weddingData.story.featureImages?.[index] ??
                    (index === 0 ? weddingData.story.featureImage ?? "" : "");
                  const fileName = index === 0 ? "storyFeatureImageFile" : `storyFeatureImageFile${slot}`;
                  const urlName = index === 0 ? "storyFeatureImage" : `storyFeatureImage${slot}`;

                  return (
                    <div key={slot} className="mt-4 rounded-[1rem] border border-[var(--border)] bg-[var(--panel)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                        Story image {slot}
                      </p>
                      <input
                        name={fileName}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif"
                        className="mt-3 block w-full text-sm text-[var(--foreground)] file:mr-4 file:rounded-full file:border-0 file:bg-[#184b38] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                      />
                      <input
                        name={urlName}
                        defaultValue={existingImage}
                        placeholder="https://..."
                        className="mt-3 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                      />
                    </div>
                  );
                })}
              </div>
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
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="ai-concierge"
            eyebrow="AI Concierge"
            title="Control the interactive guest Q&A"
            description="Decide whether the AI concierge appears on this wedding and keep that choice separate from the rest of the FAQ section."
          >
            <div className="grid gap-4">
              <SectionToggle
                name="showAiConcierge"
                label="Show AI concierge"
                checked={visibility?.aiConcierge ?? true}
              />
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
                <p className="eyebrow">How this works</p>
                <p className="prose-copy mt-3">
                  The concierge answers guest questions from the saved wedding details. It is automatically
                  enabled for non-basic packages, but this toggle lets you hide or show the guest-facing card
                  for this specific wedding.
                </p>
              </div>
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="faq"
            eyebrow="FAQ"
            title="The practical guest questions"
            description="Keep FAQs separate so this pillar is easy to update without touching the story, timeline, or concierge."
          >
            <div className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-2">
                <SectionToggle
                  name="showFaq"
                  label="Show FAQ section"
                  checked={visibility?.faq ?? true}
                />
                <SectionToggle
                  name="showRegistry"
                  label="Show registry"
                  checked={visibility?.registry ?? true}
                />
              </div>
              <textarea
                name="faqText"
                defaultValue={weddingData.faq.map((item) => `${item.q} ${item.a}`).join("\n")}
                rows={8}
                placeholder="What time should we arrive? Please arrive 20 minutes before the ceremony begins."
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
              />
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="key-details"
            eyebrow="Key Details"
            title="Contact details and private access"
            description="Set the contact email and the couple’s private portal login for this wedding."
          >
            <div className="grid gap-4">
              <input name="contactEmail" defaultValue={weddingData.contact.email} placeholder="Contact email" className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none" />
              <input
                name="rsvpNotificationEmail"
                defaultValue={weddingData.contact.rsvpNotificationEmail ?? ""}
                placeholder="RSVP notification email (leave blank to use contact email)"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
            </div>
            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
              <p className="eyebrow">Portal Access</p>
              <h2 className="mt-3 text-2xl">Set or reset the couple’s portal login</h2>
              <p className="prose-copy mt-3">
                Give each couple their own email and password for the private portal. Leave the
                password blank if you only want to change the email and keep the current password.
              </p>
              {portalUser ? (
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Current couple login: <span className="font-medium text-[var(--foreground)]">{portalUser.email}</span>
                </p>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  No dedicated couple portal account has been created for this wedding yet.
                </p>
              )}
              <input
                name="portalUserEmail"
                defaultValue={portalUser?.email ?? ""}
                placeholder="couple@example.com"
                className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="portalUserPassword"
                type="password"
                placeholder={portalUser ? "Leave blank to keep the current password" : "Create a private portal password"}
                className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="rsvp-form"
            eyebrow="RSVP Form"
            title="Control what guests are asked"
            description="Shape the guest-facing RSVP form for this wedding without needing a database migration."
          >
            <div className="grid gap-4">
              <SectionToggle
                name="showRsvp"
                label="Show RSVP section"
                checked={visibility?.rsvp ?? true}
              />
              <input
                name="rsvpEyebrow"
                defaultValue={weddingData.rsvp.eyebrow ?? "RSVP"}
                placeholder="RSVP"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="rsvpSectionTitle"
                label="RSVP section heading"
                description="This controls the large heading on the left-hand side of the RSVP section."
                defaultValue={rsvpSectionTitleHtml}
                minHeightClassName="min-h-[140px]"
              />
              <RichTextEditorField
                name="rsvpSectionDescription"
                label="RSVP section intro"
                description="Use this for the supporting text beneath the RSVP heading."
                defaultValue={rsvpSectionDescriptionHtml}
                minHeightClassName="min-h-[140px]"
              />
              <input
                name="rsvpDeadlineEyebrow"
                defaultValue={weddingData.rsvp.deadlineEyebrow ?? "Deadline"}
                placeholder="Deadline"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="rsvpDeadline"
                defaultValue={weddingData.rsvp.deadline}
                placeholder="As soon as possible"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="rsvpPanelDescription"
                label="Deadline panel copy"
                description="This controls the explanatory copy inside the right-hand RSVP panel above the form."
                defaultValue={rsvpPanelDescriptionHtml}
                minHeightClassName="min-h-[140px]"
              />
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
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] p-4">
                  <p className="text-sm font-medium text-[var(--foreground)]">Meal choice options</p>
                  <p className="prose-copy mt-2">
                    Show or hide the standard meal choices and rename them if needed. The saved
                    data still maps cleanly in the dashboard.
                  </p>
                  <div className="mt-4 space-y-3">
                    {(rsvpForm?.mealOptions ?? []).map((option) => (
                      <div key={option.value} className="grid gap-3 md:grid-cols-[140px_minmax(0,1fr)]">
                        <label className="flex items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]">
                          <input
                            type="checkbox"
                            name={`mealOptionEnabled_${option.value}`}
                            defaultChecked={option.enabled}
                            className="h-4 w-4"
                          />
                          <span className="capitalize">{option.value}</span>
                        </label>
                        <input
                          name={`mealOptionLabel_${option.value}`}
                          defaultValue={option.label}
                          placeholder="Display label"
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] p-4">
                  <p className="text-sm font-medium text-[var(--foreground)]">Dietary question options</p>
                  <p className="prose-copy mt-2">
                    Keep dietary requirements as free text, or turn them into a selectable question
                    that can be filtered later.
                  </p>
                  <select
                    name="rsvpDietaryInputType"
                    defaultValue={rsvpForm?.dietaryInputType ?? "text"}
                    className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                  >
                    <option value="text">Free text box</option>
                    <option value="select">Single-choice dropdown</option>
                    <option value="multiselect">Multi-select checkboxes</option>
                  </select>
                  <textarea
                    name="rsvpDietaryOptions"
                    defaultValue={(rsvpForm?.dietaryOptions ?? []).join("\n")}
                    rows={6}
                    placeholder={`Vegetarian\nVegan\nGluten-free\nNut allergy`}
                    className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground)] outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
              <p className="eyebrow">Custom Questions</p>
              <h3 className="mt-3 text-xl">Add wedding-specific questions when a couple needs them</h3>
              <p className="prose-copy mt-3">
                Build the extra RSVP questions as rows instead of writing parser syntax. Leave a
                row blank if you don&apos;t need it.
              </p>
              <div className="mt-4 space-y-4">
                {Array.from({ length: customQuestionRowCount }).map((_, index) => {
                  const question = customQuestions[index];
                  return (
                    <div
                      key={question?.id ?? `custom-question-row-${index}`}
                      className="rounded-[1rem] border border-[var(--border)] bg-[#fafcfb] p-4"
                    >
                      <input
                        type="hidden"
                        name="rsvpQuestionId"
                        value={question?.id ?? ""}
                      />
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_180px_160px]">
                        <input
                          name="rsvpQuestionLabel"
                          defaultValue={question?.label ?? ""}
                          placeholder="Question label"
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                        />
                        <select
                          name="rsvpQuestionType"
                          defaultValue={question?.type ?? "short"}
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                        >
                          <option value="short">Short text</option>
                          <option value="long">Long text</option>
                          <option value="yesno">Yes / No</option>
                          <option value="select">Dropdown</option>
                          <option value="multiselect">Multi-select</option>
                        </select>
                        <select
                          name="rsvpQuestionRequired"
                          defaultValue={question?.required ? "required" : "optional"}
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                        >
                          <option value="optional">Optional</option>
                          <option value="required">Required</option>
                        </select>
                      </div>
                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <input
                          name="rsvpQuestionPlaceholder"
                          defaultValue={question?.placeholder ?? ""}
                          placeholder="Placeholder for short/long text questions"
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                        />
                        <input
                          name="rsvpQuestionOptions"
                          defaultValue={(question?.options ?? []).join("; ")}
                          placeholder="Options for dropdowns, separated with ;"
                          className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <textarea
                name="rsvpCustomQuestions"
                defaultValue={customQuestionLines}
                rows={1}
                className="sr-only"
                readOnly
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
          </EditorAccordionSection>

          <EditorAccordionSection
            id="suppliers"
            eyebrow="Suppliers"
            title="Helpful local recommendations"
            description="Use this optional pillar for beauty, hair, makeup, transport, or other trusted local suppliers couples want to spotlight for guests."
          >
            <div className="grid gap-4">
              <SectionToggle
                name="showSuppliers"
                label="Show suppliers section"
                checked={visibility?.suppliers ?? false}
              />
              <input
                name="suppliersEyebrow"
                defaultValue={weddingData.suppliersEyebrow ?? "Suppliers"}
                placeholder="Suppliers"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <RichTextEditorField
                name="suppliersTitle"
                label="Suppliers heading"
                description="This controls the large heading for the supplier recommendations section."
                defaultValue={suppliersTitleHtml}
                minHeightClassName="min-h-[140px]"
              />
              <RichTextEditorField
                name="suppliersDescription"
                label="Suppliers intro"
                description="Use this for a short explanation of what guests will find in the supplier recommendations."
                defaultValue={suppliersDescriptionHtml}
                minHeightClassName="min-h-[140px]"
              />
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-white/80 p-5">
                <p className="eyebrow">Recommended Suppliers</p>
                <h2 className="mt-3 text-2xl">Add one local contact per line</h2>
                <p className="prose-copy mt-3">
                  Use this format:
                  <span className="font-medium text-[var(--foreground)]"> Supplier name | category | short note | link</span>.
                  The category and link are optional, but the note helps guests know why it is useful.
                </p>
                <textarea
                  name="suppliersText"
                  defaultValue={supplierLines}
                  rows={6}
                  placeholder="Glow Beauty Studio | Hair & Makeup | Bridal styling and makeup appointments | https://example.com"
                  className="mt-4 w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
                />
              </div>
              <div className="rounded-[1.3rem] border border-[var(--border)] bg-[#fbfcfb] p-5">
                <p className="eyebrow">Guest-Facing Preview Summary</p>
                <h2 className="mt-3 text-2xl">How this section currently reads</h2>
                <div className="rounded-[1.25rem] border border-[var(--border)] bg-white p-5">
                  <div className="mt-3 space-y-4">
                    {weddingData.suppliers.length ? (
                      weddingData.suppliers.map((item) => (
                        <div
                          key={`${item.name}-${item.category ?? "supplier"}`}
                          className="border-b border-[var(--border)] pb-4 last:border-b-0 last:pb-0"
                        >
                          {item.category ? <p className="eyebrow">{item.category}</p> : null}
                          <p className="mt-2 font-medium text-[#1c2622]">{item.name}</p>
                          <p className="mt-1 text-sm leading-6 text-[#41564e]">{item.note}</p>
                          {item.link ? (
                            <p className="mt-2 text-sm text-[#0f5a43]">Guest button: View supplier</p>
                          ) : null}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm leading-6 text-[#6e7e78]">
                        No supplier recommendations have been added yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </EditorAccordionSection>

          <div className="flex flex-wrap gap-3">
            <button className="accent-button rounded-full px-6 py-3 text-sm font-medium">
              Save Wedding Changes
            </button>
            <button
              type="submit"
              name="publishLive"
              value="true"
              className="accent-outline rounded-full px-6 py-3 text-sm font-medium"
            >
              Save And Publish Live Website
            </button>
            <Link href={`/preview/${record.slug}`} className="accent-panel rounded-full px-6 py-3 text-sm">
              Back To Review
            </Link>
            {record.status === "live" ? (
              <Link href={`/${record.slug}` as Route} className="accent-panel rounded-full px-6 py-3 text-sm">
                Open Live Website
              </Link>
            ) : null}
          </div>
        </form>
      </section>
    </SiteFrame>
  );
}
