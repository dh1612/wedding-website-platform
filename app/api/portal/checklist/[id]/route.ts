import { NextResponse } from "next/server";
import {
  deleteChecklistItem,
  updateChecklistItem
} from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params;
  const body = (await request.json()) as {
    title?: string;
    category?: string;
    completed?: boolean;
    notes?: string;
  };

  const item = await updateChecklistItem({
    id,
    title: body.title?.trim(),
    category: body.category?.trim(),
    completed: body.completed,
    notes:
      typeof body.notes === "string"
        ? body.notes.trim() || null
        : undefined
  });

  return NextResponse.json({
    id: item.id,
    title: item.title,
    category: item.category,
    completed: item.completed,
    notes: item.notes ?? ""
  });
}

export async function DELETE(_request: Request, context: Context) {
  const { id } = await context.params;
  await deleteChecklistItem(id);
  return NextResponse.json({ ok: true });
}
