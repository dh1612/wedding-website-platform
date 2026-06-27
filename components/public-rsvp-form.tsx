"use client";

import { useState } from "react";
import type { RSVPFormQuestion } from "@/types/wedding";

type RSVPStatus = "attending" | "declined";
type MealChoice = "beef" | "fish" | "vegetarian" | "vegan" | "kids" | "custom";

type PublicRSVPFormProps = {
  apiPath: string;
  previewMode?: boolean;
  formConfig?: {
    title?: string;
    intro?: string;
    introHtml?: string;
    attendingLabel?: string;
    declinedLabel?: string;
    submitLabel?: string;
    enableGuestCount?: boolean;
    enableMealChoice?: boolean;
    enableDietaryNotes?: boolean;
    dietaryInputType?: "text" | "select" | "multiselect";
    dietaryOptions?: string[];
    mealOptions?: Array<{
      value: MealChoice;
      label: string;
      enabled: boolean;
    }>;
    enableSongRequest?: boolean;
    enableMessageToCouple?: boolean;
    customQuestions?: RSVPFormQuestion[];
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
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});

  const isAttending = form.attendance === "attending";
  const settings = {
    title: formConfig?.title ?? "Let Us Know If You Can Make It",
    intro:
      formConfig?.intro ??
      "Share your reply here, including any dietary requirements or extra notes the couple should know.",
    introHtml: formConfig?.introHtml,
    attendingLabel: formConfig?.attendingLabel ?? "Yes, I'll be there",
    declinedLabel: formConfig?.declinedLabel ?? "Sorry, I can't make it",
    submitLabel: formConfig?.submitLabel ?? "Send RSVP",
    enableGuestCount: formConfig?.enableGuestCount ?? true,
    enableMealChoice: formConfig?.enableMealChoice ?? true,
    enableDietaryNotes: formConfig?.enableDietaryNotes ?? true,
    dietaryInputType: formConfig?.dietaryInputType ?? "text",
    dietaryOptions: formConfig?.dietaryOptions ?? [],
    mealOptions:
      formConfig?.mealOptions?.filter((option) => option.enabled) ?? [
        { value: "beef", label: "Beef", enabled: true },
        { value: "fish", label: "Fish", enabled: true },
        { value: "vegetarian", label: "Vegetarian", enabled: true },
        { value: "vegan", label: "Vegan", enabled: true },
        { value: "kids", label: "Kids meal", enabled: true },
        { value: "custom", label: "Custom / let us know below", enabled: true }
      ],
    enableSongRequest: formConfig?.enableSongRequest ?? true,
    enableMessageToCouple: formConfig?.enableMessageToCouple ?? true,
    customQuestions: formConfig?.customQuestions ?? []
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

    const missingCustomQuestion = settings.customQuestions.find(
      (question) => question.required && !customAnswers[question.id]?.trim()
    );

    if (isAttending && missingCustomQuestion) {
      setErrorMessage(`Please answer: ${missingCustomQuestion.label}`);
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
          messageToCouple: form.messageToCouple.trim() || undefined,
          customAnswers
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
      setCustomAnswers({});
    } catch {
      setErrorMessage("The RSVP could not be sent just yet.");
    } finally {
      setSubmitting(false);
    }
  }

  function updateCustomAnswer(questionId: string, value: string) {
    setCustomAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  }

  function toggleCustomMultiSelect(questionId: string, option: string) {
    const currentValues = (customAnswers[questionId] ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const nextValues = currentValues.includes(option)
      ? currentValues.filter((value) => value !== option)
      : [...currentValues, option];

    updateCustomAnswer(questionId, nextValues.join(", "));
  }

  function toggleDietaryMultiSelect(option: string) {
    const currentValues = form.dietaryNotes
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const nextValues = currentValues.includes(option)
      ? currentValues.filter((value) => value !== option)
      : [...currentValues, option];

    updateField("dietaryNotes", nextValues.join(", "));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="text-2xl font-medium text-[var(--foreground)]">{settings.title}</h3>
        {settings.introHtml ? (
          <div
            className="rich-text-content prose-copy mt-2"
            dangerouslySetInnerHTML={{ __html: settings.introHtml }}
          />
        ) : (
          <p className="prose-copy mt-2">{settings.intro}</p>
        )}
      </div>

      {previewMode ? (
        <div className="rounded-[1.1rem] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm leading-6 text-[var(--muted)]">
          Preview testing is live here. Submissions save into this wedding&apos;s RSVP list so you
          can test the full guest flow before sending it out.
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
                {settings.mealOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      ) : null}

      {settings.enableDietaryNotes ? (
        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--foreground)]">Dietary requirements</span>
          {settings.dietaryInputType === "select" ? (
            <select
              value={form.dietaryNotes}
              onChange={(event) => updateField("dietaryNotes", event.target.value)}
              className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
            >
              <option value="">Select an answer</option>
              {settings.dietaryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : settings.dietaryInputType === "multiselect" ? (
            <div className="space-y-3 rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3">
              {settings.dietaryOptions.map((option) => {
                const selectedValues = form.dietaryNotes
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean);
                const checked = selectedValues.includes(option);

                return (
                  <label key={option} className="flex items-center gap-3 text-sm text-[var(--foreground)]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDietaryMultiSelect(option)}
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <textarea
              value={form.dietaryNotes}
              onChange={(event) => updateField("dietaryNotes", event.target.value)}
              placeholder="Allergies, preferences, or anything the couple should know"
              rows={4}
              className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
            />
          )}
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

      {isAttending && settings.customQuestions.length ? (
        <div className="space-y-4">
          {settings.customQuestions.map((question) => (
            <label key={question.id} className="space-y-2">
              <span className="text-sm font-medium text-[var(--foreground)]">
                {question.label}
                {question.required ? " *" : ""}
              </span>
              {question.type === "long" ? (
                <textarea
                  value={customAnswers[question.id] ?? ""}
                  onChange={(event) => updateCustomAnswer(question.id, event.target.value)}
                  rows={4}
                  placeholder={question.placeholder ?? "Type your answer here"}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                />
              ) : question.type === "select" ? (
                <select
                  value={customAnswers[question.id] ?? ""}
                  onChange={(event) => updateCustomAnswer(question.id, event.target.value)}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                >
                  <option value="">Select an answer</option>
                  {(question.options ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : question.type === "multiselect" ? (
                <div className="space-y-3 rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3">
                  {(question.options ?? []).map((option) => {
                    const selectedValues = (customAnswers[question.id] ?? "")
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean);
                    const checked = selectedValues.includes(option);

                    return (
                      <label key={option} className="flex items-center gap-3 text-sm text-[var(--foreground)]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCustomMultiSelect(question.id, option)}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              ) : question.type === "yesno" ? (
                <select
                  value={customAnswers[question.id] ?? ""}
                  onChange={(event) => updateCustomAnswer(question.id, event.target.value)}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                >
                  <option value="">Select an answer</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <input
                  value={customAnswers[question.id] ?? ""}
                  onChange={(event) => updateCustomAnswer(question.id, event.target.value)}
                  placeholder={question.placeholder ?? "Type your answer here"}
                  className="w-full rounded-[1rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)]"
                />
              )}
            </label>
          ))}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="accent-button inline-flex rounded-full px-6 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Sending RSVP..." : settings.submitLabel}
      </button>

      {successMessage ? (
        <div className="rounded-[1.1rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
          {successMessage}
        </div>
      ) : null}
    </form>
  );
}
