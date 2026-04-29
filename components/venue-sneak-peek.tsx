"use client";

import { useState } from "react";
import Image from "next/image";

type VenueSneakPeekProps = {
  imageUrl: string;
};

export function VenueSneakPeek({ imageUrl }: VenueSneakPeekProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4 shadow-[var(--shadow)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Sneak Peek</p>
          <h3 className="mt-2 text-2xl">Take a look behind the door</h3>
        </div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="accent-button rounded-full px-4 py-2 text-sm font-medium"
        >
          {open ? "Close door" : "Open door"}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-[1.4rem] border border-[var(--border)] bg-[#ede3d1]">
        <div className="relative aspect-[16/10]">
          <Image
            src={imageUrl}
            alt="Venue sneak peek"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,22,16,0.08),rgba(29,22,16,0.18))]" />

          <div
            className={`absolute inset-y-0 left-0 w-1/2 origin-left border-r border-[rgba(111,84,48,0.35)] bg-[linear-gradient(180deg,#b88d4a,#8b6328)] shadow-[18px_0_30px_rgba(33,24,14,0.16)] transition-transform duration-700 ease-out ${
              open ? "-translate-x-[96%] rotate-y-[-16deg]" : "translate-x-0"
            }`}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1200px"
            }}
          >
            <div className="absolute inset-4 rounded-[1rem] border border-[rgba(255,246,228,0.35)]" />
            <div className="absolute inset-[1.4rem] rounded-[0.9rem] border border-[rgba(255,246,228,0.2)]" />
            <div className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-[rgba(255,248,230,0.6)] bg-[#f0dfb6]" />
          </div>

          <div
            className={`absolute inset-y-0 right-0 w-1/2 border-l border-[rgba(111,84,48,0.35)] bg-[linear-gradient(180deg,#c49a59,#9c7334)] shadow-[-18px_0_30px_rgba(33,24,14,0.12)] transition-transform duration-700 ease-out ${
              open ? "translate-x-[96%] rotate-y-[16deg]" : "translate-x-0"
            }`}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1200px"
            }}
          >
            <div className="absolute inset-4 rounded-[1rem] border border-[rgba(255,246,228,0.35)]" />
            <div className="absolute inset-[1.4rem] rounded-[0.9rem] border border-[rgba(255,246,228,0.2)]" />
            <div className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-[rgba(255,248,230,0.6)] bg-[#f0dfb6]" />
          </div>

          {!open ? (
            <div className="absolute inset-x-0 bottom-4 text-center text-sm font-medium tracking-[0.18em] text-white/88">
              Tap to reveal
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
