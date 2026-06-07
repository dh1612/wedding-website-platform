"use client";

import { useState } from "react";

type ContactState =
  | { status: "idle"; message: string | null }
  | { status: "submitting"; message: string | null }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: ContactState = { status: "idle", message: null };

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initialState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim()
    };

    setState({ status: "submitting", message: null });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const body = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!response.ok) {
      setState({
        status: "error",
        message: body?.error ?? "Something went wrong. Please try again."
      });
      return;
    }

    form.reset();
    setState({
      status: "success",
      message: "Thanks — I’ll be in touch within 1 working day."
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#4e453f]">Name</span>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-[1rem] border border-[#d8cfc5] bg-white px-4 py-3 text-sm text-[#1f1d1a] outline-none transition focus:border-[#184b38]"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#4e453f]">Email address</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-[1rem] border border-[#d8cfc5] bg-white px-4 py-3 text-sm text-[#1f1d1a] outline-none transition focus:border-[#184b38]"
            placeholder="name@example.com"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#4e453f]">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-[1rem] border border-[#d8cfc5] bg-white px-4 py-3 text-sm leading-7 text-[#1f1d1a] outline-none transition focus:border-[#184b38]"
          placeholder="What would you like to ask?"
        />
      </label>

      {state.message ? (
        <div
          className={`rounded-[1rem] px-4 py-3 text-sm leading-6 ${
            state.status === "success"
              ? "border border-[#184b38]/12 bg-[#f6fbf8] text-[#486159]"
              : "border border-[#d9b7aa] bg-[#fff6f3] text-[#8b4c35]"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-[#184b38] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#215b45] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
