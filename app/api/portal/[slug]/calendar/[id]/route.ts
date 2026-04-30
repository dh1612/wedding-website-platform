import { NextResponse } from "next/server";
import {
  deleteCalendarItemForWedding,
  getWeddingSiteBySlug,
  updateCalendarItemForWedding
} from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};

function parseInputDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export async function PATCH(request: Request, context: Context) {
  const { slug, id } = await context.params;
  const wedding = await getWeddingSiteBySlug(slug);

  if (!wedding?.id) {
    return NextResponse.json({ error: "Wedding not found." }, { status: 404 });
  }

  const body = (await request.json()) as {
    title?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    notes?: string;
  };

  const item = await updateCalendarItemForWedding({
    id,
    weddingId: wedding.id,
    title: body.title?.trim(),
    category: body.category?.trim(),
    startDate: parseInputDate(body.startDate),
    endDate: parseInputDate(body.endDate),
    notes:
      typeof body.notes === "string"
        ? body.notes.trim() || null
        : undefined
  });

  if (!item) {
    return NextResponse.json({ error: "Calendar item not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: item.id,
    title: item.title,
    category: item.category,
    startDate: item.startDate.toISOString().slice(0, 10),
    endDate: item.endDate.toISOString().slice(0, 10),
    notes: item.notes ?? ""
  });
}

export async function DELETE(_request: Request, context: Context) {
  const { slug, id } = await context.params;
  const wedding = await getWeddingSiteBySlug(slug);

  if (!wedding?.id) {
    return NextResponse.json({ error: "Wedding not found." }, { status: 404 });
  }

  const item = await deleteCalendarItemForWedding({
    id,
    weddingId: wedding.id
  });

  if (!item) {
    return NextResponse.json({ error: "Calendar item not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
