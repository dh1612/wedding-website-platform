import type { Metadata } from "next";
import { RosebankHomeHub } from "@/components/rosebank-home-hub";
import { getRosebankHomeHub } from "@/lib/home-hub-repositories";
import { rosebankData, type RosebankData } from "@/lib/rosebank-data";

export const metadata: Metadata = {
  title: "Rosebank Home Hub",
  description: "Private house-planning hub for Rosebank / Rosehill, Mallow.",
  robots: {
    index: false,
    follow: false
  }
};

type RosebankPageProps = {
  searchParams?: Promise<{
    key?: string;
  }>;
};

export default async function RosebankPage({ searchParams }: RosebankPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const accessKey = process.env.ROSEBANK_ACCESS_KEY?.trim();
  const suppliedKey = params?.key?.trim();
  const locked = Boolean(accessKey) && suppliedKey !== accessKey;

  if (locked) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#fbf8f3_0%,#f6f1ea_52%,#ece4da_100%)] px-4 py-10 text-[#241f1b] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-black/5 bg-white/82 p-8 shadow-[0_20px_60px_rgba(54,39,28,0.08)] backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8a6442]">Private Route</p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl leading-none tracking-[-0.04em]">
            Rosebank is locked
          </h1>
          <p className="mt-4 text-base leading-7 text-[#6f6358]">
            This page is intentionally isolated from the wedding side of the site and can be protected
            with its own access key. Add the correct `?key=` value to open it.
          </p>
          <div className="mt-6 rounded-[1.4rem] border border-[#5d4537]/10 bg-[#fffaf5] p-4 text-sm leading-6 text-[#5d5147]">
            Example format:
            <br />
            <code className="mt-2 block overflow-x-auto rounded-xl bg-white px-3 py-2 text-[#2f3438]">
              /rosebank?key=your-private-key
            </code>
          </div>
        </div>
      </main>
    );
  }

  const hub = await getRosebankHomeHub();
  const initialData = (hub.contentJson as RosebankData | null) ?? rosebankData;

  return <RosebankHomeHub initialData={initialData} accessKey={suppliedKey} />;
}
