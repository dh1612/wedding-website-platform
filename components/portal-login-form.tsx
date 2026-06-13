"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type PortalLoginFormProps = {
  next: string;
  requireEmail?: boolean;
  submitLabel?: string;
  errorFallback?: string;
};

export function PortalLoginForm({
  next,
  requireEmail = false,
  submitLabel = "Open Private Area",
  errorFallback = "Unable to open the private area."
}: PortalLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/portal-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, next })
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || errorFallback);
      }

      const data = (await response.json()) as { next?: string };
      router.push(data.next || next);
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : errorFallback
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {requireEmail ? (
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--foreground)]">
            Email address
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-[1rem] border border-[var(--border)] bg-white/85 px-4 py-3 text-[var(--foreground)] outline-none"
          />
        </label>
      ) : null}
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[var(--foreground)]">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-[1rem] border border-[var(--border)] bg-white/85 px-4 py-3 text-[var(--foreground)] outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="accent-button rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60"
      >
        {isLoading ? "Opening..." : submitLabel}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
