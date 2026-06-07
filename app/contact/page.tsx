import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { ContactForm } from "@/components/contact-form";
import { MarketingFooter } from "@/components/marketing-footer";
import { SUPPORT_EMAIL } from "@/lib/brand";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf7f2_0%,#f3ece2_55%,#e8ddd0_100%)] text-[#1f1d1a]">
      <section className="mx-auto w-full max-w-5xl px-6 pb-10 pt-14 lg:px-8">
        <div className="grid gap-8 rounded-[2.3rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
          <div className="space-y-5">
            <BrandLogo subtitle="Contact" />
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">Contact</p>
            <h1 className="text-5xl leading-none sm:text-6xl">
              Have a question before you get started?
            </h1>
            <p className="text-lg leading-8 text-[#5f564e]">
              If you want to ask about packages, timings, what happens after the preview, or
              whether the service is the right fit, send a note and I&apos;ll point you in the
              right direction.
            </p>
            <div className="rounded-[1.5rem] border border-[#184b38]/10 bg-[#f6fbf8] p-5">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Direct email</p>
              <p className="mt-3 break-all text-xl text-[#184b38]">{SUPPORT_EMAIL}</p>
              <p className="mt-3 text-sm leading-7 text-[#486159]">
                I aim to reply within 1 working day.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white"
              >
                Start your website
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-6 py-3 text-sm font-medium text-[#4e453f] hover:bg-[#faf7f2]"
              >
                Back to home
              </Link>
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-black/6 bg-[#fcfaf7] p-6 shadow-[0_18px_50px_rgba(52,35,24,0.06)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Send a message</p>
            <h2 className="mt-4 text-3xl leading-tight">Tell me what you need help with</h2>
            <p className="mt-3 text-base leading-7 text-[#5f564e]">
              A quick question is absolutely fine. I&apos;ll be in touch within 1 working day with
              a response.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
