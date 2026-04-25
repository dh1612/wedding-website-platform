import { NextResponse } from "next/server";
import { deleteGuest } from "@/lib/production-repositories";

type Context = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};

export async function DELETE(_request: Request, context: Context) {
  const { id } = await context.params;
  await deleteGuest(id);
  return NextResponse.json({ ok: true });
}
