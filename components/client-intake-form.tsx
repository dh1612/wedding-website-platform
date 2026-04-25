"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

export function ClientIntakeForm({
  initialPackage = "smart"
}: ClientIntakeFormProps) {
  const [values, setValues] = useState<IntakeSubmission>({
    ...defaultValues,
    packageTier: initialPackage
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    slug: string;
    styleExampleHref: string;
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

  const missingBasics = useMemo(() => {
    const missing: string[] = [];
    if (!values.couple.trim()) missing.push("couple names");
    if (!values.email.trim()) missing.push("contact email");
    return missing;
  }, [values.couple, values.email]);

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

  async function submitIntake() {
    if (missingBasics.length > 0) {
      setStatusMessage(`Please add: ${missingBasics.join(", ")}.`);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

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
      return;
    }

    const data = (await response.json()) as { slug: string; message: string };
    const themeId = values.themePreference || weddingThemes[0]?.id || "soft-blush";
    const themeName =
      weddingThemes.find((theme) => theme.id === themeId)?.name ??
      "Selected Style";

    setResult({
      slug: data.slug,
      styleExampleHref: `/wedding?theme=${themeId}`,
      styleName: themeName
    });
    setStatusMessage(data.message);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 lg:px-8 lg:pb-24">
      <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="rounded-[2rem] border border-black/6 bg-white/84 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            Before You Start
          </p>
          <h2 className="mt-4 text-4xl leading-none sm:text-5xl">
            Send what is ready
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#5f564e]">
            Takes 2 minutes. Fill in what you have and we handle the rest.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-[#184b38]/12 bg-[#f6fbf8] p-5 text-sm leading-7 text-[#486159]">
            This is not a DIY builder. The couple shares the basics, we prepare the first version, then refine it after review.
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-black/6 bg-[#faf7f2] p-5">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Required</p>
              <p className="mt-3 text-lg leading-7">Couple names and contact email.</p>
            </div>
            <div className="rounded-[1.4rem] border border-black/6 bg-[#faf7f2] p-5">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a7d64]">Optional</p>
              <p className="mt-3 text-lg leading-7">Wedding date, location, story, schedule, travel notes, FAQ, images, and preferred style direction.</p>
            </div>
          </div>

          {selectedTheme ? (
            <div className="mt-8 rounded-[1.5rem] border border-black/6 bg-[#faf7f2] p-5">
              <p className="text-[12px] uppercase tracking-[0.28em] text-[#9a7d64]">
                Selected style
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-[180px_1fr]">
                <div className="h-32 rounded-[1.2rem]" style={selectedTheme.previewStyle} />
                <div>
                  <h3 className="text-2xl">{selectedTheme.name}</h3>
                  <p className="mt-2 text-sm font-medium text-[#184b38]">
                    {selectedTheme.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#6d655d]">
                    {selectedTheme.description}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
                Create Your Website
              </p>
              <h2 className="mt-2 text-3xl">Send the details once</h2>
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

          <div className="mt-6 rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#6f665e]">
            Takes 2 minutes. Fill in what you have. Rough notes are perfect.
          </div>

          {statusMessage && !result ? (
            <div className="mt-6 rounded-[1.2rem] border border-[#b86a53]/18 bg-[#fff3ef] px-4 py-3 text-sm leading-6 text-[#8a4c3a]">
              {statusMessage}
            </div>
          ) : null}

          <div className="mt-8 space-y-8">
            <div className="space-y-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Package selection</p>
                <h3 className="mt-2 text-2xl">Choose the support level</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {intakePackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => updateField("packageTier", pkg.id)}
                    className={`rounded-[1.4rem] border p-5 text-left ${
                      values.packageTier === pkg.id
                        ? "border-[#184b38] bg-[#184b38] text-white"
                        : "border-black/6 bg-[#faf7f2]"
                    }`}
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
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Couple basics</p>
                <h3 className="mt-2 text-2xl">The only essentials</h3>
                <p className="mt-2 text-sm leading-6 text-[#6d655d]">
                  Only names and email are needed to get the first version started.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={values.couple}
                  onChange={(event) => updateField("couple", event.target.value)}
                  placeholder="Couple names"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <input
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Contact email"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <input
                  type="date"
                  value={values.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <input
                  value={values.locationSummary}
                  onChange={(event) => updateField("locationSummary", event.target.value)}
                  placeholder="General location"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Preferred style direction</p>
                <h3 className="mt-2 text-2xl">Choose a look, or let us choose</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

            <div className="space-y-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Optional details</p>
                <h3 className="mt-2 text-2xl">Anything already known</h3>
                <p className="mt-2 text-sm leading-6 text-[#6d655d]">
                  Add as much or as little as is ready right now.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
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
                rows={5}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
              <textarea
                value={values.travelText}
                onChange={(event) => updateField("travelText", event.target.value)}
                placeholder="Travel and transport notes"
                rows={4}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
              <textarea
                value={values.faqText}
                onChange={(event) => updateField("faqText", event.target.value)}
                placeholder={"FAQ, one item per line\nCan I bring a plus one? Only if named on the invitation."}
                rows={5}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#9a7d64]">Story and images</p>
                <h3 className="mt-2 text-2xl">Rough notes are perfect</h3>
              </div>
              <textarea
                value={values.storyText}
                onChange={(event) => updateField("storyText", event.target.value)}
                placeholder="Share the couple story in raw notes, short phrases, or rough paragraphs."
                rows={8}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
              <textarea
                value={(values.imageUrls ?? []).join("\n")}
                onChange={(event) =>
                  updateField(
                    "imageUrls",
                    event.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                  )
                }
                placeholder={"Image URLs, one per line\nhttps://..."}
                rows={5}
                className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm leading-6 text-[#6d655d]">
                You send the details once. We prepare the first version for review.
              </p>
              <p className="text-sm leading-6 text-[#184b38]">
                No payment needed to get your first version started.
              </p>
            </div>
            <button
              type="button"
              onClick={submitIntake}
              disabled={isSubmitting}
              className="rounded-full bg-[#184b38] px-6 py-3.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {isSubmitting ? "Preparing your website..." : "Prepare My Website"}
            </button>
          </div>

          {result ? (
            <div className="mt-8 rounded-[1.5rem] border border-[#184b38]/20 bg-[#edf6f2] p-6">
              <p className="text-[12px] uppercase tracking-[0.3em] text-[#184b38]">
                Thank You
              </p>
              <p className="mt-3 text-lg text-[#23413a]">
                The details have been received and the first version is now being prepared for review.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#50645f]">
                A private review link will be shared once everything has been checked and prepared properly. There is nothing else needed from the couple right now.
              </p>
              <div className="mt-6 rounded-[1.4rem] border border-[#184b38]/12 bg-white/75 p-5">
                <p className="text-[12px] uppercase tracking-[0.28em] text-[#2f6f58]">
                  Style preview
                </p>
                <h4 className="mt-2 text-2xl text-[#23413a]">{result.styleName}</h4>
                <p className="mt-3 text-sm leading-6 text-[#486159]">
                  This is a quick visual example of the direction selected for the website.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={result.styleExampleHref}
                    className="inline-flex rounded-full bg-[#184b38] px-5 py-3 text-sm font-medium text-white"
                  >
                    View Style Example
                  </Link>
                  <Link
                    href="/brochure"
                    className="inline-flex rounded-full border border-[#184b38]/12 bg-white px-5 py-3 text-sm font-medium text-[#22483c]"
                  >
                    Open Brochure
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
