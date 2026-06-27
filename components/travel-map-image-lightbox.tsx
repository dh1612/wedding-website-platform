"use client";

import { useState } from "react";
import Image from "next/image";
import { shouldBypassImageOptimization } from "@/lib/image-utils";

type TravelMapImageLightboxProps = {
  src: string;
  alt?: string;
};

export function TravelMapImageLightbox({
  src,
  alt = "Weekend map for guests"
}: TravelMapImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full text-left"
        aria-label="Open weekend map"
      >
        <div className="overflow-hidden rounded-[1.35rem] border border-[var(--border)] bg-white/82 p-3 transition hover:shadow-[0_18px_36px_rgba(67,45,33,0.1)] sm:p-4">
          <div className="relative overflow-hidden rounded-[1rem] border border-[var(--border)] bg-[#f8f6f1]">
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1000}
              unoptimized={shouldBypassImageOptimization(src)}
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-[var(--foreground)] shadow-[0_10px_20px_rgba(67,45,33,0.08)]">
              Click to enlarge
            </div>
          </div>
        </div>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(24,20,17,0.72)] px-4 py-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/92 px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-[0_12px_24px_rgba(67,45,33,0.12)]"
            >
              Close
            </button>
            <div className="overflow-hidden rounded-[1.4rem] border border-white/20 bg-white shadow-[0_28px_60px_rgba(20,16,12,0.28)]">
              <Image
                src={src}
                alt={alt}
                width={1800}
                height={1200}
                unoptimized={shouldBypassImageOptimization(src)}
                className="h-auto max-h-[85vh] w-full object-contain bg-[#f8f6f1]"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
