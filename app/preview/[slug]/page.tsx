import Link from "next/link";
import { WeddingSitePage } from "@/components/wedding-site-page";
import { getThemeById } from "@/lib/themes";
import {
  getWeddingSiteBySlug,
  updateWeddingStatus
} from "@/lib/production-repositories";
import { coerceWeddingData } from "@/lib/wedding-data";
import { redirect } from "next/navigation";

type PreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function setStatus(formData: FormData) {
  "use server";

  const slug = `${formData.get("slug") ?? ""}`;
  const status = `${formData.get("status") ?? ""}` as
    | "draft"
    | "approved"
    | "live";

  if (!slug || !status) {
    return;
  }

  await updateWeddingStatus({ slug, status });
  redirect(`/preview/${slug}`);
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const weddingRecord = await getWeddingSiteBySlug(slug);

  if (!weddingRecord?.contentJson) {
    redirect("/");
  }

  const weddingData = coerceWeddingData(weddingRecord.contentJson);
  const activeTheme = getThemeById(weddingData.theme);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pt-6 lg:px-8">
        <div className="rounded-[1.8rem] border border-black/8 bg-[#17313c] px-6 py-5 text-white shadow-[0_18px_60px_rgba(23,49,60,0.16)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/65">
                Private Review
              </p>
              <h1 className="mt-2 text-3xl">
                {weddingRecord.title}
              </h1>
              <p className="mt-2 text-sm text-white/75">
                This page is just for review. When you are happy with everything, make it live and we will use the public website link for guests.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <form action={setStatus}>
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="status" value="approved" />
                <button className="rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-medium text-white">
                  Keep This Private For Now
                </button>
              </form>
              <form action={setStatus}>
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="status" value="live" />
                <button className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#17313c]">
                  Make It Live
                </button>
              </form>
              <Link
                href={`/couple-portal/${slug}`}
                className="rounded-full border border-white/18 bg-transparent px-5 py-3 text-sm font-medium text-white"
              >
                Open Couple Portal
              </Link>
              <Link
                href={`/admin/weddings/${slug}`}
                className="rounded-full border border-white/18 bg-transparent px-5 py-3 text-sm font-medium text-white"
              >
                Edit Wedding
              </Link>
              {weddingRecord.status === "live" ? (
                <Link
                  href={`/site/${slug}`}
                  className="rounded-full border border-white/18 bg-transparent px-5 py-3 text-sm font-medium text-white"
                >
                  Open Public Website
                </Link>
              ) : (
                <div className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm text-white/72">
                  Public website link appears after you make it live
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <WeddingSitePage
        currentPath={`/preview/${slug}`}
        siteBasePath={`/preview/${slug}`}
        activeTheme={activeTheme}
        weddingData={weddingData}
        conciergeApiPath={`/api/ask/${slug}`}
      />
    </>
  );
}
