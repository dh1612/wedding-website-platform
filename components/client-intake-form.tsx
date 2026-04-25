"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  intakePackages,
  type IntakePackage,
  type IntakeSubmission
} from "@/lib/intake";

type ClientIntakeFormProps = {
  initialPackage?: IntakePackage;
};

const STORAGE_KEY = "wedding-intake-draft-v1";

function isLikelyImageUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

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

const stepMeta = [
  {
    title: "Package & Basics",
    description: "Just the essentials to get the draft started."
  },
  {
    title: "Schedule & Locations",
    description: "Optional details if you already have them."
  },
  {
    title: "Travel & FAQ",
    description: "Helpful guest details you can add now or later."
  },
  {
    title: "Story & Images",
    description: "Rough notes are completely fine here."
  }
];

export function ClientIntakeForm({
  initialPackage = "smart"
}: ClientIntakeFormProps) {
  const formPanelRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<IntakeSubmission>({
    ...defaultValues,
    packageTier: initialPackage
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ slug: string } | null>(null);

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
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1279px)").matches) return;
    formPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const progress = useMemo(
    () => `${step + 1} / ${stepMeta.length}`,
    [step]
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

  function nextStep() {
    setStep((current) => Math.min(current + 1, stepMeta.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  async function submitIntake() {
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
      setStatusMessage("We could not save your details just yet. Please check the essentials and try again.");
      return;
    }

    const data = (await response.json()) as { slug: string; message: string };

    setResult({
      slug: data.slug
    });
    setStatusMessage(data.message);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 lg:px-8 lg:pb-24">
      <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="order-2 rounded-[2rem] border border-black/6 bg-white/84 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 xl:order-1">
          <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
            Start Your Website
          </p>
          <h1 className="mt-4 text-4xl leading-none sm:text-5xl">
            We build your wedding website for you
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#5f564e]">
            No DIY builder. No complicated setup. Fill in what is ready, and we prepare the first version for you.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-[#184b38]/12 bg-[#f6fbf8] p-5 text-sm leading-7 text-[#486159]">
            You review, we refine, then you go live. Only the first few basics are truly needed to begin. If anything is not ready yet, skip it for now.
          </div>

          <div className="mt-8 space-y-4">
            {stepMeta.map((entry, index) => (
              <div
                key={entry.title}
                className={`rounded-[1.35rem] border px-5 py-4 ${
                  index === step
                    ? "border-[#184b38] bg-[#184b38] text-white"
                    : "border-black/6 bg-[#faf7f2] text-[#3f3832]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{entry.title}</p>
                    <p className={`mt-1 text-sm ${index === step ? "text-white/78" : "text-[#7a7168]"}`}>
                      {entry.description}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                    index === step ? "bg-white/14 text-white" : "bg-white text-[#7a7168]"
                  }`}>
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div ref={formPanelRef} className="order-1 rounded-[2rem] border border-black/6 bg-white/88 p-8 shadow-[0_20px_60px_rgba(52,35,24,0.08)] sm:p-10 xl:order-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.34em] text-[#9a7d64]">
                Step {progress}
              </p>
              <h2 className="mt-2 text-3xl">{stepMeta[step]?.title}</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setValues({ ...defaultValues, packageTier: initialPackage });
                window.localStorage.removeItem(STORAGE_KEY);
              }}
              className="rounded-full border border-black/8 px-4 py-2 text-sm text-[#5f564e]"
            >
              Clear
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {step === 0 ? (
              <>
                <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#6f665e]">
                  To get started, we just need: your chosen package, couple names, contact email, wedding date, and general location.
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
                      <p className={`mt-3 text-sm leading-6 ${
                        values.packageTier === pkg.id ? "text-white/78" : "text-[#6d655d]"
                      }`}>
                        {pkg.summary}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-[#433b34]">Couple names</span>
                    <span className="text-[#9a7d64]">Required</span>
                  </div>
                  <p className="text-sm leading-6 text-[#7a7168]">Type the names exactly as they should appear on the website.</p>
                <input
                  value={values.couple}
                  onChange={(event) => updateField("couple", event.target.value)}
                  placeholder="Example: Jo & Mike"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-[#433b34]">Client email</span>
                      <span className="text-[#9a7d64]">Required</span>
                    </div>
                    <p className="text-sm leading-6 text-[#7a7168]">This is where the review link and updates will be sent.</p>
                    <input
                      value={values.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-[#433b34]">Wedding date</span>
                      <span className="text-[#9a7d64]">Required</span>
                    </div>
                    <p className="text-sm leading-6 text-[#7a7168]">Choose the wedding date so the website timing and wording can be set correctly.</p>
                    <input
                      type="date"
                      value={values.date}
                      onChange={(event) => updateField("date", event.target.value)}
                      className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-[#433b34]">General location</span>
                    <span className="text-[#9a7d64]">Required</span>
                  </div>
                  <p className="text-sm leading-6 text-[#7a7168]">A simple place name is enough here, like Santorini, Cork, or Tuscany.</p>
                  <input
                    value={values.locationSummary}
                    onChange={(event) =>
                      updateField("locationSummary", event.target.value)
                    }
                    placeholder="Example: Santorini, Greece"
                    className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                  />
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#6f665e]">
                  Everything on this step is optional. Add what you know now and leave the rest for later.
                </div>
                <p className="text-sm leading-6 text-[#7a7168]">
                  If a box applies, type into it. If not, leave it empty and continue.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={values.ceremonyTime}
                    onChange={(event) => updateField("ceremonyTime", event.target.value)}
                    placeholder="Ceremony time (optional)"
                    className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                  />
                  <input
                    value={values.ceremonyLocation}
                    onChange={(event) =>
                      updateField("ceremonyLocation", event.target.value)
                    }
                    placeholder="Ceremony location (optional)"
                    className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                  />
                </div>
                <input
                  value={values.ceremonyAddress}
                  onChange={(event) =>
                    updateField("ceremonyAddress", event.target.value)
                  }
                  placeholder="Ceremony address (optional)"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={values.receptionTime}
                    onChange={(event) =>
                      updateField("receptionTime", event.target.value)
                    }
                    placeholder="Reception time (optional)"
                    className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                  />
                  <input
                    value={values.receptionLocation}
                    onChange={(event) =>
                      updateField("receptionLocation", event.target.value)
                    }
                    placeholder="Reception location (optional)"
                    className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                  />
                </div>
                <input
                  value={values.receptionAddress}
                  onChange={(event) =>
                    updateField("receptionAddress", event.target.value)
                  }
                  placeholder="Reception address (optional)"
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <textarea
                  value={values.scheduleText}
                  onChange={(event) => updateField("scheduleText", event.target.value)}
                  placeholder={"Schedule, one item per line\n4:00 PM - Guests arrive\n4:30 PM - Ceremony"}
                  rows={6}
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#6f665e]">
                  These details make the guest site more useful, but they are not needed to prepare the first version.
                </div>
                <p className="text-sm leading-6 text-[#7a7168]">
                  Add guest-facing information here if it is already known. Otherwise, this can be skipped for now.
                </p>
                <textarea
                  value={values.accommodationText}
                  onChange={(event) =>
                    updateField("accommodationText", event.target.value)
                  }
                  placeholder={"Accommodation options, one per line\nHotel 1\nHotel 2"}
                  rows={5}
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <textarea
                  value={values.travelText}
                  onChange={(event) => updateField("travelText", event.target.value)}
                  placeholder="Travel and transport notes for guests"
                  rows={5}
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
                <textarea
                  value={values.faqText}
                  onChange={(event) => updateField("faqText", event.target.value)}
                  placeholder={"FAQ, one per line\nCan I bring a plus one? Only if named on the invitation.\nAre children invited? Adults only."}
                  rows={6}
                  className="w-full rounded-[1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#1f1d1a]"
                />
              </>
            ) : null}

            {step === 3 ? (
              <>
                <div className="rounded-[1.2rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm leading-6 text-[#6f665e]">
                  Raw notes are perfect here. We can turn rough wording into something polished in the first version.
                </div>
                <p className="text-sm leading-6 text-[#7a7168]">
                  This is the free-text step. Write in full sentences, bullet points, or rough notes.
                </p>
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
                <p className="text-sm leading-6 text-[#7a7168]">
                  Use full image links only. Invalid entries will be ignored when the first version is prepared.
                </p>
                <p className="text-sm leading-6 text-[#7a7168]">
                  If you do not have images yet, that is completely fine. We can still prepare the layout for you.
                </p>
              </>
            ) : null}
          </div>

          {statusMessage && !result ? (
            <p className="mt-6 rounded-[1rem] border border-black/6 bg-[#faf7f2] px-4 py-3 text-sm text-[#5f564e]">
              {statusMessage}
            </p>
          ) : null}

          <div className="mt-8 space-y-5">
            <div className="flex flex-wrap justify-between gap-3">
              <button
                type="button"
                onClick={previousStep}
                disabled={step === 0}
                className="rounded-full border border-black/8 px-5 py-3 text-sm font-medium text-[#5f564e] disabled:opacity-40"
              >
                Back
              </button>

              {step < stepMeta.length - 1 ? (
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-full bg-[#184b38] px-5 py-3 text-sm font-medium text-white"
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-full border border-black/8 bg-white px-5 py-3 text-sm font-medium text-[#5f564e]"
                  >
                    Skip For Now
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={submitIntake}
                  disabled={isSubmitting}
                  className="rounded-full bg-[#184b38] px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {isSubmitting ? "Preparing your website..." : "Prepare My Website"}
                </button>
              )}
            </div>

            {result ? (
              <div className="rounded-[1.5rem] border border-[#184b38]/20 bg-[#edf6f2] p-6">
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#184b38]">
                  Thank You
                </p>
                <p className="mt-3 text-lg text-[#23413a]">
                  The details have been received and the first version is now being prepared for review.
                </p>
                <p className="mt-4 text-sm leading-6 text-[#50645f]">
                  A private review link will be shared once everything has been checked and prepared properly. There is nothing else needed from the couple right now.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
