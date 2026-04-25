import { NextResponse } from "next/server";
import { createChecklistItem, ensurePortalWedding } from "@/lib/production-repositories";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    title?: string;
    category?: string;
    notes?: string;
  };

  const title = body.title?.trim();

  if (!title) {
    return NextResponse.json(
      { error: "Title is required." },
      { status: 400 }
    );
  }

  const wedding = await ensurePortalWedding();
  const item = await createChecklistItem({
    weddingId: wedding.id,
    title,
    category: body.category?.trim() || "Planning",
    notes: body.notes?.trim() || undefined
  });

  return NextResponse.json({
    id: item.id,
    title: item.title,
    category: item.category,
    completed: item.completed,
    notes: item.notes ?? ""
  });
}
