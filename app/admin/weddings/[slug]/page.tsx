import Link from "next/link";
import { notFound } from "next/navigation";
import { updateWeddingContentAction } from "@/app/admin/actions";
import { PageHero } from "@/components/page-hero";
import { SiteFrame } from "@/components/site-frame";
import { getWeddingRecordForAdmin } from "@/lib/production-repositories";
import { getThemeById, weddingThemes } from "@/lib/themes";
import { coerceWeddingData } from "@/lib/wedding-data";

type AdminWeddingEditPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ saved?: string }>;
};

export default async function AdminWeddingEditPage({
  params,
  searchParams
}: AdminWeddingEditPageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : undefined;
  const record = await getWeddingRecordForAdmin(slug);

  if (!record?.contentJson) {
    notFound();
  }

  const weddingData = coerceWeddingData(record.contentJson);
  const plannerSettings = (record.plannerSettingsJson ?? {}) as {
    packageTier?: "basic" | "smart" | "premium";
  };
  const theme = getThemeById(weddingData.theme);
  const saved = query?.saved === "1";

  return (
    <SiteFrame
      currentPath="/admin"
      mode="pages"
      themeId={theme.id}
      themeStyle={theme.style}
      adminView
      portalType="operator"
    >
      <PageHero
        eyebrow="Wedding Editor"
        title={`Edit ${record.title}`}
        description="Update the wedding content, package tier, slug, and key details from one place."
        themeId={theme.id}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link href="/admin" className="accent-panel rounded-full px-4 py-2 text-sm">
            Back To Admin
          </Link>
          <Link href={`/preview/${record.slug}`} className="accent-panel rounded-full px-4 py-2 text-sm">
            Open Review Draft
          </Link>
          <Link href={`/couple-portal/${record.slug}`} className="accent-panel rounded-full px-4 py-2 text-sm">
            Open Couple Portal
          </Link>
        </div>

        {saved ? (
          <div className="mb-6 rounded-[1.3rem] border border-[#184b38]/14 bg-[#f6fbf8] px-5 py-4 text-sm leading-6 text-[#486159]">
            Wedding updated successfully. The latest version is now saved.
          </div>
        ) : null}

        <form action={updateWeddingContentAction} className="space-y-8">
          <input type="hidden" name="currentSlug" value={record.slug} />

          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Core Setup</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                name="title"
                defaultValue={record.title}
                placeholder="Wedding title"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="slug"
                defaultValue={record.slug}
                placeholder="Slug"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="couple"
                defaultValue={weddingData.couple}
                placeholder="Couple names"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="date"
                type="date"
                defaultValue={weddingData.date}
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="locationSummary"
                defaultValue={weddingData.locationSummary}
                placeholder="Location summary"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <select
                name="packageTier"
                defaultValue={plannerSettings.packageTier ?? "smart"}
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              >
                <option value="basic">Basic</option>
                <option value="smart">Smart</option>
                <option value="premium">Premium</option>
              </select>
              <select
                name="status"
                defaultValue={record.status}
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              >
                <option value="draft">Draft</option>
                <option value="approved">Approved</option>
                <option value="live">Live</option>
              </select>
              <select
                name="theme"
                defaultValue={weddingData.theme}
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              >
                {weddingThemes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
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
                    <label
                      key={item.id}
                      className={`overflow-hidden rounded-[1.4rem] border cursor-pointer ${
                        isActive
                          ? "border-[#184b38] bg-[#184b38] text-white"
                          : "border-[var(--border)] bg-[#faf7f2] text-[var(--foreground)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="theme"
                        value={item.id}
                        defaultChecked={isActive}
                        className="sr-only"
                      />
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

          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Hero Copy</p>
            <div className="mt-5 grid gap-4">
              <input
                name="tagline"
                defaultValue={weddingData.tagline}
                placeholder="Tagline"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <textarea
                name="announcement"
                defaultValue={weddingData.announcement}
                rows={3}
                placeholder="Announcement / intro copy"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="heroImage"
                defaultValue={weddingData.heroImage}
                placeholder="Hero image URL"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
            </div>
          </div>

          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Story & Sections</p>
            <div className="mt-5 grid gap-4">
              <textarea
                name="storyParagraphs"
                defaultValue={weddingData.story.paragraphs.join("\n\n")}
                rows={8}
                placeholder="Story paragraphs"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <textarea
                name="scheduleText"
                defaultValue={weddingData.schedule.map((item) => `${item.time} - ${item.title}`).join("\n")}
                rows={6}
                placeholder="Schedule lines"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <textarea
                name="travelText"
                defaultValue={weddingData.travel.transport}
                rows={4}
                placeholder="Travel text"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <textarea
                name="accommodationText"
                defaultValue={weddingData.accommodation.map((item) => item.name).join("\n")}
                rows={5}
                placeholder="Accommodation lines"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <textarea
                name="faqText"
                defaultValue={weddingData.faq.map((item) => `${item.q} ${item.a}`).join("\n")}
                rows={6}
                placeholder="FAQ lines"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
            </div>
          </div>

          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow">Key Details</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                name="ceremonyTime"
                defaultValue={weddingData.ceremony.time}
                placeholder="Ceremony time"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="ceremonyLocation"
                defaultValue={weddingData.ceremony.location}
                placeholder="Ceremony location"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="ceremonyAddress"
                defaultValue={weddingData.ceremony.address}
                placeholder="Ceremony address"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="receptionTime"
                defaultValue={weddingData.reception.time}
                placeholder="Reception time"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="receptionLocation"
                defaultValue={weddingData.reception.location}
                placeholder="Reception location"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="receptionAddress"
                defaultValue={weddingData.reception.address}
                placeholder="Reception address"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="contactEmail"
                defaultValue={weddingData.contact.email}
                placeholder="Contact email"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
              />
              <input
                name="rsvpDeadline"
                defaultValue={weddingData.rsvp.deadline}
                placeholder="RSVP deadline"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none"
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
