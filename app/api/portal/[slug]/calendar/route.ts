import { NextResponse } from "next/server";
import {
  createCalendarItem,
  getWeddingSiteBySlug
} from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    slug: string;
  }>;
};

function parseInputDate(value?: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function POST(request: Request, context: Context) {
  const { slug } = await context.params;
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

  const title = body.title?.trim();
  const startDate = parseInputDate(body.startDate);
  const endDate = parseInputDate(body.endDate);

  if (!title || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Title, start date, and end date are required." },
      { status: 400 }
    );
  }

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
