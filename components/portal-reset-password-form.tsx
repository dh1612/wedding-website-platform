"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type PortalResetPasswordFormProps = {
  token: string;
  next: string;
  theme?: string;
};

export function PortalResetPasswordForm({
  token,
  next,
  theme
}: PortalResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Please make sure both password fields match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/portal-reset/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, next, password })
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to reset the password right now.");
      }

      setSuccess(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to reset the password right now."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const loginHref = `/portal-login?next=${encodeURIComponent(next)}${theme ? `&theme=${encodeURIComponent(theme)}` : ""}`;

  if (success) {
    return (
      <div className="space-y-4">
        <p className="text-sm leading-6 text-[#184b38]">
          Your portal password has been reset successfully.
        </p>
        <Link
          href={loginHref}
          className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white"
        >
          Return to portal login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[var(--foreground)]">New password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-[1rem] border border-[var(--border)] bg-white/85 px-4 py-3 text-[var(--foreground)] outline-none"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[var(--foreground)]">Confirm new password</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full rounded-[1rem] border border-[var(--border)] bg-white/85 px-4 py-3 text-[var(--foreground)] outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="accent-button rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Save new password"}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
