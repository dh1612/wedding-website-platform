"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(24,20,17,0.84)] px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-1 top-1 z-10 rounded-full bg-white/92 px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-[0_12px_24px_rgba(67,45,33,0.18)] sm:right-3 sm:top-3"
            >
              Close
            </button>
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={src}
                alt={alt}
                width={1800}
                height={1200}
                unoptimized={shouldBypassImageOptimization(src)}
                priority
                className="mx-auto h-auto max-h-[92dvh] w-auto max-w-[94vw] rounded-[0.9rem] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.32)] sm:max-h-[90vh] sm:max-w-[90vw]"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
