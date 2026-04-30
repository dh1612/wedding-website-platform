import { NextResponse } from "next/server";
import {
  deleteChecklistItemForWedding,
  getWeddingSiteBySlug,
  updateChecklistItemForWedding
} from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};

export async function PATCH(request: Request, context: Context) {
  const { slug, id } = await context.params;
  const wedding = await getWeddingSiteBySlug(slug);

  if (!wedding?.id) {
    return NextResponse.json({ error: "Wedding not found." }, { status: 404 });
  }

  const body = (await request.json()) as {
    title?: string;
    category?: string;
    completed?: boolean;
    notes?: string;
  };

  const item = await updateChecklistItemForWedding({
    id,
    weddingId: wedding.id,
    title: body.title?.trim(),
    category: body.category?.trim(),
    completed: body.completed,
    notes:
      typeof body.notes === "string"
        ? body.notes.trim() || null
        : undefined
  });

  if (!item) {
    return NextResponse.json({ error: "Checklist item not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: item.id,
    title: item.title,
    category: item.category,
    completed: item.completed,
    notes: item.notes ?? ""
  });
}

export async function DELETE(_request: Request, context: Context) {
  const { slug, id } = await context.params;
  const wedding = await getWeddingSiteBySlug(slug);

  if (!wedding?.id) {
    return NextResponse.json({ error: "Wedding not found." }, { status: 404 });
  }

  const item = await deleteChecklistItemForWedding({
    id,
    weddingId: wedding.id
  });

  if (!item) {
    return NextResponse.json({ error: "Checklist item not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
