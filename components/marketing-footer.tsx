import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";

export function MarketingFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-12 pt-4 lg:px-8 lg:pb-16">
      <div className="rounded-[1.8rem] border border-black/6 bg-white/84 px-6 py-6 shadow-[0_12px_40px_rgba(52,35,24,0.06)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">{BRAND_NAME}</p>
            <p className="mt-2 text-sm leading-6 text-[#5f564e]">
              Done-for-you wedding websites with optional private planning support.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[#4e453f]">
            <Link href="/why-crafted" className="rounded-full border border-black/8 px-4 py-2 hover:bg-white">
              Why Crafted
            </Link>
            <Link href="/contact" className="rounded-full border border-black/8 px-4 py-2 hover:bg-white">
              Contact
            </Link>
            <Link href="/privacy-policy" className="rounded-full border border-black/8 px-4 py-2 hover:bg-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="rounded-full border border-black/8 px-4 py-2 hover:bg-white">
              Terms
            </Link>
            <Link href="/refund-policy" className="rounded-full border border-black/8 px-4 py-2 hover:bg-white">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
