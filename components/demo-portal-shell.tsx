"use client";

import { useState } from "react";

type DemoPortalActionCardProps = {
  id?: string;
  eyebrow: string;
  title: string;
  copy: string;
  buttonLabel: string;
  onOpen: () => void;
};

export function DemoPortalActionCard({
  id,
  eyebrow,
  title,
  copy,
  buttonLabel,
  onOpen
}: DemoPortalActionCardProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={onOpen}
      className="section-shell rounded-[2rem] p-8 text-left transition hover:-translate-y-1"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="mt-3 text-3xl">{title}</h3>
      <p className="prose-copy mt-3">{copy}</p>
      <div className="mt-6 accent-button inline-flex rounded-full px-5 py-3 text-sm font-medium">
        {buttonLabel}
      </div>
    </button>
  );
}

type DemoPortalModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
};

export function DemoPortalModal({
  open,
  title,
  onClose
}: DemoPortalModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-6 py-10">
      <div className="section-shell w-full max-w-lg rounded-[2rem] p-8 shadow-[0_28px_80px_rgba(18,18,18,0.22)]">
        <p className="eyebrow">Demo View</p>
        <h2 className="mt-3 text-3xl">{title}</h2>
        <p className="prose-copy mt-4 text-lg">
          This is a read-only couple portal demo. The live planning tools unlock after the website
          has been approved and the premium package has been activated.
        </p>
        <div className="mt-6 rounded-[1.3rem] border border-[var(--border)] bg-white/75 px-5 py-4 text-sm leading-6 text-[var(--muted)]">
          Couples can review the layout here, but checklist edits, RSVP management, calendar
          planning, and seating tools are only opened once the operator unlocks them.
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onClose}
            className="accent-button rounded-full px-5 py-3 text-sm font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export function useDemoPortalModal() {
  const [openTitle, setOpenTitle] = useState("");

  return {
    openTitle,
    openModal: (title: string) => setOpenTitle(title),
    closeModal: () => setOpenTitle("")
  };
}
