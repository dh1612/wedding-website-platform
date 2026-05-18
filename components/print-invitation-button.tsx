"use client";

export function PrintInvitationButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="accent-button rounded-full px-5 py-3 text-sm font-medium"
    >
      Print / Save PDF
    </button>
  );
}
