import { NextResponse } from "next/server";
import {
  createChecklistItem,
  getWeddingSiteBySlug
} from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, context: Context) {
  const { slug } = await context.params;
  const wedding = await getWeddingSiteBySlug(slug);

  if (!wedding?.id) {
    return NextResponse.json({ error: "Wedding not found." }, { status: 404 });
  }

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
