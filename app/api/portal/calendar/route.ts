import { NextResponse } from "next/server";
import {
  createCalendarItem,
  ensurePortalWedding
} from "@/lib/production-repositories";

function parseInputDate(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    title?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    notes?: string;
  };

  const title = body.title?.trim();
  const startDate = parseInputDate(body.startDate);
  const endDate = parseInputDate(body.endDate);

  if (!title || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Title, start date, and end date are required." },
      { status: 400 }
    );
  }

  const wedding = await ensurePortalWedding();
  const item = await createCalendarItem({
    weddingId: wedding.id,
    title,
    category: body.category?.trim() || "Planning",
    startDate,
    endDate,
    notes: body.notes?.trim() || undefined
  });

  return NextResponse.json({
    id: item.id,
    title: item.title,
    category: item.category,
    startDate: item.startDate.toISOString().slice(0, 10),
    endDate: item.endDate.toISOString().slice(0, 10),
    notes: item.notes ?? ""
  });
}
