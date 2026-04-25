"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type PortalLoginFormProps = {
  next: string;
};

export function PortalLoginForm({ next }: PortalLoginFormProps) {
  const router = useRouter();
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
        body: JSON.stringify({ password, next })
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Unable to open the private area.");
      }

      const data = (await response.json()) as { next?: string };
      router.push(data.next || next);
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to open the private area."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-[var(--foreground)]">
          Enter password
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
        {isLoading ? "Opening..." : "Open Private Area"}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
