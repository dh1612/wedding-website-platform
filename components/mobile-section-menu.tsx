"use client";

import { useEffect, useRef, useState } from "react";

type MobileSectionMenuProps = {
  items: Array<{ label: string; href: string }>;
};

export function MobileSectionMenu({ items }: MobileSectionMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleHashChange() {
      setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative md:hidden">
      <button
        type="button"
        aria-label="Open section navigation"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] transition hover:bg-[var(--accent-soft)]"
      >
        <span className="flex flex-col gap-[3px]">
          <span className="block h-[2px] w-4 rounded-full bg-current" />
          <span className="block h-[2px] w-4 rounded-full bg-current" />
          <span className="block h-[2px] w-4 rounded-full bg-current" />
        </span>
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.6rem)] z-40 max-h-[70vh] w-[min(16rem,calc(100vw-3rem))] overflow-y-auto rounded-[1.25rem] border border-[var(--border)] bg-white/96 p-3 shadow-[0_20px_60px_rgba(21,36,31,0.16)] backdrop-blur">
          <p className="eyebrow px-3 pt-2">Jump To</p>
          <nav className="mt-2 flex flex-col gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[1rem] px-3 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
