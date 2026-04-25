import { ClientIntakeForm } from "@/components/client-intake-form";
import type { IntakePackage } from "@/lib/intake";

type GetStartedPageProps = {
  searchParams?: Promise<{
    package?: IntakePackage;
  }>;
};

export default async function GetStartedPage({
  searchParams
}: GetStartedPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const packageTier =
    params?.package === "basic" ||
    params?.package === "smart" ||
    params?.package === "premium"
      ? params.package
      : "smart";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-6xl px-6 pt-14 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            Start Your Website
          </p>
          <h1 className="text-5xl leading-none sm:text-6xl">
            We build your wedding website for you
          </h1>
          <p className="text-lg leading-8 text-[#5f564e]">
            No DIY builder. No complicated setup. Just a beautiful, ready-to-share website.
          </p>
          <p className="max-w-3xl text-base leading-7 text-[#5f564e]">
            Fill in what is ready, we prepare the first version for you, then you review and we refine it before it goes live.
          </p>
          <p className="max-w-3xl text-sm leading-6 text-[#184b38]">
            No payment needed to get your first version started.
          </p>
          <p className="max-w-3xl text-base leading-7 text-[#486159]">
            Send us rough details — we&apos;ll turn it into a polished wedding website.
          </p>
        </div>
      </section>
      <ClientIntakeForm initialPackage={packageTier} />
    </main>
  );
}
