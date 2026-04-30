import { NextResponse } from "next/server";
import {
  deleteGuestForWedding,
  getWeddingSiteBySlug
} from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};

export async function DELETE(_request: Request, context: Context) {
  const { slug, id } = await context.params;
  const wedding = await getWeddingSiteBySlug(slug);

  if (!wedding?.id) {
    return NextResponse.json({ error: "Wedding not found." }, { status: 404 });
  }

  const guest = await deleteGuestForWedding({
    id,
    weddingId: wedding.id
  });

  if (!guest) {
    return NextResponse.json({ error: "Guest not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
