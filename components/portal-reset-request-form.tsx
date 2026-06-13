"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { SUPPORT_EMAIL } from "@/lib/brand";

type PortalResetRequestFormProps = {
  next: string;
  theme?: string;
};

export function PortalResetRequestForm({
  next,
  theme
}: PortalResetRequestFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/portal-reset/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, next, theme })
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send reset instructions right now.");
      }

      setMessage(
        data.message ||
          "If that email address is linked to this couple portal, reset instructions have been sent."
      );
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send reset instructions right now."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[var(--foreground)]">Email address</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-[1rem] border border-[var(--border)] bg-white/85 px-4 py-3 text-[var(--foreground)] outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="accent-button rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60"
      >
        {isLoading ? "Sending..." : "Send reset link"}
      </button>
      {message ? <p className="text-sm text-[#184b38]">{message}</p> : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <p className="text-sm leading-6 text-[var(--muted)]">
        If you no longer have access to this email address, please{" "}
        <Link href={`mailto:${SUPPORT_EMAIL}`} className="text-[#184b38] underline underline-offset-2">
          contact me
        </Link>{" "}
        and I'll help you reset access manually.
      </p>
    </form>
  );
}
