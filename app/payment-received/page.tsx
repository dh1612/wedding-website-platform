import Link from "next/link";
import { BRAND_NAME, SUPPORT_EMAIL } from "@/lib/brand";

export default function PaymentReceivedPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-12 lg:px-8">
        <div className="w-full rounded-[2.3rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:p-14">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            {BRAND_NAME}
          </p>
          <h1 className="mt-4 text-5xl leading-none sm:text-6xl">
            Payment received
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f564e]">
            Thank you. Your booking has been received and the next steps email is on its way.
            I&apos;ll be in touch within 24 to 48 working hours to arrange the refinement
            stage and talk through anything still to be gathered.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-[#184b38]/10 bg-[#f6fbf8] p-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">
              In the meantime
            </p>
            <ul className="mt-4 space-y-2 text-base leading-7 text-[#486159]">
              <li>Gather any favourite photos you may want included.</li>
              <li>Make a note of story wording, venue details, and guest information.</li>
              <li>Reply to the confirmation email if you want to share anything early.</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white"
            >
              Back to home
            </Link>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-6 py-3 text-sm font-medium text-[#4e453f] hover:bg-[#faf7f2]"
            >
              Contact {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
