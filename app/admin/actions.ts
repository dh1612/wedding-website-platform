"use server";

import { redirect } from "next/navigation";
import { createWeddingDraft } from "@/lib/production-repositories";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createWeddingDraftAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const date = String(formData.get("eventDate") || "").trim();

  if (!title) {
    return;
  }

  const slugBase = slugify(title);
  const slug = `${slugBase}-${Date.now().toString().slice(-5)}`;

  await createWeddingDraft({
    slug,
    title,
    eventDate: date ? new Date(date) : undefined
  });

  redirect("/admin");
}
