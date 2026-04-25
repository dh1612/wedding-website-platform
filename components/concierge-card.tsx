"use client";

import { FormEvent, useState } from "react";

type AskResponse = {
  answer: string;
};

type ConciergeCardProps = {
  apiPath?: string;
};

export function ConciergeCard({ apiPath = "/api/ask" }: ConciergeCardProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error("Unable to reach the concierge right now.");
      }

      const data = (await response.json()) as AskResponse;
      setAnswer(data.answer);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="section-shell rounded-[2rem] p-8 sm:p-10">
      <div className="space-y-4">
        <p className="eyebrow">AI Concierge</p>
        <h3 className="text-3xl">Ask anything about the wedding</h3>
        <p className="prose-copy">
          The assistant answers from the wedding details on this site only.
        </p>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="sr-only">Ask a question about the wedding</span>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask anything about the wedding"
            rows={4}
            className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white/85 px-5 py-4 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-[var(--accent-strong)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Thinking..." : "Ask the concierge"}
        </button>
      </form>
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      {answer ? (
        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-5">
          <p className="eyebrow">Answer</p>
          <p className="prose-copy mt-3">{answer}</p>
        </div>
      ) : null}
    </div>
  );
}
