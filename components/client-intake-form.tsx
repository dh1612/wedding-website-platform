"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  intakePackages,
  type IntakePackage,
  type IntakeSubmission
} from "@/lib/intake";
import { weddingThemes } from "@/lib/themes";

type ClientIntakeFormProps = {
  initialPackage?: IntakePackage;
};

const STORAGE_KEY = "wedding-intake-draft-v2";
const intakeThemeOptions = weddingThemes.slice(0, 6);
const submissionSteps = [
  "Choosing the strongest sections to lead with...",
  "Shaping your first tailored draft...",
  "Preparing your private preview..."
];

const defaultValues: IntakeSubmission = {
  packageTier: "smart",
  couple: "",
  email: "",
  date: "",
  locationSummary: "",
  themePreference: "",
  ceremonyTime: "",
  ceremonyLocation: "",
  ceremonyAddress: "",
  receptionTime: "",
  receptionLocation: "",
  receptionAddress: "",
  scheduleText: "",
  accommodationText: "",
  travelText: "",
  faqText: "",
  storyText: "",
  imageUrls: []
};

function isLikelyImageUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isLikelyEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ClientIntakeForm({
  initialPackage = "smart"
}: ClientIntakeFormProps) {
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const basicsRef = useRef<HTMLDivElement | null>(null);
  const coupleInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [values, setValues] = useState<IntakeSubmission>({
    ...defaultValues,
    packageTier: initialPackage
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmissionFeedback, setShowSubmissionFeedback] = useState(false);
  const [submissionStepIndex, setSubmissionStepIndex] = useState(0);
  const [result, setResult] = useState<{
    slug: string;
    packageTier: IntakePackage;
    previewUrl: string;
    styleName: string;
  } | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as IntakeSubmission;
      setValues((current) => ({
        ...current,
        ...parsed,
        packageTier: parsed.packageTier || current.packageTier
      }));
    } catch {
      // ignore invalid saved state
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    if (!showSubmissionFeedback || result) return;

    if (submissionStepIndex >= submissionSteps.length - 1) return;

    const timer = window.setTimeout(() => {
      setSubmissionStepIndex((current) => current + 1);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [showSubmissionFeedback, submissionStepIndex, result]);

  useEffect(() => {
    if ((!showSubmissionFeedback && !result) || !feedbackRef.current) return;

    window.setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, [showSubmissionFeedback, result]);

  const hasMissingCouple = !values.couple.trim();
  const hasMissingEmail = !values.email.trim();
  const hasInvalidEmail = !!values.email.trim() && !isLikelyEmail(values.email);
  const hasMissingBasics = hasMissingCouple || hasMissingEmail || hasInvalidEmail;

  const missingBasics = useMemo(() => {
    const missing: string[] = [];
    if (hasMissingCouple) missing.push("couple names");
    if (hasMissingEmail) missing.push("contact email");
    if (!hasMissingEmail && hasInvalidEmail) missing.push("a valid email address");
    return missing;
  }, [hasMissingCouple, hasMissingEmail, hasInvalidEmail]);

  const selectedTheme = useMemo(
    () =>
      intakeThemeOptions.find((theme) => theme.id === values.themePreference) ??
      null,
    [values.themePreference]
  );

  function updateField<Key extends keyof IntakeSubmission>(
    key: Key,
    value: IntakeSubmission[Key]
  ) {
    setValues((current) => ({
      ...current,
      [key]: value
    }));
  }

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  async function submitIntake() {
    if (missingBasics.length > 0) {
      setStatusMessage(`Please add: ${missingBasics.join(", ")}.`);
      window.setTimeout(() => {
        basicsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        if (hasMissingCouple) {
          coupleInputRef.current?.focus();
          return;
        }
        if (hasMissingEmail) {
          emailInputRef.current?.focus();
        }
      }, 120);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");
    setShowSubmissionFeedback(false);
    setSubmissionStepIndex(0);

    const imageUrls = (values.imageUrls ?? [])
      .map((item) => item.trim())
      .filter((item) => item && isLikelyImageUrl(item));

    const response = await fetch("/api/intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...values,
        imageUrls
      })
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setStatusMessage(
        errorBody?.error ||
          "We could not save your details just yet. Please check the essentials and try again."
      );
      window.setTimeout(() => {
        statusRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return;
    }

    const data = (await response.json()) as {
      slug: string;
      message: string;
      previewUrl?: string;
    };
    const themeId = values.themePreference || weddingThemes[0]?.id || "soft-blush";
    const themeName =
      weddingThemes.find((theme) => theme.id === themeId)?.name ??
      "Selected Style";

    setShowSubmissionFeedback(true);
    setStatusMessage("");
    window.localStorage.removeItem(STORAGE_KEY);

    window.setTimeout(() => {
      setResult({
        slug: data.slug,
        packageTier: values.packageTier,
        previewUrl: data.previewUrl || `/preview/${data.slug}`,
        styleName: themeName
      });
    }, submissionSteps.length * 900 + 350);
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-6 pb-28 pt-8 lg:px-8 lg:pb-24">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 px-4 py-2.5 text-sm font-medium text-[#4e453f] transition hover:bg-white"
        >
          <span aria-hidden="true">←</span>
          Back
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-black/8 bg-white/80 px-4 py-2.5 text-sm font-medium text-[#4e453f] transition hover:bg-white"
        >
          Return to Home
        </Link>
      </div>

      <div className="rounded-[2rem] border border-black/6 bg-white/88 p-5 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-7 lg:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
              Create Your Website
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">The important bits first</h2>
            <p className="mt-4 text-base font-medium leading-7 text-[#486159]">
              Send us rough details — we&apos;ll turn it into a polished wedding website.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#486159]">
              Progress is saved while you move around, so nothing already typed should disappear.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setValues({ ...defaultValues, packageTier: initialPackage });
              window.localStorage.removeItem(STORAGE_KEY);
              setStatusMessage("");
              setResult(null);
            }}
            className="rounded-full border border-black/8 px-4 py-2 text-sm text-[#5f564e]"
          >
            Clear
          </button>
        </div>

        <div className="mt-4 rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#6f665e]">
          This first preview is meant to show the direction, design, and potential of your website.
          If your details are still light, we keep the draft focused and refine the fuller version
          with you later. You will receive the preview and the next-step payment link by email.
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-4 text-sm leading-6 text-[#6f665e]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Required</p>
            <p className="mt-2">Couple names and contact email.</p>
          </div>
          <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-4 text-sm leading-6 text-[#6f665e]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Optional</p>
            <p className="mt-2">Wedding date, location, style, story, schedule, travel notes, and FAQ.</p>
          </div>
        </div>

        {statusMessage && !result ? (
          <div
            ref={statusRef}
            className="mt-6 rounded-[1.2rem] border border-[#b86a53]/18 bg-[#fff3ef] px-4 py-3 text-sm leading-6 text-[#8a4c3a]"
          >
            {statusMessage}
          </div>
        ) : null}

        <div className="mt-7 space-y-5">
          <div
            ref={basicsRef}
            className={`space-y-3 rounded-[1.35rem] p-1 ${
              hasMissingBasics ? "ring-2 ring-[#b86a53]/45" : ""
            }`}
          >
            <div>
              <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Couple basics</p>
              <h3 className="mt-2 text-2xl">The only essentials</h3>
              <p className="mt-2 text-sm leading-6 text-[#6d655d]">
                That&apos;s all we need to create your first version. You can add or change anything later.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <input
                  ref={coupleInputRef}
                  value={values.couple}
                  onChange={(event) => updateField("couple", event.target.value)}
                  placeholder="Your names"
                  aria-invalid={hasMissingCouple}
                  className={`w-full rounded-[1rem] border bg-white px-4 py-3 text-sm text-[#1f1d1a] ${
                    hasMissingCouple ? "border-[#b86a53] ring-2 ring-[#b86a53]/15" : "border-black/8"
                  }`}
                />
                {hasMissingCouple ? (
                  <p className="text-sm leading-6 text-[#8a4c3a]">Add the couple names to get started.</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <input
                  ref={emailInputRef}
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Your email (we’ll send your preview here)"
                  aria-invalid={hasMissingEmail || hasInvalidEmail}
                  className={`w-full rounded-[1rem] border bg-white px-4 py-3 text-sm text-[#1f1d1a] ${
                    hasMissingEmail || hasInvalidEmail
                      ? "border-[#b86a53] ring-2 ring-[#b86a53]/15"
                      : "border-black/8"
                  }`}
                />
                {hasMissingEmail ? (
                  <p className="text-sm leading-6 text-[#8a4c3a]">Add an email so the first version can be shared back.</p>
                ) : hasInvalidEmail ? (
                  <p className="text-sm leading-6 text-[#8a4c3a]">Please use a valid email address.</p>
                ) : null}
              </div>
              <label className="space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-[#9a7d64]">
                  Wedding date (optional)
                </span>
                <input
                  type="date"
                  value={values.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  aria-label="Wedding date (optional)"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-[#9a7d64]">
                  Location (optional)
                </span>
                <input
                  value={values.locationSummary}
                  onChange={(event) => updateField("locationSummary", event.target.value)}
                  placeholder="General location"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
              </label>
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-[#184b38]/12 bg-[#f6fbf8] px-4 py-3 text-sm leading-6 text-[#486159]">
            This creates your first tailored draft — the polished final version is refined with you
            before anything goes live.
          </div>

          <details className="rounded-[1.4rem] border border-black/6 bg-[#faf7f2] px-5 py-4">
            <summary className="cursor-pointer list-none">
              <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Optional details</p>
              <h3 className="mt-2 text-2xl">Add a few more details for a stronger first draft</h3>
              <p className="mt-2 text-sm leading-6 text-[#6d655d]">
                Even two or three extra details can make a big difference. If details are still
                coming together, the first draft will stay focused on the strongest sections instead
                of padding out thin areas.
              </p>
            </summary>
            <div className="mt-5 space-y-5">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  value={values.ceremonyTime}
                  onChange={(event) => updateField("ceremonyTime", event.target.value)}
                  placeholder="Ceremony time"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <input
                  value={values.ceremonyLocation}
                  onChange={(event) => updateField("ceremonyLocation", event.target.value)}
                  placeholder="Ceremony location"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <input
                  value={values.receptionTime}
                  onChange={(event) => updateField("receptionTime", event.target.value)}
                  placeholder="Reception time"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <input
                  value={values.receptionLocation}
                  onChange={(event) => updateField("receptionLocation", event.target.value)}
                  placeholder="Reception location"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
              </div>
              <textarea
                value={values.scheduleText}
                onChange={(event) => updateField("scheduleText", event.target.value)}
                placeholder={"Schedule, one item per line\n4:00 PM - Guests arrive\n4:30 PM - Ceremony"}
                rows={4}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
              <textarea
                value={values.travelText}
                onChange={(event) => updateField("travelText", event.target.value)}
                placeholder="Travel and transport notes"
                rows={3}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
              <textarea
                value={values.faqText}
                onChange={(event) => updateField("faqText", event.target.value)}
                placeholder={"FAQ, one item per line\nCan I bring a plus one? Only if named on the invitation."}
                rows={4}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
              <textarea
                value={values.storyText}
                onChange={(event) => updateField("storyText", event.target.value)}
                placeholder="Tell us a little about you both in raw notes, short phrases, or rough paragraphs."
                rows={5}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
              <div className="rounded-[1rem] border border-[#184b38]/12 bg-[#f6fbf8] px-4 py-3 text-sm leading-6 text-[#486159]">
                If you have favourite photos in mind, don&apos;t worry about adding them here. We can
                shape the visual side with you once the first draft is in place.
              </div>
            </div>
          </details>

          <div className="space-y-3">
            <div>
              <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Preferred style direction</p>
              <h3 className="mt-2 text-2xl">Choose a look, or let us choose</h3>
              <p className="mt-2 text-sm leading-6 text-[#6d655d]">
                Pick a direction early so the first version feels closer to the right look straight away.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <button
                type="button"
                onClick={() => updateField("themePreference", "")}
                className={`rounded-[1.35rem] border p-4 text-left ${
                  !values.themePreference
                    ? "border-[#184b38] bg-[#184b38] text-white"
                    : "border-black/6 bg-[#faf7f2] text-[#3f3832]"
                }`}
              >
                <p className="text-sm font-medium">Not sure? We&apos;ll choose for you</p>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    !values.themePreference ? "text-white/78" : "text-[#6d655d]"
                  }`}
                >
                  This is selected by default, so there is no pressure to choose a style right away.
                </p>
              </button>
              {intakeThemeOptions.map((theme) => {
                const isSelected = values.themePreference === theme.id;

                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => updateField("themePreference", theme.id)}
                    className={`overflow-hidden rounded-[1.35rem] border text-left ${
                      isSelected
                        ? "border-[#184b38] bg-[#184b38] text-white"
                        : "border-black/6 bg-[#faf7f2] text-[#3f3832]"
                    }`}
                  >
                    <div className="h-28 w-full" style={theme.previewStyle} />
                    <div className="p-4">
                      <p className="text-lg font-medium">{theme.name}</p>
                      <p
                        className={`mt-2 text-sm leading-6 ${
                          isSelected ? "text-white/78" : "text-[#6d655d]"
                        }`}
                      >
                        {theme.label}. {theme.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="rounded-[1rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#6d655d]">
              Want to browse more design directions first?{" "}
              <Link
                href="/brochure#designs"
                className="font-medium text-[#184b38] underline underline-offset-2"
              >
                View the brochure designs
              </Link>
              .
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Pricing and support</p>
              <h3 className="mt-2 text-2xl">Choose the support level last</h3>
              <p className="mt-2 text-sm leading-6 text-[#6d655d]">
                Once the basics are in, choose the level of support that feels right.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {intakePackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-[1.35rem] border p-4 ${
                    values.packageTier === pkg.id
                      ? "border-[#184b38] bg-[#184b38] text-white"
                      : "border-black/6 bg-[#faf7f2]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => updateField("packageTier", pkg.id)}
                    className="w-full text-left"
                  >
                    <p className="text-sm font-medium">{pkg.name}</p>
                    <p className="mt-2 text-2xl">{pkg.price}</p>
                    <p
                      className={`mt-3 text-sm leading-6 ${
                        values.packageTier === pkg.id ? "text-white/78" : "text-[#6d655d]"
                      }`}
                    >
                      {pkg.summary}
                    </p>
                  </button>
                  <Link
                    href={`/packages/${pkg.id}`}
                    className={`mt-4 inline-flex rounded-full border px-4 py-2 text-sm font-medium transition ${
                      values.packageTier === pkg.id
                        ? "border-white/18 bg-white text-[#184b38] hover:bg-[#f7f2ea]"
                        : "border-[#d8cfc5] bg-white text-[#4e453f] hover:bg-[#ffffff]"
                    }`}
                  >
                    See more
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {showSubmissionFeedback && !result ? (
            <div ref={feedbackRef} className="mt-8 rounded-[1.6rem] border border-[#184b38]/12 bg-[#f6fbf8] p-6 sm:p-7">
              <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">
                Preparing your website
              </p>
              <h3 className="mt-3 text-3xl">Your wedding website is being prepared 🎉</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#486159]">
                We&apos;re putting together a focused first draft for review. If some details are still
                missing, we&apos;ll keep the preview clean and refine the fuller version with you later.
              </p>
              <div className="mt-5 space-y-3">
                {submissionSteps.map((step, index) => {
                  const isActive = index <= submissionStepIndex;

                  return (
                    <div
                      key={step}
                      className={`rounded-[1rem] border px-4 py-3 text-sm leading-6 transition ${
                        isActive
                          ? "border-[#184b38]/18 bg-white text-[#184b38]"
                          : "border-black/6 bg-[#faf7f2] text-[#7d746b]"
                      }`}
                    >
                      {step}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {result ? (
            <div ref={feedbackRef} className="mt-8 rounded-[1.6rem] border border-[#184b38]/12 bg-[#f6fbf8] p-6 sm:p-7">
              <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">
                First version started
              </p>
              <h3 className="mt-3 text-3xl">Thank you</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#486159]">
                Your first tailored draft is being prepared 🎉 This is a private preview to review
                the look, structure, and direction before the final version is refined.
              </p>
              <div className="mt-5 rounded-[1.2rem] border border-[#184b38]/12 bg-white px-4 py-4 text-sm leading-6 text-[#486159]">
                Check your email for the private preview and next steps. The preview is the free
                first draft. If you would like to move forward, payment for your selected package is
                the point where the hands-on refinement stage begins.
              </div>
              <p className="mt-5 text-[12px] uppercase tracking-[0.28em] text-[#9a7d64]">
                This is what your guests will see
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={result.previewUrl}
                  className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#133c2d]"
                >
                  View Your {result.styleName} Website Preview
                </Link>
                {result.packageTier === "premium" ? (
                  <Link
                    href="/couple-area"
                    className="inline-flex items-center justify-center rounded-full border border-[#d8cfc5] bg-white px-6 py-3 text-sm font-medium text-[#4e453f] transition hover:bg-[#faf7f2]"
                  >
                    View Premium Couple Area Demo
                  </Link>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-[#6d655d]">
                Reference: {result.slug}
              </p>
            </div>
          ) : (
            <div className="mt-8">
              <button
                type="button"
                onClick={submitIntake}
                disabled={isSubmitting}
                className="hidden w-full items-center justify-center rounded-full bg-[#184b38] px-6 py-4 text-base font-medium text-white transition hover:bg-[#133c2d] disabled:cursor-not-allowed disabled:opacity-70 md:inline-flex"
              >
                {isSubmitting ? "Preparing..." : "Prepare My Website"}
              </button>
              <p className="mt-3 hidden text-center text-sm leading-6 text-[#486159] md:block">
                No payment needed to get your first version started.
              </p>
            </div>
          )}
        </div>
      </div>

      {!result && !showSubmissionFeedback ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/6 bg-white/95 p-4 shadow-[0_-12px_30px_rgba(52,35,24,0.1)] backdrop-blur md:hidden">
          <button
            type="button"
            onClick={submitIntake}
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#184b38] px-6 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Preparing..." : "Prepare My Website"}
          </button>
          <p className="mt-2 text-center text-xs leading-5 text-[#486159]">
            No payment needed to get your first version started.
          </p>
        </div>
      ) : null}
    </section>
  );
}
