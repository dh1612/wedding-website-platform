"use client";

import { useState } from "react";

type RSVPStatus = "attending" | "declined";
type MealChoice = "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";

type PublicRSVPFormProps = {
  apiPath: string;
  previewMode?: boolean;
  formConfig?: {
    title?: string;
    intro?: string;
    attendingLabel?: string;
    declinedLabel?: string;
    submitLabel?: string;
    enableGuestCount?: boolean;
    enableMealChoice?: boolean;
    enableDietaryNotes?: boolean;
    enableSongRequest?: boolean;
    enableMessageToCouple?: boolean;
  };
};

const initialForm = {
  fullName: "",
  email: "",
  attendance: "attending" as RSVPStatus,
  attendingCount: "1",
  mealChoice: "beef" as MealChoice,
  dietaryNotes: "",
  songRequest: "",
  messageToCouple: ""
};

export function PublicRSVPForm({
  apiPath,
  previewMode = false,
  formConfig
}: PublicRSVPFormProps) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isAttending = form.attendance === "attending";
  const settings = {
    title: formConfig?.title ?? "Let Us Know If You Can Make It",
    intro:
      formConfig?.intro ??
      "Share your reply here, including any dietary requirements or extra notes the couple should know.",
    attendingLabel: formConfig?.attendingLabel ?? "Yes, I'll be there",
    declinedLabel: formConfig?.declinedLabel ?? "Sorry, I can't make it",
    submitLabel: formConfig?.submitLabel ?? "Send RSVP",
    enableGuestCount: formConfig?.enableGuestCount ?? true,
    enableMealChoice: formConfig?.enableMealChoice ?? true,
    enableDietaryNotes: formConfig?.enableDietaryNotes ?? true,
    enableSongRequest: formConfig?.enableSongRequest ?? true,
    enableMessageToCouple: formConfig?.enableMessageToCouple ?? true
  };

  function updateField<Key extends keyof typeof initialForm>(
    key: Key,
    value: (typeof initialForm)[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!form.fullName.trim() || !form.email.trim()) {
      setErrorMessage("Please add your name and email before sending the RSVP.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.fullName.trim(),
          household: form.fullName.trim(),
          email: form.email.trim(),
          status: form.attendance,
          attendingCount: isAttending ? Number(form.attendingCount) || 1 : 0,
          meal: isAttending ? form.mealChoice : undefined,
          dietary: form.dietaryNotes.trim() || undefined,
          songRequest: form.songRequest.trim() || undefined,
          messageToCouple: form.messageToCouple.trim() || undefined
        })
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(payload.error || "The RSVP could not be sent just yet.");
        return;
      }

      setSuccessMessage(
        isAttending
          ? "Thank you. Your RSVP has been saved."
          : "Thank you. Your reply has been saved."
      );
      setForm(initialForm);
    } catch {
      setErrorMessage("The RSVP could not be sent just yet.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="text-2xl font-medium text-[var(--foreground)]">{settings.title}</h3>
        <p className="prose-copy mt-2">{settings.intro}</p>
      </div>

      {previewMode ? (
        <div className="rounded-[1.1rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm leading-6 text-[var(--muted)]">
          Preview testing is live here. Submissions save into this wedding&apos;s RSVP list so you
          can test the full guest flow before sending it out.
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-[1.1rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-[1.1rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-900">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--foreground)]">Full name</span>
          <input
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder="Your full name"
            className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--foreground)]">Email address</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
          />
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-[var(--foreground)]">Can you make it?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="accent-panel flex items-center gap-3 rounded-[1rem] px-4 py-3">
            <input
              type="radio"
              name="attendance"
              checked={form.attendance === "attending"}
              onChange={() => updateField("attendance", "attending")}
            />
            <span className="text-sm text-[var(--foreground)]">{settings.attendingLabel}</span>
          </label>
          <label className="accent-panel flex items-center gap-3 rounded-[1rem] px-4 py-3">
            <input
              type="radio"
              name="attendance"
              checked={form.attendance === "declined"}
              onChange={() => updateField("attendance", "declined")}
            />
            <span className="text-sm text-[var(--foreground)]">{settings.declinedLabel}</span>
          </label>
        </div>
      </fieldset>

      {isAttending && (settings.enableGuestCount || settings.enableMealChoice) ? (
        <div className="grid gap-4 md:grid-cols-2">
          {settings.enableGuestCount ? (
            <label className="space-y-2">
              <span className="text-sm font-medium text-[var(--foreground)]">How many are attending?</span>
              <select
                value={form.attendingCount}
                onChange={(event) => updateField("attendingCount", event.target.value)}
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
              >
                {[1, 2, 3, 4].map((count) => (
                  <option key={count} value={String(count)}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {settings.enableMealChoice ? (
            <label className="space-y-2">
              <span className="text-sm font-medium text-[var(--foreground)]">Meal choice</span>
              <select
                value={form.mealChoice}
                onChange={(event) => updateField("mealChoice", event.target.value as MealChoice)}
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
              >
                <option value="beef">Beef</option>
                <option value="fish">Fish</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="kids">Kids meal</option>
                <option value="custom">Custom / let us know below</option>
              </select>
            </label>
          ) : null}
        </div>
      ) : null}

      {settings.enableDietaryNotes ? (
        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--foreground)]">Dietary requirements</span>
          <textarea
            value={form.dietaryNotes}
            onChange={(event) => updateField("dietaryNotes", event.target.value)}
            placeholder="Allergies, preferences, or anything the couple should know"
            rows={4}
            className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
          />
        </label>
      ) : null}

      {settings.enableSongRequest || settings.enableMessageToCouple ? (
        <div className="grid gap-4 md:grid-cols-2">
          {settings.enableSongRequest ? (
            <label className="space-y-2">
              <span className="text-sm font-medium text-[var(--foreground)]">Song request</span>
              <input
                value={form.songRequest}
                onChange={(event) => updateField("songRequest", event.target.value)}
                placeholder="A song that should make the dance floor"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
              />
            </label>
          ) : null}

          {settings.enableMessageToCouple ? (
            <label className="space-y-2">
              <span className="text-sm font-medium text-[var(--foreground)]">Message to the couple</span>
              <input
                value={form.messageToCouple}
                onChange={(event) => updateField("messageToCouple", event.target.value)}
                placeholder="Optional note"
                className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
              />
            </label>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="accent-button inline-flex rounded-full px-6 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Sending RSVP..." : settings.submitLabel}
      </button>
    </form>
  );
}
